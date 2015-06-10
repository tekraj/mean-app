adminApp.controller('userController',function($scope,ajaxService){

	/****************General Purpose Variable Declaration******************************/ 
	$scope.pageTitle='User';
	$scope.title='user';

	var temUrl="/admin/application/views/";

	$scope.templateUrl=temUrl+'common/datalist.html';

	// array of objects for search form select  option repeatation
	$scope.selectOptions=[{'title':'fullname','fieldName':'Full Name'},{'title':'username','fieldName':'User Name'},{'title':'email','fieldName':'Email'},{'title':'status','fieldName':'Status'},{'title':'date','fieldName':'Date'}];

	// array for table data 

	$scope.tableFields=['fullname','username','email','status','date'];

	$scope.tableData={};

	// ajax request to get all users data 
	ajaxService.callAjax({},$scope.title+'/getData',function(data){
		console.log(data);
	});



})