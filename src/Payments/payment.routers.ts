import {
    createPaymentController, getPaymentController, getPaymentByIdController, UpdatePaymentController, deletePaymentController
} from "./payments.controller"

import {Express} from 'express';

const payment = (app: Express) => {
    app.route('/Payments').post(
        async (req, res, next ) => {
            try{
                await createPaymentController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/Payments').get(
        async (req, res, next) => {
            try{
                await getPaymentController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/Payment/:id').get(
        async (req, res, next) => {
            try {
                await getPaymentByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/Payment/:id').put(
        async (req, res, next) => {
            try {
                await UpdatePaymentController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Payment/:id').delete(
        async (req, res, next) => {
            try {
                await deletePaymentController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )
}

export default payment;