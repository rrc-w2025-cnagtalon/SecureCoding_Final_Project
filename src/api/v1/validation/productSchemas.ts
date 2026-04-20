import Joi from "joi";

export const productSchemas = {
    // POST /api/v1/kakanin - Create new product
    create: {
        body: Joi.object({
            name: Joi.string().min(2).max(50).required().messages({
                "string.min": "Product name must be at least 2 characters",
                "any.required": "Product name is required",
            }),
            currentStock: Joi.number().integer().min(0).required().messages({
                "number.min": "Stock cannot be negative",
                "any.required": "Current stock is required",
            }),
            lowStockThreshold: Joi.number().integer().min(0).required().messages({
                "number.min": "Threshold cannot be negative",
                "any.required": "Low stock threshold is required",
            }),
            isActive: Joi.boolean().default(true),
        }),
    },

    // GET /api/v1/kakanin/:id - Get single product
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Product ID is required",
                "string.empty": "Product ID cannot be empty",
            }),
        }),
    },

    // PUT /api/v1/kakanin/:id - Update product
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Product ID is required",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(2).max(50).optional(),
            currentStock: Joi.number().integer().min(0).optional(),
            lowStockThreshold: Joi.number().integer().min(0).optional(),
            isActive: Joi.boolean().optional(),
        }).min(1).messages({
            "object.min": "At least one field must be provided for update",
        }),
    },

    // DELETE /api/v1/kakanin/:id - Delete product
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Product ID is required",
            }),
        }),
    },
};