import { db } from "../../../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { Product } from "../models/productModel";
import { ProductCreateRequestModel } from "../models/productCreateRequestModel";
import { ProductDTO } from "../models/productDTO";
import { ProductUpdateRequestModel } from "../models/productUpdateRequestModel";

export const addDocument = async (product: ProductCreateRequestModel): Promise<string> => {
    const productId = product.name!.toLowerCase().replace(/\s+/g, '-');
    // Create a reference to a document in the 'products' collection with ID 'productId'
    // If the document doesn't exist, it will be created
    const docRef: DocumentReference = db.collection("products").doc(productId);

    // Use the `set` method to add or overwrite data in the document
    // The data is passed as an object with fields and their values
    const productEntity: ProductDTO = {
        productId: productId,
        name: product.name,
        currentStock: product.currentStock,
        lowStockThreshold: product.lowStockThreshold,
        isActive: product.isActive,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    await docRef.set(productEntity);
    return docRef.id;
};

export const getDocumentById = async (id: string): Promise<ProductDTO | undefined> => {
    // Create a reference to a specific document in the 'products' collection
    const docRef: DocumentReference = db.collection("products").doc(id);

    // Use the `get()` method to retrieve the document
    const doc = await docRef.get();

    // Check if the document exists
    if (doc.exists) {
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data();

        return {
            productId: data?.productId,
            name: data?.name,
            currentStock: data?.currentStock,
            lowStockThreshold: data?.lowStockThreshold,
            isActive: data?.isActive,
            createdAt: data?.createdAt,
            updatedAt: data?.updatedAt
        }
    } else {
        console.log("No such document!");
    }
};

export const getCollection = async (): Promise<Array<ProductDTO> | undefined> => {
    // Retrieve all documents from the 'products' collection
    // `get()` returns a QuerySnapshot containing all documents in the collection
    const snapshot: QuerySnapshot = await db.collection("products").get();

    const products: ProductDTO[] = []

    // Iterate through each document in the collection
    snapshot.forEach((doc) => {
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data()
        products.push({
            productId: data!.id,
            name: data!.name,
            currentStock: data!.currentStock,
            lowStockThreshold: data!.lowStockThreshold,
            isActive: data!.isActive,
            createdAt: data!.createdAt,
            updatedAt: data!.updatedAt
        });
    });

    return products;
};

//update always takes 2 params, the id and the product. 
export const updateDocument = async (id: string, product: ProductUpdateRequestModel ): Promise<void> => {
    // Create a reference to a specific document in the 'products' collection
    const docRef: DocumentReference = db.collection("products").doc(id);

    // make an object with only fields that are defined. avoids overwritign fileds with undefined if they are not included in the request body.
    const cleanProduct: any = {};
    
    if (product.name !== undefined) cleanProduct.name = product.name;
    if (product.currentStock !== undefined) cleanProduct.currentStock = product.currentStock;
    if (product.lowStockThreshold !== undefined) cleanProduct.lowStockThreshold = product.lowStockThreshold;
    if (product.isActive !== undefined) cleanProduct.isActive = product.isActive;
    
    cleanProduct.updatedAt = new Date();

    await docRef.update(cleanProduct);
};

export const deleteDocument = async (id: string): Promise<void> => {
    // Create a reference to a specific document in the 'products' collection
    const docRef: DocumentReference = db.collection("products").doc(id);

    // Use the `delete()` method to remove the document from Firestore
    await docRef.delete();
};