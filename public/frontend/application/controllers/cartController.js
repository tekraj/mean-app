frontApp.controller('cartController',function($scope,$stateParams,dataService){
	$scope.cart={};
	$scope.productDetail={};
	$scope.grandTotal=0;

	// ajax request to get the total product
	dataService.callAjax({},'/product/getCartItem',function(data){
		if(data!='false'){
			// add item property to all object 
			for(var i=0;i<data.length;i++){
				data[i].item=1;
			}

			$scope.productDetail=data;
		}
			

			
	})


	// function to place the order
	$scope.cart.placeOrder=function(){
		dataService.callAjax($scope.productDetail,'cart/storeOrder',function(data){
			if(data=='true')
				window.location.href='#/order';
			else
				alert('Sorry Some Error Occured');

		});

	}
	// function to dynamically add the total price when items get changed

	$scope.cart.ChangeItem=function(element,index){

		$scope.productDetail[index].item=element.item;
		var grandTotal=0;
		jQuery('.cart-table').find('.ng-scope').each(function(){
			var total=$(this).find('.subprice').text();
			grandTotal+=parseInt(total);
			
		});
		$scope.grandTotal=grandTotal;
	}



});