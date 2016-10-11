(function () {
  angular
    .module('App')
    .service('MessageService', Service);

    Service.$inject = ["$scope", "$http"];

    function Service($scope, $http) {
      
    }
})();
