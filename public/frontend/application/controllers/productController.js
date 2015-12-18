frontApp.controller('productController',function($scope,$stateParams,dataService){

	$scope.productDetail={} // object to store the product data
	var productUrl=$stateParams.name; // get the product URL

	// ajax request to get the product detail

	var productObj={url:productUrl};

	dataService.callAjax(productObj,'product/getData',function(data){
		$scope.productDetail=data[0];
	});


	// function addToCart to add the product in cart

	$scope.addToCart=function(productId){

		dataService.callAjax({productId:productId},'product/addToCart',function(data){
			if(data=='true'){
				var productInCart=jQuery('.cart').find('span').text();
				jQuery('.cart').find('span').html(parseInt(productInCart)+1);
			}else{
				alert('Product Already in cart');
			}
		})

	}

});