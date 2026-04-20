import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import helmet from "helmet";
import { apiHelmetConfig } from "../src/config/helmetConfig";
import { getCorsOptions } from "../src/config/corsConfig";
import setupSwagger from "../src/config/swagger";
import morgan from "morgan";
import productRoutes from "./api/v1/routes/productRoutes"
import orderRoutes from "./api/v1/routes/orderRoutes";
import { initScheduler } from "./config/scheduler";
import { accessLogger, errorLogger, consoleLogger } from "./api/v1/middleware/logger"
import errorHandler from "./api/v1/middleware/errorHandler";
import managerRoutes from "./api/v1/routes/managerRoutes";

// Initialize Express application
const app: Express = express();

app.use(apiHelmetConfig);
app.use(cors(getCorsOptions()));

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

app.use(morgan("combined"));
app.use(express.json());

initScheduler();

app.use("/api/v1/kakanin", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/orders", managerRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Welcome endpoint
 *     description: Returns a welcome message from the API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check the health and uptime of the API server
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                   example: 12345.67
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   description: Current server timestamp
 *                   example: "2026-04-19T10:30:00.000Z"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 */
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

setupSwagger(app);

export default app;