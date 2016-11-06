$.post('http://127.0.0.1:8080/user/listProducts', { "cat_id" : "pr_10" }, function(res){
    if(res.http_code == 200){
      var params = res.products;
      var productList = '';
      if(params.length > 0){
      for(i = 0; i < 3; i++ ){

            productList += '<div class="item col-sm-4 col-lg-4 col-md-4 col-xs-6">\
              <div class="product">\
                  <a class="add-fav tooltipHere" data-toggle="tooltip" \
                     data-original-title="Add to Wishlist" data-placement="left">\
                      <i class="glyphicon glyphicon-heart"></i>\
                  </a>\
                  <div class="image">\
                      <div class="quickview">\
                          <a  class="btn btn-xs btn-quickview" \
                             href="product-details.html?p_id='+params[i].p_id+'">View </a>\
                      </div>\
                      <a href="product-details.html?p_id='+params[i].p_id+'"><img src="'+params[i].img.thumbnail+'" alt="img" class="img-responsive"></a>\
                      <div class="promotion '+((params[i].sale.discount =='nill')?"hidden":"")+'"> <span class="discount">'+params[i].sale.discount+' OFF</span></div>\
                  </div>\
                  <div class="description">\
                      <h4><a href="product-details.html">'+params[i].title+'</a></h4>\
                      <div class="grid-description">\
                          <p>'+params[i].short_description+' </p>\
                      </div>\
                      <div class="list-description">\
                          <p> '+params[i].description +' </p>\
                      </div>\
                    </div>\
                  <div class="price"><span class="old-price '+((params[i].price =='nill')?"hidden":"")+'"><i class="fa fa-inr"></i> '+params[i].price+'</span> <i class="fa fa-inr"></i> <span>'+params[i].sale.salePrice+'</span> </div>\
                  <div class="action-control"><a class="btn btn-primary"> <span class="add2cart">\
                  <i class="glyphicon glyphicon-shopping-cart"> </i> Add to cart </span> </a>\
                  </div>\
              </div>\
          </div>'
        }
      $('.product_list').html(productList);
      }
      else{
        $('.product_list').html('<h3 class ="text-center" >No Products found</h3>');
      }
    }
    else{
        $('.product_list').html("<h3 class ='text-center'>Oops Something went wrong ..</h3>");
    }
  });