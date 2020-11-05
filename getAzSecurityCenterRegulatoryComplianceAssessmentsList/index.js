const msRestAzure = require('@azure/ms-rest-nodeauth');
const security    = require('@azure/arm-security');

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

    var arrayRegulatoryComplianceStandards = []  ;

    await new security.SecurityCenter(
        credential,
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
            credential,
            azureSubscription,
            azureRegion
        ).regulatoryComplianceControls.list(regulatoryComplianceStandard).then(
            regulatoryComplianceControlsList => {
                regulatoryComplianceControlsList.forEach(
                    regulatoryComplianceControl => {
                        var data = {
                            standard: regulatoryComplianceStandard,
                            control: regulatoryComplianceControl.name
                        } ;
                        arrayRegulatoryComplianceStandardsControlsList.push(data) ;
                    }
                ) ;                
            }
        ) ;

    })) ;

    var arrayRegulatoryComplianceStandardsControlsAssessmentsList = [] ;

    await Promise.all(arrayRegulatoryComplianceStandardsControlsList.map(async (regulatoryCompliance) => {

        await new security.SecurityCenter(
            credential,
            azureSubscription,
            azureRegion
        ).regulatoryComplianceAssessments.list(regulatoryCompliance.standard, regulatoryCompliance.control).then(
            controlAssessments => {
                if(controlAssessments.length != 0) {
                    arrayRegulatoryComplianceStandardsControlsAssessmentsList.push(controlAssessments) ;
                } ;
            }
        ) ;
    })) ;

    context.res.json(arrayRegulatoryComplianceStandardsControlsAssessmentsList) ;
    
} ;
