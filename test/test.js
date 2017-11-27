"use-strict"
const a = { "confirmationCode": "", "companyName": "Kpatel", "firstName": "Kartik", "lastName": "Patel", "emailAddress": "kartik@gointegrations.com", "password": "Kartik123", "confirmPassword": "Kartik123", "companyAddress": "44 Horseley Hill Drive,, Scarborough", "contactNumber": "6474495130" }
const expect = require('expect');
const { functionName,jobName,logUrl,log,invokeLambda,shopifyRequest,zohoInvRequest } = require("../functions/index");

describe('Variables', () => {
	it('Should not be null', () => {
		console.log(invokeLambda);
		expect(invokeLambda).toNotBe(null); 
		expect(shopifyRequest).toNotBe(null); 
		expect(zohoInvRequest).toNotBe(null); 
	});
});
