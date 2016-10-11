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

            if (email === "rijos.christopher@gmail.com") {
              console.log("EMAIL PASSWORD NIL")
            } else {
              auth.$signInAnonymously().then( function(firebaseUser) {
                  $location.path("/home")
              }).catch(function (error) {
                  LoginController.error = error;
              });
            }
        }

<<<<<<< HEAD
        LoginController.signUp = function () {
          $location.path('/sign_up')
        }

=======
>>>>>>> 57414ea53586d598b0f3b1e400601dbc211c4b79
        LoginController.clickMe = function () {
            console.log("CLICKED");
        }
    }
})();
