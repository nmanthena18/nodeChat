var generateMessage = function(name, body){
	return {
		name,
		body,
		createdAt: new Date().getTime()
	}
}

module.exports.generateMessage = generateMessage;