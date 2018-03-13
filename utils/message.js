module.exports = {
	generateMessage : function(name, body){
		return {
			name,
			body,
			createdAt: new Date().getTime()
		}
	},
	shareLocation : function(latitude, longitude){
		return {
			latitude,
			longitude,
			createdAt: new Date().getTime()
		}
	}
}
