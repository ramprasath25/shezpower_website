function loginVendor(){
	$.post('http://139.59.5.183:8080/vendor/login', { 
		"username" : $('#loginUser').val(),
		"password" : $('#loginPassword').val()
	}, function(response){		
		if(response.http_code == 200){
			var userDetails = response.details;
			localStorage.setItem('userDetails', JSON.stringify(userDetails));
			window.location.href = 'store.html';
		}
		else if(response.http_code == 400){
			alert("Invalid username or password");
		}
	});
}