import { Request, Response } from "express";
import {auth} from "../../../config/firebaseConfig"
import { UserRecord } from "firebase-admin/auth";
import { successResponse } from "../models/responseModel"
import { HTTP_STATUS } from "../../../constants/httpConstants"

export const setUserClaims = async (req: Request, res: Response, next: Function) => {
    try {
        let userClaimsToSet = req.body

        const user: UserRecord = await auth.getUser(userClaimsToSet.uid);
    
        await auth.setCustomUserClaims(userClaimsToSet.uid, userClaimsToSet.claims)

        res.status(HTTP_STATUS.OK).json(successResponse(null, `User claims updated successfully.`));
    } catch (error) {
        next(error);
    }
};