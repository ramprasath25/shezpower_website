$(document).ready(function () {
  function getQueryStringValue (key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
  
  $.post('http://139.59.5.183:8080/user/listProducts',{"category":getQueryStringValue("cat")},function(res){
    if(res.http_code == 200){
      var params = res.Products;
      var productList = '';
      if(params.length > 0){
      for(i = 0; i < params.length; i++ ){
            var priceTag = '';
            if(params[i].priceDetails.discountPrice === '' || params[i].priceDetails.discountPrice === null) {
              priceTag = '<span><i class="fa fa-inr"></i> '+ params[i].priceDetails.marketPrice +'</span>'
            }
            else{
              priceTag = '<span class="old-price"><i class="fa fa-inr"></i> '+ params[i].priceDetails.marketPrice +'</span> '+
                          '<i class="fa fa-inr"></i><span>'+ params[i].priceDetails.discountPrice +'</span>';
            }
            productList += '<div class="item col-sm-4 col-lg-4 col-md-4 col-xs-6">'+
              '<div class="product">'+
                  '<a class="add-fav tooltipHere" data-toggle="tooltip" data-original-title="Add to Wishlist" data-placement="left">'+
                      '<i class="glyphicon glyphicon-heart"></i>'+
                 ' </a>'+
                  '<div class="image">'+
                      '<div class="quickview">'+
                          '<a  class="btn btn-xs btn-quickview" href="product-details.html?p_id='+params[i].p_id+'">View </a>'+
                      '</div>'+
                      '<a href="product-details.html?p_id='+params[i].p_id+'"><img src="http://139.59.5.183:8080/'+params[i].images.thumbnail_img+'" alt="img" class="img-responsive"></a>'+
                      '<div class="promotion '+((params[i].priceDetails.discount =='')?"hidden":"")+'"> <span class="discount">'+params[i].priceDetails.discount +' OFF</span></div>'+
                  '</div>'+
                  '<div class="description">'+
                      '<h4><a href="product-details.html">'+params[i].title+'</a></h4>'+
                      '<div class="grid-description">'+
                        '<p>'+params[i].short_description+' </p>'+
                      '</div>'+
                      '<div class="list-description">'+
                         '<p> '+params[i].short_description +' </p>'+
                      '</div>'+
                   ' </div>'+
                  '<div class="price">'+priceTag +
                  '</div>'+
                  '<div class="action-control"><a class="btn btn-primary"> <span class="add2cart">'+
                      '<i class="glyphicon glyphicon-shopping-cart"> </i> Add to cart </span> </a>'+
                 ' </div>'+
              '</div>'+
          '</div>'
        }
      $('.categoryProduct').html(productList);
      }
      else{
        $('.categoryProduct').html('<h3 class ="text-center" >No Products found</h3>');
      }
    }
    else{
        $('.categoryProduct').html("<h3 class ='text-center'>Oops Something went wrong ..</h3>");
    }
  });

});
