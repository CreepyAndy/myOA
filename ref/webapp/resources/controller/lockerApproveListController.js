app.controller('lockerApproveListController', function ($scope, $http, $filter) {
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
            name: "Pending"
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
    $scope.approveListInit = function () {
        show_dialog_loading();
        $http.post('locker/approveList', $scope.name)
            .success(function (list) {
                hide_dialog_loading();
                $scope.approveList = list;
            })
            .error(function () {
                hide_dialog_loading();
                change_dialog_error("error");
                show_dialog_error();
            })
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

    $scope.selected = [];

    var updateSelected = function (action, item) {
        if (action == 'add' && $scope.selected.indexOf(item) == -1) {
            $scope.selected.push(item);
            //$scope.selectedTags.push(name);
        }
        if (action == 'remove' && $scope.selected.indexOf(item) != -1) {
            var idx = $scope.selected.indexOf(item);
            $scope.selected.splice(idx, 1);
        }
    }

    $scope.updateSelection = function ($event, item) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, item, checkbox.name);
    }

    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    }

    $scope.approve = function (list) {
        show_dialog_loading();
        $http.post('locker/approve', $scope.selected)
            .success(function (data) {
                if(data == "uncompleted"){
                    change_dialog_error("error");
                    show_dialog_error();
                }
                hide_dialog_loading();
                $scope.approveListInit();
            }).error(function (data) {
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        })
        $scope.selected = [];
    }
    $scope.reject = function (list) {
        show_dialog_loading();
        $scope.selected.forEach(function (application) {
            application.comments = $scope.comments;
        });
        $http.post('locker/reject', $scope.selected)
            .success(function (data) {
                hide_dialog_loading();
                $('#RejectComments').modal('hide');
                $scope.approveListInit();
            }).error(function (data) {
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        })
    }
    $scope.check = function () {
        if ($scope.selected.length == 0) return false;
        $scope.selected.forEach(function (application) {
            if (application.status != 3) {
                return true;
            }
        });
        return false;
    }

    // $scope.mark = function (list) {
    //     show_dialog_loading();
    //     $http.post('locker/mark', $scope.selected)
    //         .success(function (data) {
    //             hide_dialog_loading();
    //             $scope.approveListInit();
    //         }).error(function (data) {
    //         hide_dialog_loading();
    //         change_dialog_error("error");
    //         show_dialog_error();
    //     })
    // }
})