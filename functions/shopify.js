var request = require("request");

function getAllShopifyProducts(shopConfig, page, cb) {
	shopifyOptions.qs.page = page;
	shopifyOptions.url = `https://${shopConfig.apiKey}:${shopConfig.password}@${shopConfig.shopName}.myshopify.com/admin/products.json`,
		// console.log(shopifyOptions.url);
		request(shopifyOptions, function (error, response, body) {
			if (error) {
				console.log(error);
				cb("Error");
			}
			console.log(body);
			body = JSON.parse(body);
			console.log("Item count", shopifyProducts.length)
			if (body.products.length > 0) {
				shopifyProducts = shopifyProducts.concat(body.products);
				console.log("Shopify products page :", page);
				getAllShopifyProducts(shopConfig, page + 1, cb);
			} else {
				cb("Done");
			}
		});
}