const msRestAzure = require('@azure/ms-rest-nodeauth');
const azSupport = require('@azure/arm-support');

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

    const client = await new azSupport.MicrosoftSupportContext(
        credential,
        azureSubscription
    ) ;

    const supportTicketsList = await new azSupport.SupportTickets(client).list() ;

    context.res.json(supportTicketsList) ;

} ;
