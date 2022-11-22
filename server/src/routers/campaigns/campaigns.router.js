const express = require('express');

const {
  getCampaigns,
  createCampaign,
  deleteCampaign,
} = require('./campaigns.controller');

const campaignsRouter = express.Router();

campaignsRouter.get('/', getCampaigns);
campaignsRouter.post('/', createCampaign);
campaignsRouter.delete('/:id', deleteCampaign);

module.exports = campaignsRouter;
