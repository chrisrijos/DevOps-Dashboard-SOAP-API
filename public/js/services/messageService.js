(function () {
  angular
    .module('App')
    .service('MessageService', Service);

    Service.$inject = ["$http"];

    function Service($http) {
        return {
            getMessages: function () {
              return $http.get('https://afternoon-island-94311.herokuapp.com/messages/show');
            }
        };
    }

})();
