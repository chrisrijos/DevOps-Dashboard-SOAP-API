(function () {

    angular
        .module('App')
        .controller("LoginController", Controller);

    Controller.$inject = ["$scope", "$firebaseAuth", "firebase", "$location"];

    function Controller($scope, $firebaseAuth, firebase, $location) {
        var LoginController = this;

        var auth = $firebaseAuth();
        var email = "";
        var password = "";

        LoginController.clickMe = LoginController.clickMe;
        LoginController.signIn = LoginController.signIn;
        LoginController.email = LoginController.email;
        LoginController.password = LoginController.password;

        LoginController.signIn = function () {
            LoginController.firebaseUser = null;
            LoginController.error = null;

            auth.$signInAnonymously().then( function(firebaseUser) {
                  $location.path("/home")
              }).catch(function (error) {
                  LoginController.error = error;
              });
        }

        LoginController.signUp = function () {
          $location.path('/sign_up');
        }

        LoginController.clickMe = function () {
            console.log("CLICKED");
        }

        LoginController.reDirect = function() {
            $location.path("/sign_up");
        }
    }
})();
