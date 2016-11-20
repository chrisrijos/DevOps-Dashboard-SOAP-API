(function () {

    angular
        .module('App')
        .controller("LoginController", Controller);

    Controller.$inject = ["$scope", "$http","$firebaseAuth", "firebase", "$location", "$rootScope"];

    function Controller($scope, $http, $firebaseAuth, firebase, $location, $rootScope) {
        var LoginController = this;
        LoginController.userList = [];
        LoginController.loginForm = {email: "", password: ""};

        var auth = $firebaseAuth();

        LoginController.clickMe = LoginController.clickMe;
        LoginController.signIn = LoginController.signIn;

        LoginController.signUp = function () {
          $location.path('/home');
        }

        LoginController.getUsers = function() {
            $http.get('/User/showall').then(function (data) {
                LoginController.data = data.data;

                LoginController.data.forEach(function (user) {
                    LoginController.userList.push(user);
                });
            });
        }

        LoginController.getUsers();

        LoginController.hardAuth = function() {
            for(var i = 0; i < LoginController.userList.length; i++) {
                if (LoginController.userList[i].email.toLowerCase() == LoginController.loginForm.email.toLowerCase()
                    && LoginController.userList[i].password.toLowerCase() == LoginController.loginForm.password.toLowerCase()) {
                    console.log("Match Found");
                    $rootScope.currentUser = LoginController.userList[i];
                    console.log($rootScope.currentUser);
                    $location.path('/home');
                    return true;
                }
            }
            alert("Credentials provided do not match");
        }
    }
})();
