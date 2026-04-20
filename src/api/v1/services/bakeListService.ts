import { db } from "../../../config/firebaseConfig";
import { OrderSlip } from "../models/orderSlipModel";
import { OrderItem } from "../models/orderModels";
import { DocumentReference, QueryDocumentSnapshot } from "firebase-admin/firestore";

export const generateDailyBakeList = async (date: string): Promise<Record<string, number> | null> => {
    try {
        // Get all orders from the orders collection
        const snapshot = await db.collection("orders").get();

        if (snapshot.empty) {
            console.log("No orders found in the database.");
            return null;
        }

        // Convert Firestore snapshots to OrderSlip array
        const allOrders: OrderSlip[] = [];
        snapshot.forEach((doc: QueryDocumentSnapshot) => {
            allOrders.push(doc.data() as OrderSlip);
        });

        // Filter orders to only include those with tomorrow's pickup date and normalize the date format for comparison
        const tomorrowsOrders = allOrders.filter(order => {
            const orderDate = order.pickupDate.split('T')[0]; // Extract date part if ISO format
            return orderDate === date;
        });

        if (tomorrowsOrders.length === 0) {
            console.log(`No active orders found for ${date}.`);
            return null;
        }

        // Aggregate quantities by productId across all filtered orders
        const totals: Record<string, number> = {};

        tomorrowsOrders.forEach(order => {
            order.items.forEach((item: OrderItem) => {
                // Add quantity to running total for this product
                if (totals[item.productId]) {
                    totals[item.productId] += item.quantity;
                } else {
                    //if there's no existing entry for this product, create one
                    totals[item.productId] = item.quantity;
                }
            });
        });

        // Save the bake list to Firestore using the date as document ID
        const docRef: DocumentReference = db.collection("bakelists").doc(date);
        
        await docRef.set({
            date: date,
            totalOrders: tomorrowsOrders.length,
            itemsToBake: totals,
            generatedAt: new Date()
        });

        console.log(`[Success] Bake List for ${date} generated and saved.`);
        return totals;

    } catch (error) {
        console.error("Failed to generate the nightly Bake List:", error);
        return null;
    }
};