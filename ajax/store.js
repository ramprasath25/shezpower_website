/*** Onload function ***/
$(function(){
  //Getting Local storage
  var userDetails = JSON.parse(localStorage.getItem('userDetails'));    
  if(userDetails !== null && userDetails !== ''){    
    getProductList(userDetails.vendor_id);
    $('#userName').text("Hi "+userDetails.vendorDetails.firstName+userDetails.vendorDetails.lastName);
  }
  else{
    window.location.href = 'index.html';
  }
});
/** Add prduct Form display **/
function addProduct(){
  $('.productForm').show();
  $('.productList').hide();
  getCategoryList();
}

/** Goback **/
function cancelUpload(){
  $('#addProductsForm')[0].reset();
  $('.productForm').hide();
  $('.productList').show();
  window.scrollTo(0,0);  
}
/*** Get PRoduct List ***/
function getProductList(id){
  $('.productForm').hide();
  $('.productList').show();  
  window.scrollTo(0,0);  
  $.post("http://127.0.0.1:8080/vendor/getProductList",
    { vendor_id : id }, function(response){
    var params = '';
    var productList = response.productsList;
    if(productList.length > 0){
      for(i = 0; i < productList.length; i++){
        var labelColor = (productList[i].active == true) ? 'label-success' : 'label-warning' ;
        var status = (productList[i].active == true) ? 'Active' : 'Inactive' ;
        params += "<tr><td>"+ ( i + 1 ) +"</td>"+
                  "<td>"+ productList[i].title +"</td>"+
                  "<td>"+ productList[i].stocksLeft +"</td>"+
                  "<td><span class='label "+labelColor+"'>"+ status+"</span></td>"+
                  "<td><a onclick='viewProduct(\""+ productList[i].p_id +"\")'>View</a> | "+
                  "<a onclick='deleteProduct(\""+productList[i].p_id +"\")'>Delete</a></td></tr>";
      }
      $('#listTable').html(params);
    }
    else{
      $('#listTable').html('<tr><td colspan="5"><center><b>No Products found</b></center></td></tr>')
    }    
  });
}
/*** View Product ***/
function viewProduct(p_id){

}
/*** Delete Product ***/
function deleteProduct(p_id){

}
/*** Category Change event ***/
$('#categoryList').change(function(){
  getCategoryList($(this).val());
});
/*** Get Category List ***/
function getCategoryList(category){ 
  $.post('http://127.0.0.1:8080/vendor/getCategoryList', { "type": category }, function(res){
    if(res){
      var options = '';
      for(i = 0; i < res.CategoryList.length; i++){
        options += "<option value='"+res.CategoryList[i].title+"''>"+res.CategoryList[i].title+"</option>"
      }
    }
    $('#subcategoryList').html(options);
  });
}
/**** Add Products ****/
$(document).ready(function(){
  $("form").submit(function(e){
	   e.preventDefault();
     var userDetails = JSON.parse(localStorage.getItem('userDetails'));
     $('#vendorId').val(userDetails.vendor_id);     
  	 var formData = new FormData(jQuery('#addProductsForm')[0]);  	
     jQuery.ajax({
       type:'POST',
       url:"http://127.0.0.1:8080/vendor/addProduct",
       data: formData,
       processData: false,
       contentType: false,
        success:function(response){
            if(response.http_code == 200){
              alert("Added successful..");
              getProductList(userDetails.vendor_id);
            }
        },
        error:function() {
            alert("error");
        }
     });
  });
});

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
/*** Logout and Local storage clear ****/
function logoutVendor(){
  localStorage.clear();
  window.location.href = 'index.html';
}