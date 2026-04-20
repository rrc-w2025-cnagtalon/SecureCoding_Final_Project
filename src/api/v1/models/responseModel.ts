/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       description: Standard API response wrapper for all endpoints
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful
 *           example: true
 *         data:
 *           description: The data returned in the response (can be any type)
 *           nullable: true
 *         message:
 *           type: string
 *           description: A message providing additional information about the response
 *           example: "Operation completed successfully"
 *         error:
 *           type: object
 *           description: Error details (only present in error responses)
 *           properties:
 *             message:
 *               type: string
 *               description: Human-readable error message
 *             code:
 *               type: string
 *               description: Machine-readable error code for programmatic handling
 *         code:
 *           type: string
 *           description: Error code (only present in error responses)
 */
/**
 * Interface representing a standard API response.
 * @template T - The type of the data property.
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T /** The data returned in the response. */;
    message?: string /** A message providing additional information about the response. */;
    error?: string /** An error message, if applicable. */;
    code?: string /** An error code, if applicable. */;
}

/**
 * Creates a success response object.
 * @template T - The type of the data property.
 * @param {T} [data] - The data to include in the response.
 * @param {string} [message] - A message providing additional information about the response.
 * @returns {ApiResponse<T | {}>} The success response object with success=true.
 * @example
 * const response = successResponse(product, "Product retrieved successfully");
 * // Returns: { success: true, message: "Product retrieved successfully", data: product }
 */
export const successResponse = <T>(
    data?: T /** The data to include in the response. */,
    message?: string /** A message providing additional information about the response. */
): ApiResponse<T> => ({
    success: true,
    message,
    data
});

/**
 * Creates a standardized error response object.
 * This ensures all API errors follow the same format for consistent client handling.
 *
 * @param {string} message - The error message to display to the client.
 * @param {string} code - The error code for programmatic handling.
 * @returns {object} A formatted error response object.
 */
export const errorResponse = (message: string, code: string) => ({
    success: false,
    error: {
        message,
        code,
    },
    timestamp: new Date().toISOString(),
});