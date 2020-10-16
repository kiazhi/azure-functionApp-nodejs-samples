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

    var arrayRegulatoryComplianceStandards = []  ;

    await new security.SecurityCenter(
        credentials,
        azureSubscription,
        azureRegion
    ).regulatoryComplianceStandards.list().then(
        regulatoryComplianceStandardsList => {
            regulatoryComplianceStandardsList.forEach(
                regulatoryComplianceStandard => {
                    arrayRegulatoryComplianceStandards.push(regulatoryComplianceStandard.name) ;
                }
            ) ;
        }
    ) ;

    var arrayRegulatoryComplianceStandardsControlsList = [] ;
    
    await Promise.all(arrayRegulatoryComplianceStandards.map(async (regulatoryComplianceStandard) => {

        const regulatoryComplianceStandardControlsList = await new security.SecurityCenter(
            credentials,
            azureSubscription,
            azureRegion
        ).regulatoryComplianceControls.list(regulatoryComplianceStandard) ;

        arrayRegulatoryComplianceStandardsControlsList.push(regulatoryComplianceStandardControlsList) ;

    })) ;

    context.res.json(arrayRegulatoryComplianceStandardsControlsList); ;

}
