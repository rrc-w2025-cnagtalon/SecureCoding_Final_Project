/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDTO:
 *       type: object
 *       description: Data Transfer Object for kakanin product with metadata
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique identifier for the product
 *           example: "royal-bibingka"
 *         name:
 *           type: string
 *           description: Name of the kakanin product (optional)
 *           example: "Bibingka"
 *         currentStock:
 *           type: number
 *           description: Current stock level (optional)
 *           example: 50
 *         lowStockThreshold:
 *           type: number
 *           description: Low stock alert threshold (optional)
 *           example: 10
 *         isActive:
 *           type: boolean
 *           description: Whether the product is active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the product was created
 *           example: "2026-04-19T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the product was last updated
 *           example: "2026-04-19T14:45:30.000Z"
 */
export interface ProductDTO {
    productId: string; 
    name?: string;
    currentStock?: number;
    lowStockThreshold?: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}