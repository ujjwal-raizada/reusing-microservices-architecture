function getUsername (email) { return email } 

function getPassword (password) { return password } 

function getSubject (title) { return title } 

function getText (complaint) { return complaint } 

function transform(request_json) { 
	var username = getUsername(request_json.email)
	var password = getPassword(request_json.password)
	var subject = getSubject(request_json.title)
	var text = getText(request_json.complaint)

	var response_json = { 
		username: username,
		password: password,
		subject: subject,
		text: text,
	}

	return response_json;
}

module.exports = {transform}
