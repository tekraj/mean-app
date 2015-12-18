var frontApp=angular.module('frontApp',['ui.router']);
frontApp.config(function($urlRouterProvider,$stateProvider){

		$urlRouterProvider.otherwise('/');

		$stateProvider

		.state('/home',{
			url:'/',
			templateUrl:'/frontend/application/views/home.html',
			controller:'homeController'
		}).state('/category',{
			url:'/category/:category/:brand/:catId/:brandId',
			templateUrl:'/frontend/application/views/category.html',
			controller:'categoryController'
		}).state('/product',{
			url:'/product/:name',
			templateUrl:'/frontend/application/views/product.html',
			controller:'productController'
		}).state('/login',{
			url:'/login',
			templateUrl:'/frontend/application/views/login.html',
			controller:'loginController'
		}).state('/signup',{
			url:'/signup',
			templateUrl:'/frontend/application/views/signup.html',
			controller:'signupController'
		}).state('/cart',{
			url:'/cart',
			templateUrl:'/frontend/application/views/cart.html',
			controller:'cartController'
		}).state('/order',{
			url:'/order',
			templateUrl:'/frontend/application/views/order.html',
			controller:'orderController'
		});
	
});

frontApp.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

