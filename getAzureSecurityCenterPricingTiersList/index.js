const msRestAzure = require('@azure/ms-rest-nodeauth');
const security = require('@azure/arm-security');

const azureAppId        = process.env["AzureApplicationId"] ;
const azureSecret       = process.env["AzureSecret"] ;
const azureTenant       = process.env["AzureTenant"] ;
const azureSubscription = process.env["AzureSubscription"] ;
const azureRegion       = process.env["AzureRegion"] ;

module.exports = async function (context, req) {

    const credential = await msRestAzure.loginWithServicePrincipalSecret(
        azureAppId,
        azureSecret,
        azureTenant
    ) ;

    const securityCenterPricingTiersList = await new security.SecurityCenter(
        credential,
        azureSubscription,
        azureRegion
      ).pricings.list() ;

    context.res.json(securityCenterPricingTiersList) ;
    
} ;
