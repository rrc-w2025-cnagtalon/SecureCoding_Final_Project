import { OrderItem, OrderStatus, PlatterSize } from './orderModels';

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderUpdateRequest:
 *       type: object
 *       description: Request body for updating an existing order (all fields are optional)
 *       properties:
 *         customerName:
 *           type: string
 *           description: Updated customer name
 *           example: "Shohei Ohtani"
 *         customerPhoneNumber:
 *           type: string
 *           description: Updated customer phone number
 *           example: "204-616-5050"
 *         status:
 *           type: string
 *           enum: ["Pending", "Confirmed", "Ready for Pickup", "Completed", "Cancelled"]
 *           description: Updated order status
 *           example: "Confirmed"
 *         pickupDate:
 *           type: string
 *           format: date
 *           description: Updated pickup date (YYYY-MM-DD format)
 *           example: "2026-04-25"
 *         pickupTime:
 *           type: string
 *           format: time
 *           description: Updated pickup time (HH:mm format)
 *           example: "2:00 PM"
 *         platterSize:
 *           type: number
 *           enum: [12, 36, 50, 75, 100]
 *           description: Updated platter size
 *           example: 36
 *         items:
 *           type: array
 *           description: Updated list of order items
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalPrice:
 *           type: number
 *           description: Updated total price of the order
 *           example: 10
 */
export interface OrderUpdateRequestModel {
    customerName?: string;
    customerPhoneNumber?: string;
    status?: OrderStatus;      
    pickupDate?: string;      
    pickupTime?: string;      
    platterSize?: PlatterSize; 
    items?: OrderItem[];       
    totalPrice?: number;     
}