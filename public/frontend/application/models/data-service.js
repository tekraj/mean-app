frontApp.service('dataService',function($http){
	this.callAjax=function(inputData,url,callback){
		$http({
			method:'post',
			url:url,
			data:inputData,
			headers:{'Content-Type':'application/json'}
		}).success(function(data,status,header,config){
			return callback(data);
		});
	}
})