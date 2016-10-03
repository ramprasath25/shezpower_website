$(document).ready(function(){
  $("form").submit(function(e){
	e.preventDefault();
  	var formData = new FormData(jQuery('#addProductsForm')[0]);
  	console.log("formData");
  	console.log(jQuery('input[type=file]')[0].files[0]);
 jQuery.ajax({
   type:'POST',
   url:"http://localhost:8080/vendor/upload",
   data: formData,
   processData: false,
   contentType: false,
   success:function(response){
        console.log(response)
    },
  error:function() {
        alert("error");
    }
 });
});
});


$(function(){
	//Getting Local storage
	var userDetails = JSON.parse(localStorage.getItem('userDetails'));
	if(userDetails !== null && userDetails !== ''){
		$('#userName').text("Hi "+userDetails.email);
	}
	else{
		window.location.href = 'index.html';
	}
});

function logoutVendor(){
	localStorage.clear();
	window.location.href = 'index.html';
}
//Change the image url
$('#thumbImgBtn').change(function(){
        readURL(this, "thumbnail");
});
$('#mainImgBtn').change(function(){
        readURL(this, "mainImage");
});
//Common function to change the image preview
function readURL(input, id) {
	
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#'+id).attr('src', e.target.result);
        }        
        reader.readAsDataURL(input.files[0]);
    }
}

// $('#addProductsForm').submit(function(e){
// 	// addProduct();
// 	// return false;
// 	console.log($(this));
// 		e.preventDefault();
// 		var formData = new FormData($('#addProductsForm'));
//         //var formData = new FormData($('#addProductsForm')[0]);
//         console.log(formData);
//          $.ajax({
// 		    url: 'http://localhost:8080/vendor/testProduct',
// 		    type: 'POST',
// 		    data: formData,
// 		    async: false,
// 		    cache: false,
// 		    contentType: false,
// 		    processData: false,
// 		    success: function (returndata) {
// 		      alert(returndata);
// 		    }
// 		  });
//         // jQuery.ajax({
//         //     url: 'http://localhost:8080/vendor/testProduct',
//         //     data: data,
//         //     cache: false,
//         //     contentType: false,
//         //     processData: false,
//         //     type: 'POST',
//         //     success: function(data){
//         //         console.log(data);
//         //         console.log(data.data.thumb_url);
//         //         console.log(data.data.img_url);
//         //     }
//         // });
// });

// function addProduct(){
// 	var fileData = new FormData($('#thumbImgBtn').files[0]);
	
// 	console.log(fileData);
	
// 	 $.post('http://localhost:8080/vendor/testProduct', fileData , function(res, status, xhr){
// 	    if(res.status == 200){

// 	    }
// 	 }); 
// };