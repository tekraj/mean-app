frontApp.controller('orderController',function($scope,$stateParams,$http,dataService){

	// function to check the user is logged in or not
	(function(){
		dataService.callAjax({},'/order/checkLogedIn',function(data){
			if(data!='false')
				$scope.member=data;
				
			else
				window.location.assign('#/login');
		})	;
	})()

	$scope.formData={}; // object to store the formdata
	$scope.orderData={};



	// get order detail
	dataService.callAjax({},'/order/getOrder',function(data){
		$scope.orderData=data;
	});

	// function to store t buyers information

	$scope.addBuyer=function(){
		var date=new Date();
		var inputData=$scope.formData;
		inputData.amount=$scope.grandTotal;
		inputData.member=$scope.member._id;
		inputData.order_id=$scope.member._id.slice(0,10) + date.getTime();		

		dataService.callAjax(inputData,'/buyer/insert',function(data){
			if(data!='false'){
					
				$scope.addOrder(data);
			}else{
				alert('Sorry Some error occured');
			}
		});

		
	}

	// function to insert the ordered product into order schema

	$scope.addOrder=function(orderData){
		inputData=$scope.orderData;
		var datas=[];

		// get desctiption for paypal

		var desctiption=jQuery('.order-table').html();
		$scope.paypalDescription="You have to pay $"+$scope.grandTotal;
		
		for(var i=0;i<inputData.length;i++){

			datas.push({buyer:orderData._id,product:inputData[i]._id,order_id:orderData.order_id,item:inputData[i].item});
		}

		dataService.callAjax(datas,'order/insertOrder',function(data){
			
			if(data=='true'){
				if($scope.formData.payment_method=='paypal'){
					
					jQuery('#paypal_form').submit();
				}else{
					window.location.assign('/');
				}
			}

		});
	}


});