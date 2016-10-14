(function () {

    angular
        .module('App')
        .controller("SignupController", Controller);

    Controller.$inject = ["$scope", "$firebaseAuth", "$location"];

    function Controller($scope, $firebaseAuth, $location) {
        var SignupController = this;
        var email = "";
        var password = "";
        var password2 = "";
        var auth = $firebaseAuth();

        SignupController.signUp = SignupController.signUp;


        SignupController.signUp = function () {

            auth.$createUserWithEmailAndPassword(SignupController.email, SignupController.password).then( function() {
                  $location.path("/home")
              }).catch(function(error) {
                console.log(error);
            });

        }

        SignupController.valid = function () {

            var valid = false;

            if(SignupController.password === SignupController.password2) {
              SignupController.valid = true;
            }
            else {
              SignupController.valid = false;
            }

        }

    }
})();
