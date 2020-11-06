const msRestAzure = require('@azure/ms-rest-nodeauth');
const azResources = require('@azure/arm-resources');

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

    const client = await new azResources.ResourceManagementClientContext(
        credential,
        azureSubscription
    ) ;

    const resourcesByResourceGroupList = await new azResources.Resources(client).list() ;

    context.res.json(resourcesByResourceGroupList) ;

} ;
