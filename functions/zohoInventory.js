"use strict"
var request = require("request");

function getAllPages(objects, options, cb) {
	var requestOptions = {
		method: 'GET',
		url: `https://inventory.zoho.com/api/v1/${options.entity}`,
		qs: {...options.zohoConfig, page:options.page}
	};
	request(requestOptions, function (error, response, body) {
		if (error) {
			console.log(error);
			cb(null);
		}
		var body = JSON.parse(body);
		if (body.code != 0) {
			console.log(body);
			cb(null);
			return;
		}
		console.log("Item count", body[options.entity].length, objects.length)
		if (body[options.entity].length > 0) {
			objects = objects.concat(body[options.entity]);
			console.log("Page :", body.page_context.page);
			requestOptions.page += 1;
			getAllPages(objects, requestOptions , cb);
		} else {
			cb(objects);
		}
	});
}

function getAllZohoProducts(zohoConfig) {
	return new Promise((resolve, reject) => {
		var page = 1;
		getPage(1, "items", {zohoConfig, "entity": "items"}, response => {
			if (response) resolve(products);
			else reject("Error fetching items");
		})
	})
}

module.exports = { getAllZohoProducts , getCustomer};