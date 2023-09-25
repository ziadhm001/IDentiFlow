import express from 'express'
import util from 'util'
import { getParsed } from '../../data-access/processors/customer-processor.js';
import { getParsed as getParsedOTPData } from '../../data-access/processors/otp-processor.js';

import * as customerUseCase from '../../domain/customer-use-case.js'
export default function defineRoutes(app) {
  const router = express.Router();

  // POST: Add a new customer
  router.post('/', async (req, res, next) => {
    try {
      console.log(
        `Customer API was called to ADD customer, ${util.inspect(req.body)}`
      );
      const customerReceivedData = getParsed(req.body);
      const addCustomerResponse = await customerUseCase.addCustomer(
        customerReceivedData
      );
      res.json(addCustomerResponse);
    } catch (error) {
      next(error);
    }
  });

  // POST: Verify customer's email
  router.post('/verify', async (req, res, next) => {
    try {
      console.log(
        `Customer API was called to Verify customer, ${util.inspect(req.body)}`
      );
      const customerReceivedData = getParsedOTPData(req.body);
      const addCustomerResponse = await customerUseCase.verifyEmail(
        customerReceivedData
      );
      res.json(addCustomerResponse);
    } catch (error) {
      next(error);
    }
  });

  // POST: Resend OTP (One-Time Password)
  router.post('/resend-otp', async (req, res, next) => {
    try {
      console.log(
        `Customer API was called to resend OTP, ${util.inspect(req.body)}`
      );
      const customerReceivedData = getParsedOTPData(req.body);
      const addCustomerResponse = await customerUseCase.resendOTP(
        customerReceivedData
      );
      res.json(addCustomerResponse);
    } catch (error) {
      next(error);
    }
  });

  // GET: Get all verified customers
  router.get('/', async (req, res, next) => {
    try {
      console.log(`Customer API was called to GET all verified customers`);
      const getCampaignResponse = await customerUseCase.getVerifiedCustomers();
      res.json(getCampaignResponse);
    } catch (error) {
      next(error);
    }
  });

  // GET: Get analytics for all verified customers
  router.get('/analytics', async (req, res, next) => {
    try {
      console.log(`Customer API was called to GET all verified customers analytics`);
      const getCampaignResponse = await customerUseCase.getVerifiedCustomersAnalytics();
      res.json(getCampaignResponse);
    } catch (error) {
      next(error);
    }
  });


  app.use('/api/customer', router);
}