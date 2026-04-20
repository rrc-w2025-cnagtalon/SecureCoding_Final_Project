import { db } from "../../../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { OrderSlip } from "../models/orderSlipModel";
import { OrderCreateRequest } from "../models/orderCreateRequestModel";
import { OrderUpdateRequestModel } from "../models/orderUpdateRequestModel"; 
import { ProductDTO } from "../models/productDTO";

export const addDocument = async (order: OrderCreateRequest, orderNumber: string): Promise<string> => {
    // Use the orderNumber as the document ID
    const docRef: DocumentReference = db.collection("orders").doc(orderNumber);

    const orderEntity: OrderSlip = {
        orderNumber: orderNumber,
        customerName: order.customerName,
        customerPhoneNumber: order.customerPhoneNumber,
        platterSize: order.platterSize,
        items: order.items,
        totalPrice: order.totalPrice ?? 0,
        status: order.status,
        pickupDate: order.pickupDate,
        pickupTime: order.pickupTime,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    await docRef.set(orderEntity);
    return docRef.id;
};

export const getDocumentById = async (id: string): Promise<OrderSlip | undefined> => {
    // Create a reference to a specific document in the 'orders' collection
    const docRef: DocumentReference = db.collection("orders").doc(id);

    // Use the `get()` method to retrieve the document
    const doc = await docRef.get();

    // Check if the document exists
    if (doc.exists) {
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data();

        return {
            orderNumber: data?.orderNumber,
            customerName: data?.customerName,
            customerPhoneNumber: data?.customerPhoneNumber,
            platterSize: data?.platterSize,
            items: data?.items,
            totalPrice: data?.totalPrice,
            status: data?.status,
            pickupDate: data?.pickupDate,
            pickupTime: data?.pickupTime,
            createdAt: data?.createdAt,
            updatedAt: data?.updatedAt,
        } as OrderSlip;
    } else {
        console.log("No order found with the given ID!");
    }
};

export const getCollection = async (): Promise<Array<OrderSlip> | undefined> => {
    // Retrieve all documents from the 'orders' collection
    // `get()` returns a QuerySnapshot containing all documents in the collection
    const snapshot: QuerySnapshot = await db.collection("orders").get();

    const orders: OrderSlip[] = []

    // Iterate through each document in the collection
    snapshot.forEach((doc) => {
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data()
        orders.push({
            orderNumber: data!.orderNumber,
            customerName: data!.customerName,
            customerPhoneNumber: data!.customerPhoneNumber,
            platterSize: data!.platterSize,
            items: data!.items,
            totalPrice: data!.totalPrice,
            status: data!.status,
            pickupDate: data!.pickupDate,
            pickupTime: data!.pickupTime,
            createdAt: data!.createdAt,
            updatedAt: data!.updatedAt
        });
    });

    return orders;
};

//update always takes 2 params, the id and the product. 
export const updateDocument = async (id: string, order: OrderUpdateRequestModel ): Promise<void> => {
    // Create a reference to a specific document in the 'orders' collection
    const docRef: DocumentReference = db.collection("orders").doc(id);

    // make an object with only fields that are defined. avoids overwritign fileds with undefined if they are not included in the request body.
    const cleanOrder: any = {};
    
    if (order.customerName !== undefined) cleanOrder.customerName = order.customerName;
    if (order.customerPhoneNumber !== undefined) cleanOrder.customerPhoneNumber = order.customerPhoneNumber;
    if (order.platterSize !== undefined) cleanOrder.platterSize = order.platterSize;
    if (order.items !== undefined) cleanOrder.items = order.items;
    if (order.totalPrice !== undefined) cleanOrder.totalPrice = order.totalPrice;
    if (order.status !== undefined) cleanOrder.status = order.status;
    if (order.pickupDate !== undefined) cleanOrder.pickupDate = order.pickupDate;
    if (order.pickupTime !== undefined) cleanOrder.pickupTime = order.pickupTime;

    cleanOrder.updatedAt = new Date();

    await docRef.update(cleanOrder);
};

export const deleteDocument = async (id: string): Promise<void> => {
    // Create a reference to a specific document in the 'orders' collection
    const docRef: DocumentReference = db.collection("orders").doc(id);

    // Use the `delete()` method to remove the document from Firestore
    await docRef.delete();
};