/**
 * @swagger
 * components:
 *   schemas:
 *     ProductResponse:
 *       type: object
 *       description: API response object for product operations (all fields are optional)
 *       properties:
 *         productId:
 *           type: string
 *           nullable: true
 *           description: Unique identifier for the product
 *           example: "royal-bibingka"
 *         name:
 *           type: string
 *           nullable: true
 *           description: Name of the kakanin product
 *           example: "Bibingka"
 *         currentStock:
 *           type: number
 *           nullable: true
 *           description: Current stock level
 *           example: 50
 *         lowStockThreshold:
 *           type: number
 *           nullable: true
 *           description: Low stock alert threshold
 *           example: 10
 *         isActive:
 *           type: boolean
 *           nullable: true
 *           description: Whether the product is active
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when the product was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when the product was last updated
 */
export interface ProductResponse {
    productId: string | undefined;
    name: string | undefined;             
    currentStock: number | undefined;     
    lowStockThreshold: number | undefined; 
    isActive: boolean | undefined;        
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}