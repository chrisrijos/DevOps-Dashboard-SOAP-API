(function() {
  angular
    .module('App', ["ui.router", "firebase"])
    .config( function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('login'); //default state

      //Sectional Routes
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'partials/home.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login.html',
          controller: 'LoginController'
        })
    });
})();
