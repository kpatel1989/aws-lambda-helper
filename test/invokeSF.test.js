const {expect} = require('chai');
var aws = require("aws-sdk");
aws.config.region = 'us-west-2';
const {invokeStepFunction} = require('../functions/index');
describe('Test invoking step function',()=>{
    it('should invoke step function successfully!',(done)=>{
        invokeStepFunction({},{invokedFunctionArn:'arn:aws:lambda:us-west-2:USERID:function:'},'Helloworld','test')
            .then(success=>{
                console.log(success);
                expect(success.executionArn).to.be.a('string');
                done();
            })
            .catch(done);
    });
});