frontApp.controller('categoryController',function($scope,$stateParams,dataService){

	$scope.title='category';
	$scope.category=$stateParams.category;// get the current category form stateParams 
	$scope.brand=$stateParams.brand;// get the current brand form stateParams

	$scope.porducts={}; // define object to store all products releated to category and brand



	// ajax request to get porducts
	var productCat={};// define object for search parameter
	if($stateParams.brandId==''){
		productCat={category:$stateParams.catId};
	}else{
		productCat={category:$stateParams.catId,brand:$stateParams.brandId};
	}
	dataService.callAjax(productCat,'product/getData',function(data){
		if(data!='false')
			$scope.products=data;
	})

	


});