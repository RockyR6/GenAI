const pdfParse = require("pdf-parse");
const {generateInterviewReport, generateResumePdf} = require("../services/ai.service");
const InterviewReportModel = require("../models/interviewReport.model");

/**
 * @description Generate interview report based on resume, self description and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required."
            });
        }

        const resumeContent = await (
            new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))
        ).getText();

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await InterviewReportModel.create({
            user: req.user.id,
            resumeText: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        });

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport,
        });
    } catch (error) {
        console.error("Generate Report Error:", error);

        res.status(500).json({
            message: "Error generating interview report.",
            error: error.message,
        });
    }
}

/**
 * @description Get interview report by interviewId.
 */
async function getInterViewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await InterviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id,
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found.",
            });
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport,
        });
    } catch (error) {
        console.error("Get Report By ID Error:", error);

        res.status(500).json({
            message: "Error fetching interview report.",
            error: error.message,
        });
    }
}

/**
 * @description Get all interview reports of the logged-in user.
 */
async function getAllInterViewReportController(req, res) {
    try {
        // console.log("Authenticated User:", req.user);

        const interviewReports = await InterviewReportModel.find({
            user: req.user.id,
        })
            .sort({ createdAt: -1 })
            .select(
                "-resumeText -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -__v"
            );

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports,
        });
    } catch (error) {
        console.error("Get All Reports Error:", error);

        res.status(500).json({
            message: "Error getting all interview reports.",
            error: error.message,
        });
    }
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateRusumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await InterviewReportModel.findById(interviewReportId)

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }
    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = {
    generateInterViewReportController,
    getInterViewReportByIdController,
    getAllInterViewReportController,
    generateRusumePdfController
};