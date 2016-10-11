(function() {
  angular
    .module('App')
    .controller('NavCtrl', Controller);

    Controller.$inject =
    [
      "$scope",
      "$location"
    ];

    function Controller($scope, $location){

      $scope.isActive = function(viewLocation){
        return viewLocation === $location.path();
      };
    }
})();
