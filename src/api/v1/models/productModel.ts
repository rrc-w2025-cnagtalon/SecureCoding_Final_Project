/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       description: Represents a kakanin product in the inventory
 *       required:
 *         - productId
 *         - name
 *         - currentStock
 *         - lowStockThreshold
 *         - isActive
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique identifier for the product
 *           example: "royal-bibingka"
 *         name:
 *           type: string
 *           description: Name of the kakanin product
 *           example: "Bibingka"
 *         currentStock:
 *           type: number
 *           description: Current number of units in stock
 *           minimum: 0
 *           example: 50
 *         lowStockThreshold:
 *           type: number
 *           description: Minimum stock level before triggering a low stock alert
 *           minimum: 0
 *           example: 10
 *         isActive:
 *           type: boolean
 *           description: Whether the product is currently active and available for orders
 *           example: true
 */
export interface Product {
  productId: string;
  name: string;
  currentStock: number;
  lowStockThreshold: number;
  isActive: boolean;
}