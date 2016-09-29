///Register function
$('#registraionForm').submit(function () {
 registerBusiness();
 return false;
});
//http://128.199.142.243:8080/
function registerBusiness(){
	 $.post('http://localhost:8080/vendor/register', $('#registraionForm').serialize() , function(res, status, xhr){
	    if(res.status == 200){
	      $('#registraionForm')[0].reset();
	      window.alert("Thank you for registering with us.. We'll send a mail once it is confirmed..");
	      document.location.href='index.html';
	    }
	 });  
}