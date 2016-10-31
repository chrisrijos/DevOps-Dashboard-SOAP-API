(function() {
  angular
    .module('App')
    .controller('AdminDashboard', MainController);

    MainController.$inject = ["$scope", "$location", "$http", "$timeout"];

    function MainController($scope, $location, $http, $timeout) {
        var AdminDashboard = this;


        AdminDashboard.navigateToOverview = function() {
            $location.path('/home');
        }

        AdminDashboard.userButton = function() {
            $('#componentDetail').modal('show');
        };



    };

})();
