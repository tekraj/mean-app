// ajax service

adminApp.service('dataService',function($http){

	this.callAjax=function(data,url,callback){
		$http({
			method:'post',
			url:'admin/'+url,
			data:data,
			headers:{'Content-Type':'application/json'}
		}).success(function(datas,status,header,config){
			
			return callback(datas);
		})
	};

	this.generatePagination=function(title,limit,parameter,callback){

		this.callAjax({searchParam:parameter,limitParam:{}},title+'/getData',function(data){
			if(data!='false'){

				var totalRows=data.length;
				var totalPage=totalRows/limit;
				intPage=Math.round(totalPage);
				
				if(intPage < totalPage ){
					totalPage=intPage+1;
				}

				var pagination='<span class="prev disable" page_no="prev">&laquo;</span>';
				for(var i=0;i<totalPage;i++){
					pagination+='<span page_no="'+(i+1)+'">'+(i+1)+'</span>';
				}
				pagination+='<span class="next" page_no="next">&raquo;</span>';

				jQuery('#pagination').html(pagination);
				
				jQuery('#pagination').find('span:eq(1)').addClass('active');

				return callback(totalPage);
				// jQuery('#pagination').find('span').click(function(){
				// 	var index=jQuery(this).attr('page_no');

				// 	$scope.pagination(index);
				// })



			}
		})

	}

	this.pagination=function(index,page,totalPage,limit,url,parameter,callback){

		if(index=='prev'){
			if(! jQuery('#pagination').find('.prev').hasClass('disable') )
				page=parseInt(page)-1;
		}else if(index=='next'){
			if(! jQuery('#pagination').find('.next').hasClass('disable') )
				page=parseInt(page)+1;
		}else{
			page=index;			
		};
		jQuery('#pagination').find('span').removeClass('disable');
		if(page<=1){
			jQuery('#pagination').find('.prev').addClass('disable');
		}
		if(page>totalPage){
			jQuery('#pagination').find('.next').addClass('disable');
		}

		if(page > 0 && page < (totalPage+1)){

			this.callAjax({searchParam:parameter,limitParam:{limit:limit,page:page}},url,function(data){
				jQuery('#pagination span').removeClass('active');
				jQuery('#pagination').find('span:eq('+page+')').addClass('active');
				
				return callback({page:page,data:data});
			});

		}
	};

});