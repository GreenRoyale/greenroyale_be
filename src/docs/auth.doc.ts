export const registerSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignUp:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: First name of the user
 *         last_name:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the account
 */
`;

export const register = `
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignUp'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: User created successfully
 *                 data:
 *                   user:
 *                     id: "791c053d-8182-4484-91f7-ec50650e62d3"
 *                     first_name: "John"
 *                     last_name: "Doe"
 *                     email: "jdoe@example.com"
 *                     is_verified: false
 *                     created_at: "2024-09-05T12:17:04.754Z"
 *                     updated_at: "2024-09-05T12:17:04.754Z"
 *                 tokens:
 *                   accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   refreshToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request
 *       422:
 *         description: Unprocessable entity (Validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: "Invalid email or password format"
 */
`;

export const loginSchema = `
/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the user
 *           example: "jdoe@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the account
 *           example: "password123"
 */
`;

export const login = `
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           example:
 *             email: "jdoe@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: Login successful
 *                 data:
 *                   user:
 *                     id: "791c053d-8182-4484-91f7-ec50650e62d3"
 *                     first_name: "John"
 *                     last_name: "Doe"
 *                     email: "jdoe@example.com"
 *                     is_verified: false
 *                     created_at: "2024-09-05T12:17:04.754Z"
 *                     updated_at: "2024-09-05T12:17:04.754Z"
 *                 tokens:
 *                   accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   refreshToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       422:
 *         description: Unprocessable entity (Validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Validation failed
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: email
 *                       message:
 *                         type: string
 *                         example: "Invalid email or password format"
 */
`;

export const verifyEmail = `
/**
 * @swagger
 * /api/v1/verify-email:
 *   post:
 *     summary: Verify a user's email using a verification token
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token sent to the user's email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 status: success
 *                 message: "Email verified successfully"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired verification token"
 */

`;
