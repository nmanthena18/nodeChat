class Users {
	constructor(){
		this.users = [];
	}

	addUser (id, name, room){
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	
	removeUser(id){
		var user = this.getUser(id);
		if(user){
			this.users = this.users.filter( function(user){
				return user.id !== id;
			})
		}
		return user;
	}
	
	getUser(id){
		var obj = this.users.filter(function (u, i){
			if(u.id == id){
				return u;
			}			
		})
		return obj[0];
	}
	
	getUsersList(room){
		var users = this.users.filter( function(user){			
			return user.room == room;
		});
		
		var namesArray = users.map( function(u){
			return u.name	
		});
		return namesArray 
	}
}

module.exports = {Users};