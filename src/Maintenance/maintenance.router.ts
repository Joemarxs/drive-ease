import {
    createMaintenanceController, getMaintenanceController, getMaintenanceByIdController, UpdateMaintenanceController, deleteMaintenanceController
} from "./maintenance.controller"

import {Express} from 'express';

const maintenance = (app: Express) => {
    app.route('/Maintenance').post(
        async (req, res, next ) => {
            try{
                await createMaintenanceController(req, res);

            }catch (error: any) {
                next(error);
            }
        }
    )

    app.route('/Maintenance').get(
        async (req, res, next) => {
            try{
                await getMaintenanceController(req, res);

            }catch (error: any){
                next(error);
            }
        }
    )

    app.route('/Maintenance/:id').get(
        async (req, res, next) => {
            try {
                await getMaintenanceByIdController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
          
    )

    app.route('/Maintenance/:id').put(
        async (req, res, next) => {
            try {
                await UpdateMaintenanceController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )

    app.route('/Maintenance/:id').delete(
        async (req, res, next) => {
            try {
                await deleteMaintenanceController(req, res);
            } catch (error: any) {
                next(error); 
            }
        }
    )
}

export default maintenance;