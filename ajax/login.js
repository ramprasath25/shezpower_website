function loginVendor(){
	var username = $('#loginUser').val();
	var pass = $('#loginPassword').val();
	$.post('http://127.0.0.1:8080/vendor/login', { 
		"mobileNo" : username,
		"password" : pass
	}, function(response){
		if(response.http_code == 200){
			var userDetails = response.details;
			localStorage.setItem('userDetails', JSON.stringify(userDetails));
			window.location.href = 'store.html';
		}
	});
}