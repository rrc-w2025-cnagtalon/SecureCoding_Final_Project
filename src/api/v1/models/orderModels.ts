/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       description: Individual item in an order with product and quantity
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique identifier of the product
 *           example: "royal-bibingka"
 *         quantity:
 *           type: number
 *           description: Quantity of this product in the order
 *           minimum: 1
 *           example: 36
 */
export interface OrderItem {
    productId: string;
    quantity: number;
}

/**
 * Platter size options available for orders (number of pieces)
 * @swagger
 * components:
 *   schemas:
 *     PlatterSize:
 *       type: number
 *       enum: [12, 36, 50, 75, 100]
 *       description: Available platter sizes measured in number of pieces
 *       example: 36
 */
export type PlatterSize = 12 | 36 | 50 | 75 | 100;

/**
 * Order status lifecycle
 * @swagger
 * components:
 *   schemas:
 *     OrderStatus:
 *       type: string
 *       enum: ["Pending", "Confirmed", "Ready for Pickup", "Completed", "Cancelled"]
 *       description: Current status of the order in its lifecycle
 *       example: "Pending"
 */
export type OrderStatus = "Pending" | "Confirmed" | "Ready for Pickup" | "Completed" | "Cancelled";
