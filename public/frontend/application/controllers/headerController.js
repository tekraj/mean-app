frontApp.controller('headerController',function($scope,dataService){
	
	// ajax request to get the categories
	dataService.callAjax({},'category/getData',function(data){
		if(data!='false'){
			$scope.category=data;
		}
	});
	//ajaxRequest to get the brands	
	dataService.callAjax({},'brand/getData',function(data){
		$scope.brand=data;
	})

});