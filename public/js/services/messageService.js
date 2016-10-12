(function () {
  angular
    .module('App')
    .service('MessageService', Service);

    Service.$inject = ["$http"];

    function Service($http) {
        return {
            getMessages: function () {
              return $http.get('/messages/show');
            }
        };
    }

})();
