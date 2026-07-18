const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST api/interview/
 * @description generate new interview report on the basisof user self description, resume pdf and job desscription.
 * @access privete
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterViewReportController)

/**
 * @route GET api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access privete
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterViewReportByIdController)


/**
 * @route GET api/interview/
 * @description get all interview reports by of logged in user.
 * @access privete
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterViewReportController)

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateRusumePdfController)

module.exports = interviewRouter;