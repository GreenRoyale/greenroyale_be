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
 * api/v1/user/profile-picture:
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
 * api/v1/user/profile:
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
