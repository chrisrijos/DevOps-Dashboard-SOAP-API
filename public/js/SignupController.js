(function () {

    angular
        .module('App')
        .controller("SignupController", Controller);

    Controller.$inject = ["$scope", "$firebaseAuth", "$location"];

    function Controller($scope, $firebaseAuth, $location) {
        var SignupController = this;
        var email = "";
        var password = "";
        var auth = $firebaseAuth();

        SignupController.signUp = SignupController.signUp;


        SignupController.signUp = function () {

            auth.$createUserWithEmailAndPassword(SignupController.email, SignupController.password).catch(function(error) {
                console.log(error);
            });
        }

        SignupController.clickMe = function () {
            console.log("CLICKED");
        }
    }
})();
