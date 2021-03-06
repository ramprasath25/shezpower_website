// Product details javascript...
$(document).ready(function () {
  function getQueryStringValue (key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
 
  $.post('http://139.59.5.183:8080/user/productDetails',{"p_id":getQueryStringValue("p_id")},function(res){
    console.log(res);
    if(res.http_code == 200){
        //BreadCrumb
        var params = res.Details;
        $('.breadcrumbDiv').html('<ul class="breadcrumb">'+
                                  '<li><a href="index.html">Home</a></li>'+
                                  '<li><a href="">'+params.category+'</a></li>'+
                                  '<li><a href="products.html?cat='+params.sub_category+'">'+params.sub_category+'</a></li>'+
                                  '</ul>');

        $('.product-img').html('<img src="http://139.59.5.183:8080/'+params.images.detail_img+'" class="img-responsive" id ="img-details" alt="img">');
        var specs = '';
        if(params.specs){
          specs += '<ul>';
            $.each( params.specs, function(k,v){
                specs += '<li>'+ k +' : '+ v +'</li>';
            });
          specs += '</ul>'
        }
        else{
          specs += 'No Specification available';
        }
        /*** Price ***/
        var priceTag = '';
        if(params.priceDetails.discountPrice === '' || params.priceDetails.discountPrice === null) {
          priceTag = '<span class="price-sales"><i class="fa fa-inr"></i> '+ params.priceDetails.marketPrice +'</span>'
        }
        else{
          priceTag = '<span class="price-sales"><i class="fa fa-inr"></i>'+ params.priceDetails.discountPrice +'</span> '+
                        '<span class="price-standard"><i class="fa fa-inr"></i> '+ params.priceDetails.marketPrice +'</span>';
        }

        var details = '<h1 class="product-title"> '+params.title +'</h2>'+
                        '<div class="rating">'+
                            '<p><span><i class="fa fa-star"></i></span> <span><i class="fa fa-star"></i></span> <span><i'+
                                    'class="fa fa-star"></i></span> <span><i class="fa fa-star"></i></span> <span><i'+
                                    'class="fa fa-star-o "></i></span> <span class="ratingInfo"> <span> / </span> <a'+
                                    'data-toggle="modal" data-target="#modal-review"> Write a review</a> </span></p>'+
                        '</div>'+
                        '<div class="product-price">'+priceTag+'</div>'+
                        '<div class="details-description">'+
                            '<p>'+params.short_description+' </p>'+
                        '</div>'+
                        '<div class="cart-actions">'+
                            '<div class="addto row">'+
                                '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">'+
                                    '<button onclick="productAddToCartForm.submit(this);"'+
                                            'class="button btn-block btn-cart cart first" title="Add to Cart" type="button">Add to Cart'+
                                    '</button>'+
                                '</div>'+
                                '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><a class="link-wishlist wishlist btn-block ">Add to Wishlist</a></div>'+
                            '</div>'+
                            '<div style="clear:both"></div>'+
                            '<h3 class="incaps"><i class="fa fa fa-check-circle-o color-in"></i> In stock</h3>'+
                            '<h3 style="display:none" class="incaps"><i class="fa fa-minus-circle color-out"></i> Out of stock'+
                            '</h3>'+
                        '</div>'+
                        '<div class="clear"></div>'+
                        '<div class="product-tab w100 clearfix">'+
                            '<ul class="nav nav-tabs">'+
                                '<li class="active"><a href="#details" data-toggle="tab">Details</a></li>'+
                                '<li><a href="#specs" data-toggle="tab">Specs</a></li>'+
                            '</ul>'+
                            '<div class="tab-content">'+
                                '<div class="tab-pane active" id="details">'+params.description+'</div>'+
                                '<div class="tab-pane" id="specs"> '+specs+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div style="clear:both"></div>'+
                        '<div class="product-share clearfix">'+
                            '<p> SHARE </p>'+
                            '<div class="socialIcon">'+
                                '<a href="#"> <i class="fa fa-facebook"></i></a>'+
                                '<a href="#"> <i class="fa fa-twitter"></i></a>'+
                                '<a href="#"> <i class="fa fa-google-plus"></i></a>'+
                                '<a href="#"> <i class="fa fa-pinterest"></i></a></div>'+
                        '</div>'+
                '</div>';
            $('.detailsBody').html(details);
    }
    else{

    }
  });

}); // end Ready
