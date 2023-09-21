import express from 'express'
import util from 'util'
import { getParsed } from '../../data-access/campaign-processor.js';
import * as campaignUseCase from '../../domain/campaign-use-case.js'
export default function defineRoutes(app) {
  const router = express.Router();

  // ✅ Best Practice: Using the 3-tier architecture, routes/controller are kept thin, logic is encapsulated in a dedicated domain folder 
  router.post('/', async (req, res, next) => {
    try {
      console.log(
        `Campaign API was called to ADD campaign, ${util.inspect(req.body)}`
      );
      const campaignReceivedData = getParsed(req.body)
      const addCampaignResponse = await campaignUseCase.addCampaign(campaignReceivedData);
      return res.json(addCampaignResponse);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:_id', async (req, res, next) => {
    try {
      console.log(`Campaign API was called to GET Campaign by id, ${req.params._id}`);
      const campaignReceivedData = getParsed(req.params)
      const getCampaignResponse = await campaignUseCase.getCampaign(campaignReceivedData);
      if (!getCampaignResponse.success) {
        res.status(404).json(getCampaignResponse);
        return;
      }
      res.json(getCampaignResponse);

    } catch (error) {
      next(error);
    }
  });

  router.put('/', async (req, res, next) => {
    try {
      console.log(
        `Campaign API was called to UPDATE campaign, ${util.inspect(req.body)}`
      );
      const campaignReceivedData = getParsed(req.body)
      const updateCampaignResponse = await campaignUseCase.updateCampaign(campaignReceivedData);
      return res.json(updateCampaignResponse);
    } catch (error) {
      next(error);
    }
  });

  // delete order by id
  router.delete('/:_id', async (req, res) => {
    try{
      console.log(`Campaign API was called to DELETE Campaign, ${req.params._id}`);
      const campaignReceivedData = getParsed(req.params)
      const deleteCampaignResponse = await campaignUseCase.deleteCampaign(campaignReceivedData);
      return res.json(deleteCampaignResponse);
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/campaign', router);
}