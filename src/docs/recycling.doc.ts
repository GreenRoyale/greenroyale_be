/**
 * @swagger
 * /api/v1/recycling:
 *   post:
 *     summary: Create a recycling log
 *     description: This endpoint allows authenticated users to create a recycling log by providing the materials and their respective quantities.
 *     tags:
 *       - Recycling
 *     security:
 *       - bearerAuth: []  # Assumes you're using Bearer token authentication
 *     requestBody:
 *       description: The materials and quantities being recycled by the user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               materials:
 *                 type: array
 *                 description: An array of materials with their types and quantities
 *                 items:
 *                   type: object
 *                   properties:
 *                     materialType:
 *                       type: string
 *                       enum: [plastic, tin, bottle, others]
 *                       description: The type of recycling material
 *                       example: plastic
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the recycling material
 *                       example: 10
 *             example:
 *               materials:
 *                 - materialType: plastic
 *                   quantity: 10
 *                 - materialType: bottle
 *                   quantity: 2
 *     responses:
 *       201:
 *         description: Recycling log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "created"
 *                 message:
 *                   type: string
 *                   example: "Recycling log created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     recycling:
 *                       type: array
 *                       description: The recycling records created for the user
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             format: uuid
 *                             description: The user ID associated with the recycling record
 *                             example: "ebf04518-0ff9-4b40-93a8-3fa8f1ba02cb"
 *                           material:
 *                             type: string
 *                             description: The type of recycling material
 *                             example: "plastic"
 *                           point:
 *                             type: number
 *                             description: Points assigned for the recycling action
 *                             example: 4
 *                           quantity:
 *                             type: number
 *                             description: The quantity of the recycled material
 *                             example: 10
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: The unique ID of the recycling log
 *                             example: "28cef7fc-f6ba-4293-b1b5-e9bbdb9ac703"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             description: When the recycling log was created
 *                             example: "2024-09-14T04:05:27.618Z"
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             description: When the recycling log was last updated
 *                             example: "2024-09-14T04:05:27.618Z"
 *                           deleted_at:
 *                             type: string
 *                             format: date-time
 *                             description: When the recycling log was deleted (if applicable)
 *                             example: null
 *       400:
 *         description: Bad request. Invalid input or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 */
