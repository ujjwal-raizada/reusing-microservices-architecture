function getProduct (service) { return service } 

function getName (name) { return name } 

function transform(request_json) { 
	var product = getProduct(request_json.service)
	var name = getName(request_json.name)

	var response_json = { 
		product: product,
		name: name,
	}

	return response_json;
}

module.exports = {transform}
