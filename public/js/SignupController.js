(function () {

    angular
        .module('App')
        .controller("SignupController", Controller);

    Controller.$inject = ["$scope", "$firebaseAuth", "$location"];

    function Controller($scope, $firebaseAuth, $location) {
        var SignupController = this;
        var username = "";
        var password = "";
        var auth = $firebaseAuth();

        SignupController.clickMe = SignupController.clickMe;
        SignupController.signIn = SignupController.signIn;


        SignupController.signIn = function () {
            SignupController.firebaseUser = null;
            SignupController.error = null;

            auth.$signInAnonymously().then( function(firebaseUser) {

            }).catch(function (error) {
                SignupController.error = error;
            });
        }

        SignupController.clickMe = function () {
            console.log("CLICKED");
        }
    }
})();
