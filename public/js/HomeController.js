(function() {
  angular
    .module('App')
    .controller('HomeController', MainController);

    MainController.$inject = ["$scope", "$location", "$http", "$timeout"];

    function MainController($scope, $location, $http, $timeout) {
        var HomeController = this;
        HomeController.components = [];

        HomeController.unitTest = false;
        HomeController.build = false;
        HomeController.QA = false;
        HomeController.packaging = false;

        HomeController.components = HomeController.components;
        HomeController.activateFilter = activateFilter;

        HomeController.reload = function() {
          $http.get('/SoftwareComponents/showall').then(function (data) {
              HomeController.data = data["data"];

              HomeController.data.forEach(function (obj) {
                  HomeController.components.push(obj);
              });
          });
        };

        HomeController.reload();

        HomeController.testClick = function() {
            $('#componentDetail').modal('show');
        }

        function activateFilter(filterByStr) {
            switch(filterByStr) {
                case "UnitTest":
                    HomeController.unitTest = !HomeController.unitTest;
                    break;
                case "Build":
                    HomeController.build = !HomeController.build;
                    break
                case "QA":
                    HomeController.QA = !HomeController.QA;
                    break
                case "Packaging":
                    HomeController.packaging = !HomeController.packaging;
                    break
                default:
                    break
            }
        }

        HomeController.navigateToDashboard = function() {
            $location.path('/admindashboard');
        }
    };

})();
