app.controller('accessManagementController' ,function ($scope ,$http) {
    $scope.statusMap = [
        {
            id:1,
            name: "Remaking"
        },{
            id:2,
            name:"Finished"
        }
    ];

    $scope.newCardNO = null;

    $scope.currentPage = 1;
    $scope.pageSize = 10;

    $scope.init = function () {
        show_dialog_loading();
        $http.post('accessCardRecord/all').success(function (data) {
            $scope.record = data;
            hide_dialog_loading();
            // $scope.EmployeeCard_NO = data.pwcCard_NO;
            // $scope.ChamTime_NO = data.chanTimeCard_NO;
        }).error(function () {
            change_dialog_error("error");
            show_dialog_error();
        })
    }

    $scope.showStatusName = function (id) {
        var name;
        $scope.statusMap.forEach(function (item) {
            if(item.id == id)
                name = item.name;
        })
        return name;
    }

    $scope.getInfo = function (info) {
        $scope.modalInfo = info;
    }
    
    $scope.update = function (modal) {
        show_dialog_loading();
        modal.newCardNO = $scope.newCardNO;
        $http.post("accessCardRecord/update",modal).success(function () {
            $scope.init();
            change_dialog_error("success");
            show_dialog_error();
            hide_dialog_loading();
        }).error(function () {
            change_dialog_error("error");
            show_dialog_error();
            hide_dialog_loading();
        })
        $('#InfoModal').modal('hide');
    }
})
