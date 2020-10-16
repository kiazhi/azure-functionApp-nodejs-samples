# An Azure Function on NodeJS Example

A small demo project on Azure Function with NodeJS to query public cloud Rest Api for data.

## Getting Started with Visual Studio Code

1. Rename the `local.settings.json.example` to `local.settings.json` filename

```sh
mv ./local.settings.json.example ./local.settings.json
```

2. Replace the values for `AzureApplicationId`, `AzureSecret`, `AzureTenant`, `AzureSubscription` and `AzureRegion` environment variables with your own environment values.

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureApplicationId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "AzureSecret": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "AzureTenant": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "AzureSubscription": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "AzureRegion": "southeastasia"
  }
}
```

3. Start Debugging (F5) on Visual Studio Code

4. Click on the links that is generated in the terminal to view results on browser.
