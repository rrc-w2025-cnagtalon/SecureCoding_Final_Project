import { Router } from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';
import { validateRequest } from '../middleware/validate';
import { orderSchemas } from '../validation/orderSchemas';
import  authenticate  from '../middleware/authenticate';
import  isAuthorized  from '../middleware/authorize';
const orderRoutes = Router();

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders in the system
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
orderRoutes.get("/", getAllOrders);

/**
 * @swagger
 * /api/v1/orders/{orderNumber}:
 *   get:
 *     summary: Get an order by order number
 *     description: Retrieve details of a specific order
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: orderNumber
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique order number
 *     responses:
 *       200:
 *         description: Successfully retrieved the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
orderRoutes.get("/:orderNumber", getOrderById);

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order (accessible to manager, employee, and customer roles)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreateRequest'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body or order creation failed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Server error
 */
orderRoutes.post("/", authenticate,  isAuthorized({hasRole: ["manager", "employee", "customer"], allowSameUser: true}), validateRequest(orderSchemas.create), createOrder);

/**
 * @swagger
 * /api/v1/orders/{orderNumber}:
 *   put:
 *     summary: Update an order
 *     description: Update an existing order (requires manager or employee role)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderNumber
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique order number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderUpdateRequest'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
orderRoutes.put("/:orderNumber", authenticate,  isAuthorized({hasRole: ["manager", "employee"], allowSameUser: true}), validateRequest(orderSchemas.update), updateOrder);

/**
 * @swagger
 * /api/v1/orders/{orderNumber}:
 *   delete:
 *     summary: Delete an order
 *     description: Delete an order from the system
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderNumber
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique order number
 *     responses:
 *       200:
 *         description: Order deleted successfully
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
 *         description: Invalid order number
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
orderRoutes.delete("/:orderNumber", authenticate, validateRequest(orderSchemas.delete), deleteOrder);

export default orderRoutes;