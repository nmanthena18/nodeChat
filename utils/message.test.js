var expect = require("expect");

var gM = require('./message')

describe('generateMessage', function(){
	it('should generate correct message object', function(){
		var from ="Naresh";
		var body = "hey how are you.!"
		
		var message = gM.generateMessage(from, body);
		expect(message.createdAt).toBeA("number");
		expect(message).toInclude({body:"hey how are you.!",from : "Naresh"})
	});

});
