import { Router } from 'express';
import { getAllKakanin, getKakaninById, createKakanin, updateKakanin, deleteKakanin} from "../controllers/productController";
import authenticate from '../middleware/authenticate';
import isAuthorized from '../middleware/authorize';
import { productSchemas } from '../validation/productSchemas';
import { validateRequest } from '../middleware/validate';

const productRoutes = Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all kakanin products
 *     description: Retrieve a list of all kakanin products in the inventory
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Successfully retrieved all kakanin products
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
 *                     $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
productRoutes.get("/", getAllKakanin);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a kakanin product by ID
 *     description: Retrieve details of a specific kakanin product
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the kakanin product
 *     responses:
 *       200:
 *         description: Successfully retrieved the kakanin product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Kakanin product not found
 *       500:
 *         description: Server error
 */
productRoutes.get("/:id", getKakaninById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new kakanin product
 *     description: Create a new kakanin product in the inventory (requires manager or employee role)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreateRequest'
 *     responses:
 *       201:
 *         description: Kakanin product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       500:
 *         description: Server error
 */
productRoutes.post("/", authenticate, isAuthorized({hasRole: ["manager", "employee"]}), validateRequest(productSchemas.create), createKakanin);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a kakanin product
 *     description: Update details of an existing kakanin product (requires manager or employee role)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the kakanin product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdateRequest'
 *     responses:
 *       200:
 *         description: Kakanin product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid product ID or request body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: Kakanin product not found
 *       500:
 *         description: Server error
 */
productRoutes.put("/:id", authenticate, isAuthorized({hasRole: ["manager", "employee"]}), validateRequest(productSchemas.update), updateKakanin);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a kakanin product
 *     description: Delete a kakanin product from inventory (requires manager role)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the kakanin product
 *     responses:
 *       200:
 *         description: Kakanin product deleted successfully
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
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: Kakanin product not found
 *       500:
 *         description: Server error
 */
productRoutes.delete("/:id", authenticate, isAuthorized({hasRole: ["manager"]}), validateRequest(productSchemas.delete), deleteKakanin);

export default productRoutes;