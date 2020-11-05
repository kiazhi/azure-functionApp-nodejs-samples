const msRestAzure = require('@azure/ms-rest-nodeauth');
const resourceHealth = require('@azure/arm-resourcehealth');

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

    const resourceHealthList = await new resourceHealth.MicrosoftResourceHealth(
        credential,
        azureSubscription
    ).availabilityStatuses.listBySubscriptionId() ;

    context.res.json(resourceHealthList) ;
    
} ;
