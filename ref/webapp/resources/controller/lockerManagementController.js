app.controller('lockerManagementController', function ($scope, $http) {
    /**
     * initial function
     */
    $scope.init = function () {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $('#myModal').modal("hide");
        $('#ConfirmModal').modal("hide");
        $scope.locker_Info = {};
        //$scope.statusFilter = '';
        //$scope.conf = {};
        //$scope.conf.roles=[];
        $scope.lockerStatus = [
            {
                name: 'Broken',
                id: '2'
            },
            {
                name: 'Available',
                id: '0'
            },
            {
                name: 'Occupied',
                id: '1'
            },
        ];
        $scope.lockerStatusList = [
            {label: "Available", value: 0},
            {label: "Occupied", value: 1},
            {label: "Broken", value: 2},
        ];

        $scope.BuildingFloorList = [
            {label: "A7", value: 0},
            {label: "A11", value: 1},
            {label: "B3", value: 2},
            {label: "B5", value: 3},
            {label: "B6", value: 4},
            {label: "B7", value: 5},
        ];
        //query
        show_dialog_loading();
        $http.post('/newoa/locker/lockerManagement').success(function (data) {
            $scope.lockerlist = data;
            hide_dialog_loading();
            //console.log(data);
        });
    }

    $scope.lockerStatusShow = function (code) {
        var lockerStatusName;
        $scope.lockerStatus.forEach(function (lockerStatusCode) {
            if (lockerStatusCode.id == code) {
                lockerStatusName = lockerStatusCode.name;
            }
        });
        return lockerStatusName;
    }

    $scope.clearlockerStatus = function () {
        if ($scope.lockerstatusfind.id == 2) {
            $scope.lockerstatusfind = null;
        }
    }

    $scope.showAddDialog = function () {
        $scope.operation = "save";
        $scope.remindMessage = "";
        $scope.containRole = false;
        $scope.locker_Info = {};
        $scope.locker_Info.fields = [
            {name: "", label: "", type: "int"}
        ];
        $('#myModal').modal("show");
    };
    $scope.add = function () {
        $scope.locker_Info.fields.push({
            name: "",
            label: "",
            type: "int"
        });
    };
    $scope.submit = function () {
        show_dialog_loading();
        //console.log($scope.locker_Info);
        $http.post('/newoa/locker/addLocker', $scope.locker_Info)
            .success(function (result) {
                $('#myModal').modal("hide");
                hide_dialog_loading();
                $scope.init();
            }).error(function () {
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        })

    };

    $scope.selectAll = function () {
        for (var i = 0; i < $scope.lockerlist.length; i++) {
            $scope.lockerlist[i].check = $scope.lockerinfo.allcheck == true ? true : false;
        }
    }
    $scope.edit = function (data) {
        if (data.isEdit == true) {
            if (data.status != data.editStatus) {
                data.status = data.editStatus;
                $http.post('/newoa/locker/updateLocker', data).success(function (redata) {
                    $scope.init();
                });
            }

        } else {
            data.editStatus = data.status;
        }
        data.isEdit = !data.isEdit;
        //console.log($scope.lockerlist);
    }

    $scope.deleteData = function (lockerdeletedata) {
        $http.post('/newoa/locker/deleteLocker', lockerdeletedata).success(
            function (redata) {
                $scope.init();
            });
    }

    $scope.saveData = function () {
        for (var i = 0; i < $scope.lockerlist.length; i++) {
            if ($scope.lockerlist[i].isEdit == true) {
                $scope.lockerlist[i].isEdit = false;
//				$scope.lockerlist[i].status=$scope.lockerinfo.lockerupdatestatus;
                //console.log($scope.lockerlist[i].status);
            }
        }
        //console.log($scope.lockerlist);
        $http.post('/newoa/locker/updateLocker',
            $scope.lockerlist)
            .success(function (redata) {
                $scope.init();
            });
    }
    $scope.savedeletelockerId = function (iddata) {
        $scope.lockeriddata = iddata;
    }
});






