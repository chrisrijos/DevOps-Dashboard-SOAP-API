(function() {
  angular
    .module('App')
    .controller('HomeController', MainController);

    MainController.$inject = ["$scope", "$location", "$http"];

    function MainController($scope, $location, $http) {
        var HomeController = this;

        $http.get('/messages/show').then(function (data) {
            HomeController.data = data
        });
        /*MessageService.getMessages().then(function (d) {
            HomeController.data = d
        });*/
    };

})();
