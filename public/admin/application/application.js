var adminApp=angular.module('adminApp',['ngRoute','ngAnimate']);


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
		
	}).when('/order',{
		templateUrl:'/admin/application/views/template.html',
		controller:'orderController',
		
	}).when('/sold',{
		templateUrl:'/admin/application/views/template.html',
		controller:'soldController',
		
	}).when('/cms-category',{
		templateUrl:'/admin/application/views/template.html',
		controller:'cmsCategoryController',
		
	}).when('/cms-post',{
		templateUrl:'/admin/application/views/template.html',
		controller:'cmsPostController',
		
	}).otherwise({
		redirectTo:'/'
	});
});




// custom directive for ckeditor

adminApp.directive('ckEditor', function() {
  return {
    require: '?ngModel',
    link: function(scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);

      if (!ngModel) return;

      ck.on('pasteState', function() {
        scope.$apply(function() {
          ngModel.$setViewValue(ck.getData());
        });
      });

      ngModel.$render = function(value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
});