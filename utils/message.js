var moment = require('moment');
module.exports = {
	generateMessage : function(name, body){
		return {
			name,
			body,
			createdAt: moment().valueOf()
		}
	},
	shareLocation : function(user, location){
		return {
			user,
			latitude:location.latitude,
			longitude:location.longitude,
			createdAt: moment().valueOf()
		}
	}
}
