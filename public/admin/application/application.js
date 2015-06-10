var adminApp=angular.module('adminApp',['ngRoute']);


adminApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'/admin/application/views/template.html',
		controller:'homeController'
		
	}).when('/user',{
		templateUrl:'/admin/application/views/template.html',
		controller:'userController',
		
	}).when('/memeber',{
		templateUrl:'/admin/application/views/template.html',
		controller:'memberController',
		
	}).when('/category',{
		templateUrl:'/admin/application/views/template.html',
		controller:'categoryController',
		
	}).when('/brand',{
		templateUrl:'/admin/application/views/template.html',
		controller:'brandController',
		
	}).when('/product',{
		templateUrl:'/admin/application/views/template.html',
		controller:'productController',
		
	}).otherwise({
		redirectTo:'/'
	});
});


// ajax service

adminApp.service('ajaxService',function($http){

	this.callAjax=function(data,url,callback){
		$http({
			method:'post',
			url:url,
			data:data,
			headers:{'Content-Type':'application/json'}
		}).success(function(datas,status,header,config){
			
			return callback(datas);
		})
	}
})