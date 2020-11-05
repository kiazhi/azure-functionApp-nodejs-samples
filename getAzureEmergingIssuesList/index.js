const msRestAzure = require('@azure/ms-rest-nodeauth');
const https = require('https');
const axios = require('axios');

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

    const token = await (await credential.getToken()).accessToken;

    let url = `https://management.azure.com/providers/Microsoft.ResourceHealth/emergingIssues?api-version=2018-07-01`;

    const agent = new https.Agent(
        {
            rejectUnauthorized: false,
        }
    );

    const res = await axios.get(url,
        {
            headers: {
                httpsAgent: agent,
                Authorization: `Bearer ${token}`,
            },
        }
    ) ;

    context.res.json(res.data.value) ;

} ;
