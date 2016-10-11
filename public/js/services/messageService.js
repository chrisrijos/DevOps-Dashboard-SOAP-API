(function () {
  angular
    .module('App')
    .service('MessageService', Service);

    Service.$inject = ["$scope", "$http"];

    function Service($scope, $http) {
        function getMessages() {
          $http({
            method: 'GET',
            url: '/messages/show'
          }).then(function onSuccess(response) {
              console.log(response)
          }, function onError(response) {
              console.log(response)
          })
        }
    }
})();
