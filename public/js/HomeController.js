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
        HomeController.change = "";

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


           HomeController.column = '';
           HomeController.reverse = false;

           HomeController.resetColumn = function(col) {
             HomeController.column = col;
                 if(HomeController.column == col) {
                   HomeController.column = "";
                 }
           };

           HomeController.sortColumn = function(col){

             HomeController.column = col;

                if(HomeController.reverse){
                  HomeController.reverse = false;
                  HomeController.reverseclass = 'arrow-up';
                }
                else {
                  HomeController.reverse = true;
                  HomeController.reverseclass = 'arrow-down';
                }
            };

           HomeController.sortClass = function(col){
             if(HomeController.column == col ){
                if(HomeController.reverse){
                    return 'arrow-down';
                  }
                  else{
                    return 'arrow-up';
                  }
                }
                  else{
                    return '';
                  }
              }


        HomeController.navigateToDashboard = function() {
            $location.path('/admindashboard');
        }
    };

})();
