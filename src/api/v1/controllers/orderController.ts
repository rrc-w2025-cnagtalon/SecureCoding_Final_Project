import { Request, Response } from 'express';
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse, successResponse } from "../models/responseModel";
import { getAllOrdersService, getOrderByIdService, createOrderService, updateOrderService, deleteOrderService } from '../services/orderService';
import { OrderCreateRequest } from '../models/orderCreateRequestModel';
import { OrderUpdateRequestModel } from '../models/orderUpdateRequestModel';
import { stat } from 'fs';

// get all orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await getAllOrdersService();
        
        res.status(HTTP_STATUS.OK).json(successResponse(orders, "Here is the current list of orders."));
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong getting the orders.", "GET_ORDERS_ERROR"));
    }
};

//get order by id
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderNumber } = req.params;

        const order = await getOrderByIdService(orderNumber);

        if (!order) {
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Order not found.", "ORDER_NOT_FOUND_ERROR"));
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(order, "Here is the details for the requested order."));
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong getting the specific order.", "GET_ORDER_BY_ID_ERROR"));
    }
};

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const requestData: OrderCreateRequest = {
            customerName: req.body.customerName,
            customerPhoneNumber: req.body.customerPhoneNumber,
            platterSize: req.body.platterSize,
            items: req.body.items,
            pickupDate: req.body.pickupDate,
            pickupTime: req.body.pickupTime,
            status: "Pending",
            totalPrice: 0
        };

        const newOrder = await createOrderService(requestData);

        res.status(HTTP_STATUS.CREATED).json(successResponse(newOrder, "New order created successfully."));

    } catch (error: any) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(error.message || "Failed to create order.", "ORDER_CREATION_FAILED"));
    }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { orderNumber } = req.params;
        const updateData: OrderUpdateRequestModel = req.body;

        const updatedOrder = await updateOrderService(orderNumber, updateData);

        if (!updatedOrder) { res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Order not found.", "ORDER_NOT_FOUND_ERROR"));
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedOrder, "Order updated successfully."));
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong updating the order.", "UPDATE_ORDER_ERROR"));   
    }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
            const { orderNumber } = req.params;
    
            if (!orderNumber || typeof orderNumber !== 'string') {
                res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Invalid order number.", "INVALID_ID_ERROR"));
                return;
            }
    
           const isDeleted = await deleteOrderService(orderNumber);
    
            if (!isDeleted) {
                res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Order not found.", "ORDER_NOT_FOUND_ERROR"));
                return;
            }
    
            res.status(HTTP_STATUS.OK).json(successResponse(null, "Order deleted successfully."));
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong deleting the order.", "DELETE_ORDER_ERROR"));
        }
    };