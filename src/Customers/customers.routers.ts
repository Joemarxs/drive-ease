import {
    createCustomerController, getCustomerBookingController,getCustomerController, getCustomerByIdController, UpdateCustomerController, deleteCustomerController
} from "./customers.controllers"

import {Express} from 'express';
import { adminRoleAuth, bothRoleAuth, userRoleAuth, } from '../middleware/bearAuth';

const customer = (app: Express) => {
    app.route('/Customers').post(
        async (req, res, next ) => {
            try{
                await createCustomerController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/Customers').get(
        // bothRoleAuth,
        async (req, res, next) => {
            try{
                await getCustomerController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/Customers/:id').get(
        // bothRoleAuth,
        async (req, res, next) => {
            try {
                await getCustomerByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/Customers/:id').put(
        // bothRoleAuth,
        async (req, res, next) => {
            try {
                await UpdateCustomerController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Customers/:id').delete(
        // bothRoleAuth,
        async (req, res, next) => {
            try {
                await deleteCustomerController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )
    app.route('/Customers/booking/:id').get(
        // bothRoleAuth,
        async (req, res, next) => {
            try {
                await getCustomerBookingController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )
}

export default customer;