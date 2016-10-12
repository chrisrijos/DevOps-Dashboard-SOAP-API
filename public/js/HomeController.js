(function() {
  angular
    .module('App')
    .controller('HomeController', MainController);

    MainController.$inject = ["$scope", "$location", "$http"];

    function MainController($scope, $location, $http) {
        var HomeController = this;

        HomeController.generateRandomLog = HomeController.generateRandomLog;

        $http.get('/messages/show').then(function (data) {
            HomeController.data = data
        });

        HomeController.generateRandomLog = function() {
            $http.get('/teststorage').then(function (data) {
                console.log("New message should be generated");
            });
        }
        /*MessageService.getMessages().then(function (d) {
            HomeController.data = d
        });*/
    };

})();
