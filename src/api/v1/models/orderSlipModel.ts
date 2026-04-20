import { OrderItem, PlatterSize, OrderStatus } from "./orderModels";

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       description: Complete order object with all details
 *       required:
 *         - orderNumber
 *         - customerName
 *         - customerPhoneNumber
 *         - platterSize
 *         - items
 *         - status
 *         - totalPrice
 *         - pickupDate
 *         - pickupTime
 *       properties:
 *         orderNumber:
 *           type: string
 *           description: Unique order identifier
 *           example: "ORD-2026-001"
 *         customerName:
 *           type: string
 *           description: Name of the customer
 *           example: "Shohei Ohtani"
 *         customerPhoneNumber:
 *           type: string
 *           description: Customer's contact phone number
 *           example: "204-616-5050"
 *         platterSize:
 *           type: number
 *           enum: [12, 36, 50, 75, 100]
 *           description: Size of the order platter
 *           example: 36
 *         items:
 *           type: array
 *           description: List of products in the order
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalPrice:
 *           type: number
 *           description: Total price of the order
 *           example: 10
 *         status:
 *           type: string
 *           enum: ["Pending", "Confirmed", "Ready for Pickup", "Completed", "Cancelled"]
 *           description: Current status of the order
 *           example: "Pending"
 *         pickupDate:
 *           type: string
 *           format: date
 *           description: Date when customer will pick up order (YYYY-MM-DD format)
 *           example: "2026-04-25"
 *         pickupTime:
 *           type: string
 *           format: time
 *           description: Time when customer will pick up order (HH:mm format)
 *           example: "2:00 PM"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when order was created
 *           example: "2026-04-19T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when order was last updated
 *           example: "2026-04-19T14:45:30.000Z"
 */
export interface OrderSlip {
    orderNumber: string;
    customerName: string;
    customerPhoneNumber: string;
    platterSize: PlatterSize;
    items: OrderItem[]; 
    totalPrice: number; 
    status: OrderStatus;
    pickupDate: string;
    pickupTime: string;
    createdAt?: Date;
    updatedAt?: Date;
};
