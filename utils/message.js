module.exports = {
	generateMessage : function(name, body){
		return {
			name,
			body,
			createdAt: new Date().getTime()
		}
	},
	shareLocation : function(user, location){
		return {
			user,
			latitude:location.latitude,
			longitude:location.longitude,
			createdAt: new Date().getTime()
		}
	}
}
