adminApp.controller('soldController',function($scope,dataService){

	/****************General Purpose Variable Declaration******************************/ 
	$scope.pageTitle='Sold Product';
	$scope.title='sold';

	var temUrl="/admin/application/views/";

	$scope.templateUrl=temUrl+'common/sold-datalist.html';

	$scope.datalist={}; //object to hold the functions releated to add,search,view,edit and delete operations 

	// array of objects for search form select  option repeatation
	$scope.selectOptions=[{'title':'product','fieldName':'Product'},{'title':'item','fieldName':'Item'},{'title':'order_id','fieldName':'Order Id'},{'title':'buyer','fieldName':'Buyer'},{'title':'status','fieldName':'Status'},{'title':'date','fieldName':'Date'}];

	// array for table data 

	$scope.tableFields=['product','item','order_id','buyer','status','date'];

	$scope.tableData={};
	$scope.search={};
	$scope.page=1;
	$scope.limit=2;


	// =========================================================================
	// ============ FUNCTIONS RELETED TO THE DATALIST page ie(viewall,get form for add and edit data ,  view data, delete data STARTS ================================================================================

	/**************************************************************************************************FUNCTION viewAll to load Data and for Resetting the datalist table***************************************************************************************************/ 
	$scope.datalist.viewAll=function(){

		// reset the templateUrl to datalist.html
		$scope.templateUrl=temUrl+'common/sold-datalist.html';

		// reset tableData 
		dataService.callAjax({searchParam:{status:1},limitParam:{limit:$scope.limit,page:$scope.page}},'order/getJoinData',function(data){
			$scope.tableData=data;
			var parameter={status:1};
			dataService.generatePagination('order',$scope.limit,parameter,function(data){
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
			dataService.callAjax({searchParam:searchObj,limitParam:{limit:$scope.limit,page:$scope.page}},'order/getJoinData',function(data){
				if(data){
					$scope.tableData=data;
					$scope.search={};
				}
			});
		}		
		
	}
	/***************** FUNCTION searchData  End **************************************/


		$scope.datalist.viewOrder=function(viewData){
			$scope.templateUrl=temUrl+'common/'+$scope.title+'-view.html';
			$scope.viewData=viewData;
		}


	jQuery(document).on('click','#pagination span',function(){
		var index=jQuery(this).attr('page_no');
		var parameter={status:1};
		dataService.pagination(index,$scope.page,$scope.totalPage,$scope.limit,'order/getJoinData',parameter,function(data){
			$scope.page=data.page;
			$scope.tableData=data.data;
		});
	});


 

	

});