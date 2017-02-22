app.controller('lockerAppHistoryController', function ($scope, $http) {
    $scope.select = {
        startDate: null,
        endDate: null
    }
    $scope.applyTypeMap = [
        {
            id: 1,
            name: "Apply"
        }, {
            id: 2,
            name: "Change Password"
        }, {
            id: 3,
            name: "Renew"
        }, {
            id: 4,
            name: "Return"
        }
    ]

    $scope.statusMap = [
        {
            id: 1,
            name: "Pending By Coach"
        }, {
            id: 2,
            name: "Rejected"
        }, {
            id: 3,
            name: "Approved"
        }, {
            id: 4,
            name: "Completed"
        }, {
            id: 5,
            name: "Expired"
        }
    ]
    $scope.init = function () {
        show_dialog_loading();
        var url = window.location.pathname;
        var userName = url.substring(7);
        console.log(userName);
        $http.get('locker/'+userName+'/list')
            .success(function (redata) {
                hide_dialog_loading();
                $scope.lockerAndCabinetApplications = redata;
            }).error(function () {
            hide_dialog_loading();
            change_dialog_error("system error!");
            show_dialog_error();
        });
    }
    //get all available status(haven't implemented in server)
    $scope.getstatus = function () {
        $scope.leaveType = null;
        $http.get('/newoa/locker/status').success(function (result) {
            $scope.status = result;
            hide_dialog_loading();
        }).error(function () {
            change_dialog_error('Errors in getting leave types.');
            show_dialog_error();
            hide_dialog_loading();
        });
    }

    $scope.typeShow = function (type) {
        var typeName;
        $scope.applyTypeMap.forEach(function (item) {
            if (item.id == type) {
                typeName = item.name;
            }
        });
        return typeName;
    }

    $scope.statusShow = function (status) {
        var statusName;
        $scope.statusMap.forEach(function (item) {
            if (item.id == status) {
                statusName = item.name;
            }
        });
        return statusName;
    }

    $scope.searchByDate = function (employee) {
        //var applyDate = new Date(employee.appTime.replace(/-/g, "/"));
        var lockerstartDate = new Date(employee.startDate);
        var lockerEndDate = new Date(employee.returnDate);

        if ($scope.select.startDate != null && $scope.select.endDate != null &&
            (lockerstartDate <= $scope.select.endDate && lockerEndDate >= $scope.select.startDate)) {
            return true;
        }
        else if ($scope.select.startDate == null && $scope.select.endDate != null && lockerstartDate <= $scope.select.endDate) {
            return true;
        } else if ($scope.select.startDate != null && $scope.select.endDate == null && lockerEndDate >= $scope.select.startDate) {
            return true;
        } else if ($scope.select.startDate == null && $scope.select.endDate == null) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.startDate = {
        opened: false
    }

    $scope.endDate = {
        opened: false
    }

    $scope.openStartDate = function () {
        $scope.startDate.opened = true;
    }

    $scope.openEndDate = function () {
        $scope.endDate.opened = true;
    }

    $scope.greaterThan = function (prop, val) {
        return function (item) {
            return item[prop] > val;
        }
    }
});






