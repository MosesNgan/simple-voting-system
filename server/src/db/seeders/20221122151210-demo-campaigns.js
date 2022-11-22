'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let campaignsData = [
      {
        question: 'Who is the best NBA player in history?',
        startedAt: 'January 1, 2022',
        endedAt: 'December 31, 2023',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        question: 'Which HK CEO candidate do you prefer?.',
        startedAt: 'January 1, 2020',
        endedAt: 'December 31, 2020',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    let campaignIds = await queryInterface.bulkInsert('Campaigns', campaignsData, { returning: [ 'id' ] });

    let candidatesData = [
      { name: 'Michael Jordan', campaignId: campaignIds[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Stephen Curry', campaignId: campaignIds[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kobe Bryant', campaignId: campaignIds[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Leborn James', campaignId: campaignIds[0].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Carrie Lam', campaignId: campaignIds[1].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'John Tsang', campaignId: campaignIds[1].id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rebecca Ip ', campaignId: campaignIds[1].id, createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert('Candidates', candidatesData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Campagins', null, {});
    await queryInterface.bulkDelete('Candidates', null, {});
  }
};
