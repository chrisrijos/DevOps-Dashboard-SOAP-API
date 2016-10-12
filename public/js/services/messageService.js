(function () {
  angular
    .module('App')
    .service('MessageService', Service);

    function Service($http) {
        return {
            getMessages: function () {
              return $http.get('/messages/show');
            }
        };
        return { getMessages }
    }

    Service.$inject = ["$http"];
    
})();
