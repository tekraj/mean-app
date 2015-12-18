adminApp.controller('cmsPostController',function($scope,dataService){

	/****************General Purpose Variable Declaration******************************/ 
	$scope.pageTitle='CMS Post';
	$scope.title='cms_post';

	var temUrl="/admin/application/views/";

	$scope.templateUrl=temUrl+'common/datalist.html';

	$scope.datalist={}; //object to hold the functions releated to add,search,view,edit and delete operations 

	// array of objects for search form select  option repeatation
	$scope.selectOptions=[{'title':'name','fieldName':'Name'},{'title':'category','fieldName':'Category'},{'title':'status','fieldName':'Status'},{'title':'date','fieldName':'Date'}];
	$scope.statusField=[{'value':true,'fieldName':'Active'},{'value':false,'fieldName':'In-active'}];

	// array for table data 

	$scope.tableFields=['name','category','status','date'];

	$scope.tableData={};
	$scope.formData={};
	$scope.viewObject={};
	$scope.search={}
	$scope.page=1;
	$scope.limit=2;



	// ajax request to get all categories

	dataService.callAjax({searchParam:{},limitParam:{}},'cms_category/getData',function(data){
		$scope.category=data;
	});

	// ===============================================================================
	// ======================= FUNCTIONS RELETED TO THE DATALIST page ie(viewall,get form `	============= for add and edit data ,  view data, delete data STARTS =================
	// ================================================================================





	/**************************************************************************************************FUNCTION viewAll to load Data and for Resetting the datalist table***************************************************************************************************/ 
	$scope.datalist.viewAll=function(){

		// reset the templateUrl to datalist.html
		$scope.templateUrl=temUrl+'common/datalist.html';

		// reset tableData 
		dataService.callAjax({searchParam:{},limitParam:{limit:$scope.limit,page:$scope.page}},$scope.title+'/getJoinData',function(data){
			$scope.tableData=data;
			var parameter={};
			dataService.generatePagination($scope.title,$scope.limit,parameter,function(data){
				$scope.totalPage=data;
			});
		});
	}

	$scope.datalist.viewAll();
	/***************** FUNCTION viewALl End **************************************/ 



	/**************************************************************************************************FUNCTION addNew to get the form for adding new data to the database **************************************************************************************************/ 
	$scope.datalist.addNew=function(){

		// define form role (form may be for add or edit)
		$scope.formRole='add';

		// reset the templateUrl to $title+form.html
		$scope.templateUrl=temUrl+'form/'+$scope.title+'-form.html';
	}
	/***************** FUNCTION addNew  End **************************************/ 




	/**************************************************************************************************FUNCTION editData to get the form for editing data ******************************************************************************************************************/ 
	$scope.datalist.editData=function(objectData){
		// define form role (form may be for add or edit)
		$scope.formRole='edit';

		// reset the templateUrl to $title+form.html
		$scope.templateUrl=temUrl+'form/'+$scope.title+'-form.html';
		var category=objectData.category._id;
		delete objectData.category;

		// assign the data which we have to edit to the formData so that this data will be displayed in the form by default
		$scope.formData=objectData;
		$scope.formData.category=category;
	}
	/***************** FUNCTION editData  End **************************************/ 




	/**************************************************************************************************FUNCTION viewData view the details of the perticular object***********************************************************************************************************/ 
	$scope.datalist.viewData=function(objectData){

		// reset the templateUrl to view.html
		$scope.templateUrl=temUrl+'common/view.html';

		// assign the data which we have to edit to the formData so that this data will be displayed in the form by default
		$scope.viewObject=objectData;
	}
	/***************** FUNCTION editData  End **************************************/


	/**************************************************************************************************FUNCTION deleteData to delete the perticular object form database**************************************************************************************************/ 
	$scope.datalist.deleteData=function(objectId){

		dataService.callAjax({_id:objectId},$scope.title+'/delete',function(data){
			if(data=='true'){
				alert($scope.title+" Successfully Deleted");
				$scope.datalist.viewAll();
			}else{
				alert($scope.title+" Can not be Deleted");
			}
		});
	}
	/***************** FUNCTION deleteData  End **************************************/



	/**************************************************************************************************FUNCTION generateUrl to generate url accordint to title dynamically************************************************************************************************/ 
	$scope.datalist.generateUrl=function(){

		var cat=jQuery('#brand_cat option:selected').text();
		var urls=$scope.formData.name+' '+cat;
			urls=urls.trim();
			urls=urls.replace(/[&\/\\#,+()$~%.'":*?@<>{}]/g,'-');
			urls=urls.replace(/\s{1,}/g, '-');
			urls=urls.replace(/-{2,}/g, '-');
			urls=urls.toLowerCase();
			$scope.formData.url=urls;
			console.log(urls);
	}
	/***************** FUNCTION generateUrl  End **************************************/

	/**************************************************************************************************FUNCTION searchData to search from database***********************************************************************************************************************/ 
	$scope.datalist.searchData=function(){
		event.preventDefault();
		if($scope.search.searchby!=null && $scope.search.searchkey!=null){
			searchObj={searchby:$scope.search.searchby,searchkey:$scope.search.searchkey};
			dataService.callAjax({searchParam:searchObj,limitParam:{limit:$scope.limit,page:$scope.page}},$scope.title+'/getData',function(data){
				if(data){
					$scope.tableData=data;
					$scope.search={};
				}
			});
		}		
		
	}
	/***************** FUNCTION searchData  End **************************************/

	// ==========================================================================
	// ==========================================================================
	// ==========================================================================
	/**************FUNCTIONS RELEATED TO THE FORM (add,edit etc statrs)*************/ 



	/**************************************************************************************************FUNCTION addData to add a new data toe the database***************************************************************************************************************/ 
	$scope.addData=function(){
		var formData=$scope.formData;
		dataService.callAjax(formData,$scope.title+'/insert',function(data){
			if(data=='true'){

				alert($scope.title+" Successfully Created");
				$scope.formData={};
				$scope.datalist.viewAll();
			}	
			else{
				alert('Sorry Some Error Occured');
				$scope.formData={};
				$scope.datalist.viewAll();
			}

		})
		
	};
	/***********FUNCTION addData END*****************************************************/ 



	/**************************************************************************************************FUNCTION updateData to update the data***************************************************************************************************************/ 
	$scope.updateData=function(){
		var formData=$scope.formData;

		dataService.callAjax(formData,$scope.title+'/update',function(data){
			if(data=='true'){

				alert($scope.title+" Successfully Updated");
				$scope.formData={};
				$scope.datalist.viewAll();
			}	
			else{
				alert('Sorry Some Error Occured');
				$scope.formData={};
				$scope.datalist.viewAll();
			}
		})
	};
	/***********FUNCTION addData END*****************************************/


	/**************************************************************************************************FUNCTION for pagination**************************************************************************************************/ 

	jQuery(document).on('click','#pagination span',function(){
		var index=jQuery(this).attr('page_no');
		var parameter={}
		dataService.pagination(index,$scope.page,$scope.totalPage,$scope.limit,$scope.title+'/getJoinData',parameter,function(data){
			$scope.page=data.page;
			$scope.tableData=data.data;
		});
	})




	// click on file button via button
	$(document).on('click','.add-img',function(){
		$('#brand_logo').click();
	});

	$scope.uploadFile = function(element) {   
		var data = new FormData();
		$scope.formData.image=$(element)[0].files[0].name;
		data.append('file', $(element)[0].files[0]);
		jQuery.ajax({
		  url: 'brand/upload',
		  type:'post',
		  data: data,
		  contentType: false,
		  processData: false,
		  success: function(response) {
		  	$('.brand-logo').find('img').addClass('img-responsive').attr('src','/uploads/'+$scope.formData.image)
		  	$('.add-img').addClass('hide-it').removeClass('show-it');
		  	$('.remove-img').removeClass('hide-it').addClass('show-it');
		  },
		  error: function(jqXHR, textStatus, errorMessage) {
		 	 console.log('Error uploading: ' + errorMessage);
		  }
		});   
	};


	$(document).on('click','.remove-img',function(){
		$('#brand_logo').val('');
		delete $scope.formData.image;
		$('.brand-logo').find('img').removeClass('img-responsive').attr('src','');
		
		$('.add-img').removeClass('hide-it').addClass('show-it');
		$('.remove-img').addClass('hide-it').removeClass('show-it');
	});

});

/*********	 userCOntroller ENd *****************************************/ 
