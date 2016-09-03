(function() {
  angular
    .module('App', ["ui.router"])
    .config( function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/home'); //default state

      //Sectional Routes
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'partials/home.html'
        })
        .state('lineup', {
          url: '/lineup',
          templateUrl: 'partials/lineup.html'
          //controller: 'LineupCtrl'
        });
    });
})();
