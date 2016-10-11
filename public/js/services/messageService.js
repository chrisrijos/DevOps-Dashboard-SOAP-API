(function () {
  angular
    .module('App')
    .service('MessageService', Service);

    Service.$inject = ["$http"];

    function Service($http) {
        return {
            getMessages: (function (res) {
                return $http.get('/messages/show')
                .then(function (res) {
                    console.log("Coming from service")
                    //return responses data ie. return res.data
                });
            })()
        };
        return getMessages;
    }
})();
