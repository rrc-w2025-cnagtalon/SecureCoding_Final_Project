/**
 * @swagger
 * components:
 *   schemas:
 *     ProductUpdateRequest:
 *       type: object
 *       description: Request body for updating an existing kakanin product
 *       required:
 *         - name
 *         - currentStock
 *         - lowStockThreshold
 *         - isActive
 *       properties:
 *         name:
 *           type: string
 *           description: Updated name of the kakanin product
 *           example: "Bibingka"
 *         currentStock:
 *           type: number
 *           description: Updated current stock level
 *           minimum: 0
 *           example: 45
 *         lowStockThreshold:
 *           type: number
 *           description: Updated minimum stock level before triggering alert
 *           minimum: 0
 *           example: 12
 *         isActive:
 *           type: boolean
 *           description: Updated active status of the product
 *           example: true
 */
export interface ProductUpdateRequestModel {
    name: string;
    currentStock: number;
    lowStockThreshold: number;
    isActive: boolean;
}