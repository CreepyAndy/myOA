
app.controller('accessCardController', function ($scope, $http) {
    $scope.init = function () {
        show_dialog_loading();
        $scope.EmployeeCard_NO='';
        $scope.ChamTime_NO='';
        $http.post('accessCard' , $scope.name).success(function (data) {

            $scope.accessCard = data;
            hide_dialog_loading();
            // $scope.EmployeeCard_NO = data.pwcCard_NO;
            // $scope.ChamTime_NO = data.chanTimeCard_NO;
        }).error(function () {
            change_dialog_error("error");
            show_dialog_error();
        })
    }
    
    $scope.lost = function (data) {
        show_dialog_loading();
        var url = "accessCard/guid/"+$scope.name+"/card/"+data;
        $http.put(url).success(function (data) {
            change_dialog_error("Your request has been submitted");
            show_dialog_error();
            $scope.init();
            hide_dialog_loading();
        }).error(function () {
            $scope.init();
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        })
    }
})