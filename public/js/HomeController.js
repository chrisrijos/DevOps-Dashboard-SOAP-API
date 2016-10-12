(function() {
  angular
    .module('App')
    .controller('HomeController', MainController);

    function MainController($scope, $location, MessageService) {
        var HomeController = this;

        MessageService.getMessages().then(function (d) {
            HomeController.data = d
        });
    };

    MainController.$inject = ["$scope", "$location", "MessageService"];
})();
