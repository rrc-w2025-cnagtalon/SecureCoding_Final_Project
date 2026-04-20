import {OrderSlip } from "../models/orderSlipModel";
import { sampleOrderSlips } from "../models/sampleData";
import { OrderCreateRequest } from "../models/orderCreateRequestModel";
import { getKakaninByIdService, updateKakaninService } from "../services/productService"
import { ProductUpdateRequestModel } from "../models/productUpdateRequestModel";
import { OrderUpdateRequestModel } from "../models/orderUpdateRequestModel";
import { addDocument, deleteDocument, getCollection, getDocumentById, updateDocument } from "../repositories/orderRepository";
import { ProductResponse } from "../models/productResponse";
import { db } from "../../../config/firebaseConfig";

const generateOrderNumber = async (): Promise<string> => {
    // get all orders to find the highest order number
    const snapshot = await db.collection("orders").get();
    
    let highestNumber = 0;
    snapshot.forEach(doc => {
        const orderNumber = doc.data().orderNumber;
        const numValue = parseInt(orderNumber, 10);
        if (numValue > highestNumber) {
            highestNumber = numValue;
        }
    });
    
    // Increment and format to 3 digit with zero padded string
    const nextNumber = highestNumber + 1;
    return nextNumber.toString().padStart(3, '0');
};

export const getAllOrdersService = async (): Promise<OrderSlip[] | undefined> => {
    return await getCollection();
};

export const getOrderByIdService = async (id: string): Promise<OrderSlip | undefined> => {
    return await getDocumentById(id); 
}

export const createOrderService = async (data: OrderCreateRequest): Promise<string | undefined> => {
    const { items, platterSize } = data;

    // max 6 kinds per platter
    if (items.length > 6) {
        throw new Error("A platter can contain a maximum of 6 different kakanin types.");
    }

    // minimum 6 pieces per type
    const hasInvalidQuantity = items.some(item => item.quantity < 6);
    if (hasInvalidQuantity) {
        throw new Error("Each kakanin type in a platter must have at least 6 pieces.");
    }

    // Total items must equal the number of pieces for the platter size
    const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalPieces !== platterSize) {
        throw new Error(`Total pieces (${totalPieces}) must match the platter size (${platterSize}).`);
    }

    //loops through each item, checks if it exists, checks stock, and takes out quantity if valid.
    for (const item of items) {
        const product = await getKakaninByIdService(item.productId);
        
        if (!product) {
            throw new Error(`"${item.productId}" not found in inventory.`);
        }

        if ((product.currentStock ?? 0) < item.quantity) {
            throw new Error(`Not enough stock for "${product.name}". You requested ${item.quantity}, but only ${product.currentStock} is available.`);
        }

        // take stock out of inventory
        await updateKakaninService(item.productId, {
            currentStock: (product.currentStock ?? 0) - item.quantity
        } as ProductUpdateRequestModel
    );
    }

    const orderNumber = await generateOrderNumber();

    return await addDocument(data, orderNumber);
};

export const updateOrderService = async (orderNumber: string, data: OrderUpdateRequestModel): Promise<OrderSlip | null> => {

    const updatedEntity = await getDocumentById(orderNumber);
        if (!updatedEntity) {
            return null;
        }
    
        await updateDocument(orderNumber, data);
    
        const updatedOrder = await getDocumentById(orderNumber);
    
        return updatedOrder as OrderSlip;
    };
export const deleteOrderService = async (orderNumber: string): Promise<boolean> => {
    await deleteDocument(orderNumber);
        return true;
    }