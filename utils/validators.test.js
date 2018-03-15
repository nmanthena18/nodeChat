var expect = require("expect");
var validator = require('./validators');

describe('validate name and room', function(){
	it('should return the name and room as a string', function(){
		var name ="naresh";
		var room = "developer";
		expect(validator.isString(name)).toBeTruthy();
		expect(validator.isString(room)).toBeTruthy();
	});
});