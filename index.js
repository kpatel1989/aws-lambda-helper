'use strict';
var aws = require("aws-sdk");
var request = require("request");
const log_group = process.env.AWS_LAMBDA_LOG_GROUP_NAME;
const stream_group = process.env.AWS_LAMBDA_LOG_STREAM_NAME;
const logUrl = `https://${process.env.AWS_REGION}.console.aws.amazon.com/cloudwatch/home?region=${process.env.AWS_REGION}#logEventViewer:group=${log_group};stream=${stream_group}`; // final url for cloud watch
const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
const jobName = process.env.jobName;

function insertLogsToDatabase(phase, statusMessage, status,jobItemNumber,jobItemType,createdAt=null) {
    console.log(`Logging ${statusMessage} to database`);
    return invokeLambda("DatabaseInsertLogs", { jobName, logUrl, status, extraFields: {phase, functionName}, jobItemNumber, statusMessage, createdAt, updatedAt:new Date().getTime() , integrationId : 1, jobItemType },'us-west-2'); // integrationID = 1 for Go Integration ZohoINV to Shopify integration
}

function invokeLambda(functionName, jsonPayload, region = 'us-west-2') {
    return new Promise((resolve, reject) => {
        console.log(`Invoking ${functionName}`);
        var lambda = new aws.Lambda({
            region: region
        });
        lambda.invoke({
            FunctionName: functionName,
            Payload: JSON.stringify(jsonPayload, null, 2) // pass params
        }, function (error, data) {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (data.Payload) {
                var response = JSON.parse(data.Payload);
                console.log(response);
                resolve(response);
            }
        });
    });
}

function zohoInvRequest(requestOptions, zohoConfig) {
    var options =
        {
            method: requestOptions.method,
            url: 'https://inventory.zoho.com/api/v1' + requestOptions.url,
            qs: zohoConfig,
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': requestOptions.contentType || 'application/x-www-form-urlencoded'
            }
        };
    if (requestOptions.body) {
        options.form = body
    }
    console.log("Options:", options);
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.log("Request error", error||body);
                reject(error || body);
            } else {
                body = JSON.parse(body);
                console.log("Response",body);
                if (body.code != 0) reject(body);
                else resolve(body);
            }
        });
    })
}

function shopifyRequest (requestOptions, shopifyConfig) {
    return new Promise((resolve, reject) => {
        var options = {
            method: requestOptions.method,
            url: `https://${shopifyConfig.apiKey}:${shopifyConfig.password}@${shopifyConfig.shopName}.myshopify.com/${requestOptions.url}`,
            headers:
            {
                'content-type': 'application/json'
            },
            body: requestOptions.body,
            json: true
        };
        console.log(options);
        request(options, function (error, response, body) {
            console.log("Shopify request processed : ", requestOptions.url);
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Shopify response", body);
                resolve(body);
            }
        });
    });
}

module.exports = {functionName,jobName,logUrl,insertLogsToDatabase,invokeLambda,shopifyRequest,zohoInvRequest};