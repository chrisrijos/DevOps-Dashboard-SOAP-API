(function () {
  angular
    .module('App')
    .service('MessageService', Service);

    function Service($http, $q) {
        return {
            getMessages: function () {
              return $http.get('/messages/show');
            }
        };
        return { getMessages }
    }

    Service.$inject = ["$http", "$q"];
})();
