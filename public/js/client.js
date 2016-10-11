(function() {
  angular
    .module('App', ["ui.router", "firebase"])
    .config( function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('login'); //default state

      //Sectional Routes
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'partials/home.html',
          controller: 'HomeController'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login.html',
          controller: 'LoginController'
        })
        .state('sign_up', {
          url: '/sign_up',
          templateUrl: 'sign_up.html'
        })
<<<<<<< HEAD
=======
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login.html',
          controller: 'LoginController'
        })
>>>>>>> 57414ea53586d598b0f3b1e400601dbc211c4b79
    });
})();
