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