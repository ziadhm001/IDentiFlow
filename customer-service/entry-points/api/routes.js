import express from 'express'
import util from 'util'
import { getParsed } from '../../data-access/customer-processor.js';
import * as customerUseCase from '../../domain/customer-use-case.js'
export default function defineRoutes(app) {
  const router = express.Router();

  // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder 
  router.post('/', async (req, res, next) => {
    try {
      console.log(
        `Customer API was called to ADD customer, ${util.inspect(req.body)}`
      );
      const customerReceivedData = getParsed(req.body)
      const addCustomerResponse = await customerUseCase.addCustomer(customerReceivedData)
      res.json(addCustomerResponse);
    } catch (error) {
      next(error);
    }
  });


  router.get('/', async (req, res, next) => {
    try {
      console.log(`Customer API was called to GET all verified customers`);
      const getCampaignResponse = await customerUseCase.getVerifiedCustomers();
      res.json(getCampaignResponse);
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/customer', router);
}