function getUsername (name) { return name } 

function getProduct (service) { return service } 

function getTime (time) { return time } 

function transform(request_json) { 
	var username = getUsername(request_json.name)
	var product = getProduct(request_json.service)
	var time = getTime(request_json.time)

	var response_json = { 
		username: username,
		product: product,
		time: time,
	}

	return response_json;
}

module.exports = {transform}
