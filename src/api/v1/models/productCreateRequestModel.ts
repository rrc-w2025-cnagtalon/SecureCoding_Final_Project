/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCreateRequest:
 *       type: object
 *       description: Request body for creating a new kakanin product
 *       required:
 *         - productId
 *         - isActive
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique identifier for the new product
 *           example: "royal-bibingka"
 *         name:
 *           type: string
 *           description: Name of the kakanin product (optional)
 *           example: "Bibingka"
 *         currentStock:
 *           type: number
 *           description: Initial stock level (optional, defaults to 0)
 *           minimum: 0
 *           example: 50
 *         lowStockThreshold:
 *           type: number
 *           description: Minimum stock level before alert (optional, defaults to 0)
 *           minimum: 0
 *           example: 10
 *         isActive:
 *           type: boolean
 *           description: Whether the product should be active and available for orders
 *           example: true
 */
export interface ProductCreateRequestModel { 
    productId: string;
    name?: string;
    currentStock?: number;
    lowStockThreshold?: number;
    isActive: boolean;
}