var {Users} = require('./users');

var expect = require("expect");

describe('create user', function(){
		var users = new Users();	
		users.users = [
		{
			id:1,
			name:"Naresh",
			room:"a"
		},
		{
			id:2,
			name:"Suresh",
			room:"b"
		},
		{
			id:3,
			name:"Santhosh",
			room:"a"
		}
	]
	it('should add new user', function(){
		var users = new Users();
		var user = users.addUser(1, 'naresh', 'dev');
		expect([user]).toEqual(users.users);
	});
	

	
	it('should return names of room', function(){
		var userList = users.getUsersList("a");
		expect(userList).toEqual(['Naresh', 'Santhosh']);
	});
	
	it('should return user', function(){
		var userList = users.getUser(3);
		expect(userList).toEqual(
			{
				id:3,
				name:"Santhosh",
				room:"a"
			}
		);
	});
	
		it('should remove the user', function(){
		var user = users.removeUser(1);
		expect(user.id).toBe(1);
	});
});