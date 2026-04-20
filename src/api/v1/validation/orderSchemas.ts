import Joi from "joi";

// Helper function for the items inside the platter
const orderItemSchema = Joi.object({
    productId: Joi.string().required().messages({
        "any.required": "Product ID is required",
        "string.empty": "Product ID cannot be empty",
    }),
    quantity: Joi.number().integer().min(1).required().messages({
        "number.min": "Quantity must be at least 1",
    }),
});

export const orderSchemas = {
    // POST /api/v1/orders - Create new order
    create: {
        body: Joi.object({
            customerName: Joi.string().min(2).max(50).required().messages({
                "string.min": "Customer name must be at least 2 characters",
                "any.required": "Customer name is required",
            }),
            customerPhoneNumber: Joi.string().required().messages({
                "any.required": "Phone number is required",
            }),
            platterSize: Joi.number().valid(12, 36, 50, 75, 100).required().messages({
                "any.only": "Platter size must be 12, 36, 50, 75, or 100",
            }),
            items: Joi.array().items(orderItemSchema).min(1).required().messages({
                "array.min": "At least one kakanin must be selected",
            }),
            pickupDate: Joi.string().isoDate().required().messages({
                "string.isoDate": "Pickup date must be in YYYY-MM-DD format",
            }),
            pickupTime: Joi.string().required().messages({
                "any.required": "Pickup time is required",
            }),
            status: Joi.string().valid("Pending", "Confirmed", "Ready for Pickup", "Completed", "Cancelled").default("Pending"),
        }),
    },

    // GET /api/v1/orders/:orderNumber - Get single order
    getById: {
        params: Joi.object({
            orderNumber: Joi.string().required().messages({
                "any.required": "Order number is required",
                "string.empty": "Order number cannot be empty",
            }),
        }),
    },

    // PUT /api/v1/orders/:orderNumber - Update order
    update: {
        params: Joi.object({
            orderNumber: Joi.string().required().messages({
                "any.required": "Order number is required",
                "string.empty": "Order number cannot be empty",
            }),
        }),
        body: Joi.object({
            customerName: Joi.string().optional(),
            customerPhoneNumber: Joi.string().optional(),
            status: Joi.string().valid("Pending", "Confirmed", "Ready for Pickup", "Completed", "Cancelled").optional(),
            pickupDate: Joi.string().isoDate().optional(),
            pickupTime: Joi.string().optional(),
            platterSize: Joi.number().valid(12, 36, 50, 75, 100).optional(),
            items: Joi.array().items(orderItemSchema).optional(),
            totalPrice: Joi.number().optional(),
        }),
    },

    // DELETE /api/v1/orders/:orderNumber - Delete order
    delete: {
        params: Joi.object({
            orderNumber: Joi.string().required().messages({
                "any.required": "Order number is required",
                "string.empty": "Order number cannot be empty",
            }),
        }),
    },
};