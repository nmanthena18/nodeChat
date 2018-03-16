class Users {
	constructor(){
		this.users = [];
	}

	addUser (id, name, room){
		var user = {id, name, room};
		var isUserExist = this.getUserByName(name, room);
		if(!isUserExist){
			this.users.push(user);
		}else{
			return false;
		}
		
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
	
	getUserByName(name, room){
		var uName = name.toLowerCase();
		var username =  this.getUsersList(room).indexOf(uName);
		return username > -1;
	}
	
	getUsersList(room){
		var users = this.users.filter( function(user){			
			return user.room == room;
		});
		
		var namesArray = users.map( function(u){
			return u.name.toLowerCase();	
		});
		return namesArray 
	}
}

module.exports = {Users};