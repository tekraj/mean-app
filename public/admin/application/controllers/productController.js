adminApp.controller('productController',function($scope,dataService){

	/****************General Purpose Variable Declaration******************************/ 
	$scope.pageTitle='Product';
	$scope.title='product';

	var temUrl="/admin/application/views/";

	$scope.templateUrl=temUrl+'common/datalist.html';

	$scope.datalist={}; //object to hold the functions releated to add,search,view,edit and delete operations 

	// array of objects for search form select  option repeatation
	$scope.selectOptions=[{'title':'name','fieldName':'Name'},{'title':'category','fieldName':'Category'},{'title':'brand','fieldName':'Brand'},{'title':'status','fieldName':'Status'},{'title':'date','fieldName':'Date'}];
	$scope.statusField=[{'value':true,'fieldName':'Active'},{'value':false,'fieldName':'In-active'}]


	// array for table data 
	$scope.tableFields=['name','category','brand','price','status','date'];

	$scope.tableData={};
	$scope.formData={};
	$scope.formData.slider={};// object to store the slider images
	$scope.viewObject={};
	$scope.search={};
	$scope.page=1;
	$scope.limit=2;

	// ajax request to get categories
	dataService.callAjax({searchParam:{},limitParam:{}},'category/getData',function(data){
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

		// assign the data which we have to edit to the formData so that this data will be displayed in the form by default
		var category=objectData.category._id;
		delete objectData.category;
		var brand=objectData.brand._id;
		delete objectData.brand;
		$scope.formData=objectData;
		$scope.formData.category=category;
		$scope.formData.brand=brand;
		// ajax request to get all brands 
		dataService.callAjax({},'brand/getData',function(data){
			$scope.brand=data;
		})
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
		var urls=$scope.formData.name;
			urls=urls.trim();
			urls=urls.replace(/[&\/\\#,+()$~%.'":*?@<>{}]/g,'-');
			urls=urls.replace(/\s{1,}/g, '-');
			urls=urls.replace(/-{2,}/g, '-');
			urls=urls.toLowerCase();
			$scope.formData.url=urls;
	}
	/***************** FUNCTION generateUrl  End **************************************/
	


	/**************************************************************************************************FUNCTION searchData to search from database***********************************************************************************************************************/ 
	$scope.datalist.searchData=function(){
		event.preventDefault();
		if($scope.search.searchby!='' && $scope.search.searchkey!=''){
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



	/**************************************************************************************************FUNCTION getBrands to get the appropriate brands according to category**********************************************************************************************/ 
	$scope.datalist.getBrands=function(){	
		
		var cat_id=$scope.formData.category;

		var sendData={category:cat_id};
		console.log(sendData);
		dataService.callAjax(sendData,'brand/getData',function(data){
			$scope.brand=data;
		});
	}
	/***************** FUNCTION getBrands  End **************************************/

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
				$scope.formData.slider={};
				$scope.datalist.viewAll();
			}	
			else{
				alert('Sorry Some Error Occured');
				$scope.formData={};
				$scope.formData.slider={};
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
				$scope.formData.slider={};
				$scope.datalist.viewAll();
			}	
			else{
				alert('Sorry Some Error Occured');
				$scope.formData={};
				$scope.formData.slider={};
				$scope.datalist.viewAll();
			}
		})
	};
	/***********FUNCTION updateData END******************************************/


	/**************************************************************************************************FUNCTION for pagination ***************************************************************************************************************/ 
	jQuery(document).on('click','#pagination span',function(){
		var index=jQuery(this).attr('page_no');
		var parameter={};
		dataService.pagination(index,$scope.page,$scope.totalPage,$scope.limit,$scope.title+'/getJoinData',parameter,function(data){
			$scope.page=data.page;
			$scope.tableData=data.data;
		});
	})



	/**************************************************************************************************FUNCTION uploadFeaturedImage to upload the featured image***************************************************************************************************************/ 
	$scope.uploadFeaturedImage=function(element){
		var file=element.files[0];
		$scope.formData.image=file.name;
		var formData=new FormData();
		formData.append(file,file);
		jQuery.ajax({
			url:'admin/product/upload',
			type:'post',
			data:formData,
			contentType:false,
			processData:false,
			success:function(response){
				if(response=='true'){
					jQuery('.add-feat-img').removeClass('show-it').addClass('hide-it');
					jQuery('.remove-feat-img').removeClass('hide-it').addClass('show-it');
					jQuery('.add-feat-img').parent().find('img').attr('src','/uploads/'+$scope.formData.image);
				};
			}
		});		

	};
	/***********FUNCTION uploadSliderImage END******************************************/

	// code releated featured image upload
	jQuery(document).on('click','.add-feat-img',function(){
		jQuery(this).parent().find('input').click();
	});

	jQuery(document).on('click','.remove-feat-img',function(){
		jQuery(this).parent().find('input').val('');
		delete $scope.formData.image;
		jQuery(this).addClass('hide-it').removeClass('show-it');
		jQuery('.add-feat-img').addClass('show-it').removeClass('hide-it');
		jQuery(this).parent().find('img').attr('src','');
	});



	/**************************************************************************************************FUNCTION uploadImage to upload the slider image***************************************************************************************************************/ 
	$scope.uploadSliderImage=function(element){
		
		var formData=new FormData();
		var file=element.files[0];
		formData.append('file',file);
		var index=parseInt($(element).parent().index())+1;
		$scope.formData.slider['img'+index]=file.name;
		jQuery.ajax({
			url:'admin/product/upload',
			type:'post',
			data:formData,
			contentType:false,
			processData:false,
			success:function(response){
				if(response=='true'){
					$(element).parent().find('.add-img').removeClass('show-it').addClass('hide-it');
					$(element).parent().find('.remove-img').removeClass('hide-it').addClass('show-it');
					$(element).parent().find('img').addClass('img-responsive').attr('src','/uploads/'+file.name);
				}
			}
		})
	};
	/***********FUNCTION uploadSliderImage END******************************************/

	// code releated slider image upload
	jQuery(document).on('click','.add-img',function(){
		jQuery(this).parent().find('input').click();
	});

	jQuery(document).on('click','.remove-img',function(){
		jQuery(this).parent().find('input').val('');
		var index=parseInt(jQuery(this).parent().index())+1;
		delete $scope.formData.slider['img'+index];
		jQuery(this).removeClass('show-it').addClass('hide-it');
		jQuery(this).parent().find('.add-img').removeClass('hide-it').addClass('show-it');
		jQuery(this).parent().find('img').attr('src','').removeClass('img-responsive');
	});
	

});


/*********	 userCOntroller ENd *****************************************/ 