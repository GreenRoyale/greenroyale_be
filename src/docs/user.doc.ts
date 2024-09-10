export const updateProfilePictureSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateProfilePicture:
 *       type: object
 *       required:
 *         - photo
 *       properties:
 *         photo:
 *           type: string
 *           description: The URL of the new profile picture.
 *           example: "https://example.com/avatar.jpg"
 *
 * /api/v1/users/profile-picture:
 *   patch:
 *     summary: Update user's profile picture
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfilePicture'
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile picture updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123456"
 *                     photo:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *       400:
 *         description: Invalid request, missing or invalid fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
`;

export const updateUserProfileSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserProfile:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *       properties:
 *         first_name:
 *           type: string
 *           description: First name of the user
 *           example: "John"
 *         last_name:
 *           type: string
 *           description: Last name of the user
 *           example: "Doe"
 *
 * /api/v1/users/profile:
 *   patch:
 *     summary: Update user's profile information
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserProfile'
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123456"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *       400:
 *         description: Invalid request, missing or invalid fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
`;

export const updateUserPasswordSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserPassword:
 *       type: object
 *       required:
 *         - current_password
 *         - new_password
 *       properties:
 *         current_password:
 *           type: string
 *           description: The user's current password
 *           example: "oldpassword123"
 *         new_password:
 *           type: string
 *           description: The new password for the user, must be different from the current password
 *           example: "newpassword456"
 *
 * /api/v1/users/update-password:
 *   patch:
 *     summary: Update the current user's password
 *     description: Allows the currently authenticated user to update their password
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserPassword'
 *     responses:
 *       200:
 *         description: Password updated successfully, and a new token is returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *                 token:
 *                   type: string
 *                   description: JWT token for the updated session.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Unauthorized, user is not logged in or token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "You are not logged in. Please log in to access this route."
 *       404:
 *         description: User not found, the user ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       409:
 *         description: Conflict, user tried to use the same old password as the new password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "fail"
 *                 message:
 *                   type: string
 *                   example: "Your new password cannot be the same as your old password."
 *       422:
 *         description: Validation error, password format does not meet the requirements.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "new_password must be at least 8 characters"
 */
`;
