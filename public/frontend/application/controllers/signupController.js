frontApp.controller('signupController',function($scope,dataService){
	$scope.formData={};

	$scope.signup=function(){

		dataService.callAjax($scope.formData,'member/insert',function(data){

			if(data!='false'){
				alert('You have been successfully Registered');
				window.location.href='#/login';
			}else{
				alert('Sorry Some Error Occured');
			}
		})
	}
})