const msRestAzure = require('@azure/ms-rest-nodeauth');
const security    = require('@azure/arm-security');

const azureAppId        = process.env["AzureApplicationId"] ;
const azureSecret       = process.env["AzureSecret"] ;
const azureTenant       = process.env["AzureTenant"] ;
const azureSubscription = process.env["AzureSubscription"] ;
const azureRegion       = process.env["AzureRegion"] ;

module.exports = async function (context, req) {

    const credentials = await msRestAzure.loginWithServicePrincipalSecret(
        azureAppId,
        azureSecret,
        azureTenant
    ) ;

    const secureScoreControlsList = await new security.SecurityCenter(
        credentials,
        azureSubscription,
        azureRegion
      ).secureScoreControls.list() ;

    context.res.json(secureScoreControlsList) ;

}
