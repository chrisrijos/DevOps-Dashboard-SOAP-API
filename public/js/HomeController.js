(function() {
  angular
    .module('App')
    .controller('HomeController', MainController);

    MainController.$inject = ["$scope", "$location", "$http", "$timeout"];

    function MainController($scope, $location, $http, $timeout) {
        var HomeController = this;

        HomeController.generateRandomLog = HomeController.generateRandomLog;

        HomeController.reload = function() {
          $http.get('/messages/show').then(function (data) {
              HomeController.data = data["data"]
          });
          $timeout(function() {
              HomeController.reload();
          }, 3000);
        };
        HomeController.reload();

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
