import { Request, Response } from 'express';
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse, successResponse } from "../models/responseModel";
import { sampleKakanin } from "../models/sampleData";
import { ProductCreateRequestModel } from "../models/productCreateRequestModel";
import { getAllKakaninService, getKakaninByIdService, createKakaninService, updateKakaninService, deleteKakaninService} from "../services/productService"
import { ProductDTO } from "../models/productDTO";
import { ProductUpdateRequestModel } from "../models/productUpdateRequestModel";

export const getAllKakanin = async (req: Request, res: Response) => {
    try {
        const kakanin = await getAllKakaninService();
        
        res.status(HTTP_STATUS.OK).json(successResponse(kakanin, "Here is the current inventory for all kakanin."));
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong getting the kakanin inventory.", "GET_INVENTORY_ERROR"));
    }
};

export const getKakaninById = async (req: Request, res: Response): Promise<void | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Invalid kakanin ID.", "INVALID_ID_ERROR"));
            return;
        }

        const kakanin = await getKakaninByIdService(id);

        if (!kakanin) {
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Kakanin not found.", "KAKANIN_NOT_FOUND_ERROR"));
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(kakanin, "Here is the current inventory for the requested kakanin."));
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong getting the specific kakanin.", "GET_KAKANIN_BY_ID_ERROR"));
    }
};

export const createKakanin = async (req: Request, res: Response) => {
    const requestData: ProductCreateRequestModel = {
        productId: req.body.name,
        name: req.body.name,
        currentStock: req.body.currentStock,
        lowStockThreshold: req.body.lowStockThreshold,
        isActive: req.body.isActive
    };

    const result = await createKakaninService(requestData);

    res.status(HTTP_STATUS.CREATED).json(successResponse(result, "New kakanin created successfully.")
    );
};

export const updateKakanin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Invalid kakanin ID.", "INVALID_ID_ERROR"));
            return;
        }

        const updateData: ProductUpdateRequestModel = {
            name: req.body.name,
            currentStock: req.body.currentStock,
            lowStockThreshold: req.body.lowStockThreshold,
            isActive: req.body.isActive
        };

        const updatedKakanin = await updateKakaninService(id, updateData);

        if (!updatedKakanin) {
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Kakanin not found.", "KAKANIN_NOT_FOUND_ERROR"));
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(updatedKakanin, "Kakanin updated successfully."));

    } catch (error) {res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong updating the kakanin.", "UPDATE_KAKANIN_ERROR"));}
};

export const deleteKakanin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Invalid kakanin ID.", "INVALID_ID_ERROR"));
            return;
        }

       const isDeleted = await deleteKakaninService(id);

        if (!isDeleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("Kakanin not found.", "KAKANIN_NOT_FOUND_ERROR"));
            return;
        }

        res.status(HTTP_STATUS.OK).json(successResponse(null, "Kakanin deleted successfully."));
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(errorResponse("Something went wrong deleting the kakanin.", "DELETE_KAKANIN_ERROR"));
    }
};