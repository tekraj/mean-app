adminApp.controller('orderController',function($scope,dataService){

	/****************General Purpose Variable Declaration******************************/ 
	$scope.pageTitle='Order';
	$scope.title='order';

	var temUrl="/admin/application/views/";

	$scope.templateUrl=temUrl+'common/order-datalist.html';

	$scope.datalist={}; //object to hold the functions releated to add,search,view,edit and delete operations 

	// array of objects for search form select  option repeatation
	$scope.selectOptions=[{'title':'order_no','fieldName':'Order No'},{'title':'status','fieldName':'Status'},{'title':'date','fieldName':'Date'}];
	$scope.statusField=[{'value':true,'fieldName':'Active'},{'value':false,'fieldName':'In-active'}];


	// array for table data 

	$scope.tableFields=['order_id','buyer_name','payment_method','amount','status','date'];

	$scope.tableData={};
	$scope.formData={};
	$scope.viewObject={};
	$scope.search={};
	$scope.page=1;
	$scope.limit=2;


	// =========================================================================
	// ============ FUNCTIONS RELETED TO THE DATALIST page ie(viewall,get form for add and edit data ,  view data, delete data STARTS ================================================================================

	/**************************************************************************************************FUNCTION viewAll to load Data and for Resetting the datalist table***************************************************************************************************/ 
	$scope.datalist.viewAll=function(){

		// reset the templateUrl to datalist.html
		$scope.templateUrl=temUrl+'common/order-datalist.html';

		// reset tableData 
		dataService.callAjax({searchParam:{},limitParam:{limit:$scope.limit,page:$scope.page}},'buyer/getData',function(data){
			$scope.tableData=data;
			var parameter={};
			dataService.generatePagination('buyer',$scope.limit,parameter,function(data){
				$scope.totalPage=data;
			});
		});
	};
	$scope.datalist.viewAll();
	/***************** FUNCTION viewALl End **************************************/ 


	/**************************************************************************************************FUNCTION searchData to search from database***********************************************************************************************************************/ 
	$scope.datalist.searchData=function(){
		event.preventDefault();
		if($scope.search.searchby!=null && $scope.search.searchkey!=null){
			searchObj={searchby:$scope.search.searchby,searchkey:$scope.search.searchkey};
			dataService.callAjax({searchParam:searchObj,limitParam:{limit:$scope.limit,page:$scope.page}},'buyer/getData',function(data){
				if(data){
					$scope.tableData=data;
					$scope.search={};
				}
			});
		}		
		
	}
	/***************** FUNCTION searchData  End **************************************/




	/**************************************************************************************************FUNCTION getDeliveryForm ***************************************************************************************************/ 
	$scope.datalist.getDeliveryForm=function(trs){

		// reset the templateUrl to datalist.html
		$scope.templateUrl=temUrl+'form/'+$scope.title+'-form.html';
		$scope.orderData=trs;

	};
	/***************** FUNCTION getDeliveryForm End **************************************/ 


		$scope.datalist.viewOrder=function(viewData){
			$scope.templateUrl=temUrl+'common/'+$scope.title+'-view.html';
			$scope.viewData=viewData;
		}

	/**************************************************************************************************FUNCTION verifyDelivery ***************************************************************************************************/ 
	$scope.datalist.verifyDelivery=function(){


		if($scope.formData.delivered_by!=null && $scope.formData.delivery_date!=null){

			$scope.formData._id=$scope.orderData._id;
			$scope.formData.status=1;

			dataService.callAjax($scope.formData,'buyer/update',function(data){
				if(data=='true'){
					
					dataService.callAjax({order_id:$scope.orderData.order_id},'order/update',function(datas){
						if(datas=='true')
							alert('Delivery Verified');
						else
							alert('Some Erro occured');
					});
					
				}else{
					alert('Some error occured')
				}
				$scope.datalist.viewAll();
			});
		}		

	};
	/***************** FUNCTION verifyDelivery End **************************************/ 


	jQuery(document).on('click','#pagination span',function(){
		var index=jQuery(this).attr('page_no');
		var parameter={};
		dataService.pagination(index,$scope.page,$scope.totalPage,$scope.limit,'buyer/getJoinData',parameter,function(data){
			$scope.page=data.page;
			$scope.tableData=data.data;
		});
	});


 

	

});