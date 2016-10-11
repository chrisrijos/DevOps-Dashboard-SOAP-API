(function() {
  angular
    .module('App')
    .controller('HomeController', MainController);

    MainController.$inject = ["$scope", "$location"]

    function MainController($scope, $location) {
        var HomeController = this;
        
    };
})();
