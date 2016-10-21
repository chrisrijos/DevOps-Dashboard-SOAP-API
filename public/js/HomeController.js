(function() {
  angular
    .module('App')
    .controller('HomeController', MainController);

    MainController.$inject = ["$scope", "$location", "$http", "$timeout"];

    function MainController($scope, $location, $http, $timeout) {
        var HomeController = this;
        HomeController.components = []

        HomeController.components = HomeController.components;

        HomeController.reload = function() {
          $http.get('/SoftwareComponents/showall').then(function (data) {
              HomeController.data = data["data"];

              HomeController.data.forEach(function (obj) {
                  HomeController.components.push(obj);
              });
          });
        };

        HomeController.testClick = function() {
            console.log("test");
            $('#componentDetail').modal('show');
        }

        HomeController.reload();
        /*SoftwareComponentService.getSoftwareComponents().then(function (d) {
            HomeController.data = d
        });*/
    };

})();
