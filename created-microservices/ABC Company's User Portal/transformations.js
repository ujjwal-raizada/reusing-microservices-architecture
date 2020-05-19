function getUsername (name) { return name } 

function getName (nick) { return nick } 

function transform(request_json) { 
	var username = getUsername(request_json.name)
	var name = getName(request_json.nick)

	var response_json = { 
		username: username,
		name: name,
	}

	return response_json;
}

module.exports = {transform}
