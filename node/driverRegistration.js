//driver registrations nodejs file
// inputs 
/* 

	fullname = text
	email = text 
	password = text 
	
*/
exports.reg = function(fullname, email, password) {
		var ret = fullname + " " + email + " " + password
		return ret
}
