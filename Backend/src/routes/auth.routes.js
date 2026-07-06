const { Router } = require("express")
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js")


const authRouter = Router()

/**
* @route POST /api/auth/register
* @desc Register a new user
* @access Public
 */
authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route POST /api/auth/logout
 * @desc Logout a user / add token to blacklist
 * @access Public
 */
authRouter.post("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @desc Get current logged-in user's information
 * @access Private
 */
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)

module.exports = authRouter;