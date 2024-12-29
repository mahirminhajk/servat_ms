import { NextFunction, Request, Response, Router } from "express";

import ServiceService from "../../services/ServiceService";
import { serviceCreatedPublisher, serviceDeletedPublisher, servicePriceUpdatedPublisher, serviceUpdatedPublisher } from "../../events";
import { RequestWithProvider, verifyProvider } from "@km12dev/shared-servat";

const router = Router();

//TODO: add validation middleware

//* create service
router.post('/', verifyProvider, async (req: RequestWithProvider, res: Response, next: NextFunction) => {
    try {
        const { data } = req.body;

        //* provider
        const provider = req.provider;
        if (!provider?.id) {
            res
                .status(401)
                .json({
                    message: 'Unauthorized'
                });
            return;
        }

        const service = await ServiceService.createService({ ...data, provider: provider.id });

        if (!service) {
            res
                .status(400)
                .json({
                    message: 'Service could not be created'
                });
            return
        };

        res
            .status(201)
            .json({
                message: 'Service created successfully',
                data: {
                    service
                }
            });

        //* event : service.created
        await serviceCreatedPublisher.publish({
            provider: service.provider,
            name: service.name,
            description: service.description,
            image: service.image,
            minPrice: service.minPrice,
            maxPrice: service.maxPrice,
            duration: service.duration,
            category: service.category,
            id: service.id,
            version: service.version
        });


    } catch (error) {
        next(error);
    }
});

//* read service
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const services = await ServiceService.getServices();

        res
            .status(200)
            .json({
                message: 'Services fetched successfully',
                data: {
                    services
                }
            });

    } catch (error) {
        next(error);
    }
});

//* read service by id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;

        const service = await ServiceService.getServiceById(id);

        res
            .status(200)
            .json({
                message: 'Service fetched successfully',
                data: {
                    service
                }
            });

    } catch (error) {
        next(error);
    }
});

//* update service
router.put('/:id', verifyProvider, async (req: RequestWithProvider, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;
        const { data } = req.body;

        //* provider
        const provider = req.provider;
        if (!provider?.id) {
            res
                .status(401)
                .json({
                    message: 'Unauthorized'
                });
            return;
        }

        const service = await ServiceService.updateService(id, data, parseInt(provider.id));

        if (!service) {
            res
                .status(404)
                .json({
                    message: 'Service not found'
                });
            return;
        }

        res
            .status(200)
            .json({
                message: 'Service updated successfully',
                data: {
                    service
                }
            });

        //* event : service.updated
        await serviceUpdatedPublisher.publish({
            provider: service.provider,
            name: service.name,
            description: service.description,
            image: service.image,
            duration: service.duration,
            category: service.category,
            id: service.id,
            version: service.version
        });

    } catch (error) {
        next(error);
    }
});

//* update service price
router.put('/:id/price', verifyProvider, async (req: RequestWithProvider, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;
        const { minPrice, maxPrice } = req.body;

        //* provider
        const provider = req.provider;
        if (!provider?.id) {
            res
                .status(401)
                .json({
                    message: 'Unauthorized'
                });
            return;
        }

        const service = await ServiceService.updateServicePrice(id, minPrice, maxPrice, parseInt(provider.id));

        if (!service) {
            res
                .status(404)
                .json({
                    message: 'Service not found'
                });
            return;
        }

        res
            .status(200)
            .json({
                message: 'Service price updated successfully',
                data: {
                    service
                }
            });

        //* event : service.price.updated
        await servicePriceUpdatedPublisher.publish({
            provider: service.provider,
            minPrice: service.minPrice,
            maxPrice: service.maxPrice,
            id: service.id,
            version: service.version
        });

    } catch (error) {
        next(error);
    }
});

//* delete service
router.delete('/:id', verifyProvider, async (req: RequestWithProvider, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;

        //* provider
        const provider = req.provider;
        if (!provider?.id) {
            res
                .status(401)
                .json({
                    message: 'Unauthorized'
                });
            return;
        }

        const service = await ServiceService.deleteService(id, parseInt(provider.id));

        if (!service) {
            res
                .status(404)
                .json({
                    message: 'Service not found'
                });
            return;
        }

        res
            .status(200)
            .json({
                message: 'Service deleted successfully',
                data: {
                    service
                }
            });

        //* event : service.deleted
        await serviceDeletedPublisher.publish({
            provider: service.provider,
            id: service.id,
            version: service.version
        });

    } catch (error) {
        next(error);
    }
});


export default router;
