frontApp.controller('loginController',function($scope,dataService){
	
	$scope.formData={}; // object to store the login formdata

	// function to login member

	$scope.login=function(){
		var loginData=$scope.formData;
		if(loginData.username!='' && loginData.password!= '' ){

			dataService.callAjax(loginData,'member/login',function(data){
				if(data=='true'){
					window.location.assign('/');
				}else{
					jQuery('.alert').addClass('show-it').find('#err-message').html('Invalid Email or Password');
				}
			})
		}	
	}
});