import { Router } from 'express';
import {setUserClaims} from "../controllers/managerController"
import authenticate from '../middleware/authenticate';
import isAuthorized from '../middleware/authorize';

const managerRoutes: Router = Router();

/**
 * @swagger
 * /api/v1/orders/manager/setClaims:
 *   post:
 *     summary: Set custom user claims
 *     description: Set custom claims for a user to assign roles (requires manager role). This endpoint is used to configure user permissions and roles in the system.
 *     tags:
 *       - Manager
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - claims
 *             properties:
 *               uid:
 *                 type: string
 *                 description: Firebase user ID
 *               claims:
 *                 type: object
 *                 description: Custom claims object containing user roles and permissions
 *                 example:
 *                   role: "manager"
 *                   permissions: ["create", "read", "update", "delete"]
 *           example:
 *             uid: "user123"
 *             claims:
 *               role: "manager"
 *     responses:
 *       200:
 *         description: User claims updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: 'null'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body or user not found
 *       401:
 *         description: Unauthorized - missing or invalid authentication token
 *       403:
 *         description: Forbidden - insufficient permissions (requires manager role)
 *       500:
 *         description: Server error while setting user claims
 */

// no roles defined to set up inital manager user
// update this route to be protected by manager role after setting up the initial manager user
managerRoutes.post('/manager/setClaims', authenticate, isAuthorized({hasRole: ["manager"]}), setUserClaims);
export default managerRoutes;