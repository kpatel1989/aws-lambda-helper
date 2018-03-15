var request = require("request");

var options = {
	method: 'GET',
	url: 'https://0296abdf0f7e06c63b14109514d8b860:eeb7f490cbdc09dc85b565149deea3c7@barbersuppliesco-ca.myshopify.com/admin/customers.json',
	qs: { page: '1' },
	headers:
		{
			'postman-token': 'fb19cb51-a47c-3c44-e3fb-a91647405137',
			'cache-control': 'no-cache',
			'content-type': 'application/json'
		},
	json: true
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	console.log(body);
});
