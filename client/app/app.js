angular.module('zillowApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home',{
      url:'/',
      templateUrl:'app/views/home.html'
      //,controller:
    })
    .state('search',{
      url:'/search',
      templateUrl:'app/views/search.html',
      controller:'searchController as vm'
    })
    .state('compare',{
      url:'/compare',
      templateUrl:'app/views/compare.html',
      controller:'compareController as vm'
    })

})