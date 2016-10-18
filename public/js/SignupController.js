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

            if(SignupController.password === SignupController.password2) {
            auth.$createUserWithEmailAndPassword(SignupController.email, SignupController.password).then( function() {
                  $location.path("/home")
              }).catch(function(error) {
                console.log(error);
            });
          }
          else if(SignupController.password !== SignupController.password2) {
            alert("Your passwords do not match. Please retry your passwords.");
          }
        }

    }
})();
