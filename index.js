'use strict';
var aws = require("aws-sdk");
var request = require("request");

module.exports.invokeLambda = (functionName, jsonPayload, region = 'us-west-2') => {
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
