(function() {
  angular
    .module('App')
    .controller('AdminDashboard', MainController);

    MainController.$inject = ["$scope", "$location", "$http", "$timeout", "$firebaseAuth"];

    function MainController($scope, $location, $http, $timeout) {
        var AdminDashboard = this;

        AdminDashboard.userList = [];
        AdminDashboard.credentials = {email: "", password: ""};
        var tmp = {password: ""};

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        AdminDashboard.navigateToOverview = function() {
            $location.path('/home');
        }

        AdminDashboard.showNewUserModal = function() {
            $('#componentDetail').modal('show');
        };

        AdminDashboard.createUser = function() {
            AdminDashboard.saveUser(AdminDashboard.credentials);
            console.log("Saving: ", AdminDashboard.credentials);
            $('#componentDetail').modal('hide');
            location.reload();
        };

        AdminDashboard.saveUser = function(parameter) {
            $http.post('/User/new', parameter)
            .success(function (data, status, headers, config) {
                console.log(data);
            })
            .error(function (data, status, header, config) {

            });
        };

        AdminDashboard.deleteUser = function(parameter) {
            $http.post('/User/delete', parameter)
            .success(function (data, status, headers, config) {
                console.log(data)
            })
            .error(function (data, status, header, config) {
            });
            location.reload();
        }

        AdminDashboard.confirmDeleteUser = function(user) {
            AdminDashboard.userToDelete = user;
            $('#delete').modal('show');
        }

        AdminDashboard.getUsers = function() {
            $http.get('/User/showall').then(function (data) {
                AdminDashboard.data = data.data;

                AdminDashboard.data.forEach(function (user) {
                    AdminDashboard.userList.push(user);
                });
            });
        }

        AdminDashboard.ensureIntegrity = function(newUser) {
            if (AdminDashboard.userList.length > 0) {
                AdminDashboard.userList.forEach(function (user) {
                    if (newUser.email.toLowerCase() == user.email.toLowerCase()) {
                        alert("Email address already exists");
                        return false;
                    } else {
                        return true;
                    }
                });
            } else {
                console.log("User List Contains no users");
            }
        }

        AdminDashboard.getUsers();
    };

})();
