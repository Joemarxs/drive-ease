import {
    createInsuaranceController, getInsuaranceController, getInsuaranceByIdController, UpdateInsuaranceController, deleteInsuaranceController
} from "./insuarance.controller"

import {Express} from 'express';

const insuarance = (app: Express) => {
    app.route('/Insuarance').post(
        async (req, res, next ) => {
            try{
                await createInsuaranceController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/Insuarance').get(
        async (req, res, next) => {
            try{
                await getInsuaranceController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/Insuarance/:id').get(
        async (req, res, next) => {
            try {
                await getInsuaranceByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/Insuarance/:id').put(
        async (req, res, next) => {
            try {
                await UpdateInsuaranceController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Insuarance/:id').delete(
        async (req, res, next) => {
            try {
                await deleteInsuaranceController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )
}

export default insuarance;