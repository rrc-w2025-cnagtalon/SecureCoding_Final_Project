import {ProductDTO} from "../models/productDTO";
import { sampleKakanin } from "../models/sampleData";
import { ProductCreateRequestModel } from "../models/productCreateRequestModel";
import { ProductUpdateRequestModel } from "../models/productUpdateRequestModel";
import { addDocument, deleteDocument, getCollection, getDocumentById, updateDocument} from "../repositories/productRepository";
import { ProductResponse } from "../models/productResponse";  

export const getAllKakaninService = async (): Promise<Array<ProductDTO> | undefined> => {
        return await getCollection();
};

export const getKakaninByIdService = async (id: string): Promise<ProductResponse> => {
    let entity = await getDocumentById(id);
    return {
        productId: entity?.productId,
        name: entity?.name,
        currentStock: entity?.currentStock,
        lowStockThreshold: entity?.lowStockThreshold,
        isActive: entity?.isActive,
        createdAt: entity?.createdAt,
        updatedAt: entity?.updatedAt
    }
};

export const createKakaninService = async (newKakanin: ProductCreateRequestModel): Promise<string | undefined> => {
    return await addDocument(newKakanin);
};

export const updateKakaninService = async (productId: string, updateData: ProductUpdateRequestModel): Promise<ProductResponse | null> => {
    
    const updatedEntity = await getDocumentById(productId);
    if (!updatedEntity) {
        return null;
    }

    await updateDocument(productId, updateData);

    const updatedProduct = await getDocumentById(productId);

    return updatedProduct as ProductResponse;
};

export const deleteKakaninService = async (productId: string): Promise<boolean> => {
    await deleteDocument(productId);
    return true;
}

