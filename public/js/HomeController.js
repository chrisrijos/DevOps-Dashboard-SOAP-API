(function() {
  angular
    .module('App')
    .controller('HomeController', ["$scope", "$location", "MessageService"

    function($scope, $location, MessageService) {
        var HomeController = this;

        MessageService.getMessages().then(function (d) {
            HomeController.data = d
        });
    }]);

})();
