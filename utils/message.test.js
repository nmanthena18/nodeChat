var expect = require("expect");

var gM = require('./message')

describe('generateMessage', function(){
	it('should generate correct message object', function(){
		var name ="Naresh";
		var body = "hey how are you.!"
		
		var message = gM.generateMessage(name, body);
		expect(message.createdAt).toBeA("number");
		expect(message).toInclude({name : "Naresh", body:"hey how are you.!"})
	});
	
	it('should generate user location', function(){
		var latitude = 17.385044;
		var longitude = 78.486671
		
		var message = gM.shareLocation(latitude, longitude);
		expect(message.createdAt).toBeA("number");
		expect(message.latitude).toBeA("number");
		expect(message.longitude).toBeA("number");
	});
});

