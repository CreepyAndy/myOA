app.controller('lockerApplicationController', ['$scope', '$http',function ($scope,$http) {
    $scope.init = function () {
        show_dialog_loading();
        $scope.files = '';
        $scope.hasLocker = false;
        $scope.lockerType = "";
        $scope.availableMap;
        $scope.selectedLocker = {};
        $scope.lockerApplication = {};
        $scope.selectedLocker = null;
        //$scope.lockerApplication.startDate = null;
        $scope.applyType = null;
        $scope.lockerAndCabinet = {};
        $http.get('locker')
            .success(function (redata) {
                $scope.personalInformation = redata;
            }).error(function () {
            $scope.errorMessage = "system error!"
        });
        $http.post('locker/init', $scope.name)
            .success(function (redata) {
                var msg = redata.msg;
                if (msg == "completed") {
                    $scope.lockerList = redata.lockerList;
                    hide_dialog_loading();
                } else if (msg == "owned") {
                    $scope.hasLocker = true;
                    $scope.lockerAndCabinet = redata.lockerList;
                    $scope.lockerType = redata.lockerType;
                    hide_dialog_loading();
                }else{
                    hide_dialog_loading();
                    change_dialog_error("error");
                    show_dialog_error();
                }
            }).error(function () {
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        });
    }
    $scope.applyTypeMap = [
        {
            id: 1,
            name: "Apply(申请)"
        }, {
        	id: 2,
            name: "Forget Password(忘记密码)"            	
        }, {
            id: 3,
            name: "Renew(续借)"
        }, {
            id: 4,
            name: "Return(返还)"
        }, {
        	id: 5,
        	name: "Lost Cabinet Key(遗失钥匙)"
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

    $scope.statusShow = function (status) {
        var statusName;
        $scope.statusMap.forEach(function (item) {
            if (item.id == status) {
                statusName = item.name;
            }
        });
        return statusName;
    }
    
    $scope.DisabledChecker = function (item) {
        if (item.id == 1 && $scope.hasLocker == true)
            return true;
        else if (item.id == 5 && $scope.hasLocker == false)
            return true;
        else if (item.name == "Forget Password(忘记密码)" && $scope.hasLocker == true && $scope.lockerType == "Staff Cabinet")
            return true;
        else if (item.name == "Lost Cabinet Key(遗失钥匙)" && $scope.hasLocker == true && $scope.lockerType == "locker")
            return true;
        else if ($scope.hasLocker == false && (item.id == 2 || item.id == 3 || item.id == 4))
            return true;
        
        return false;
    }

    $scope.resetTime = function(){
    	$scope.lockerApplication.startDate = null;
        $scope.lockerApplication.returnDate = null;
    }
    $scope.reset = function () {
        $scope.state1 = null;
        $scope.state2 = null;
        $scope.state3 = null;
        $scope.state4 = null;
        $scope.selectedLocker = null;
        $scope.lockerApplication.startDate = null;
        $scope.lockerApplication.returnDate = null;
    };
    $scope.apply = function () {
        show_dialog_loading();
        $scope.lockerApplication.applyType = $scope.applyType;
        $scope.lockerApplication.serialNumber = $scope.selectedLocker.serialNumber;
        $scope.lockerApplication.guid = $scope.personalInformation.adName;
        $scope.lockerApplication.startDate = new Date($scope.lockerApplication.startDate);
        $scope.lockerApplication.returnDate = new Date($scope.lockerApplication.returnDate);
        $scope.lockerApplication.projectRoom = $scope.personalInformation.workingPlace;

        $http.post('locker/apply', $scope.lockerApplication)
            .success(function (data) {
                hide_dialog_loading();
                $scope.init();
            }).error(function (data) {
                hide_dialog_loading();
                change_dialog_error("error");
                show_dialog_error();
                $scope.init();
        })
    }
    
    $scope.certificateUpload = function () {
        for (var i = 0; i < $scope.files.length; i++) {
            var fileName = $scope.files[i].name;
            var fileType = fileName.substring(fileName.indexOf("."));
            if (fileType == "") {
                change_dialog_error('can\'t find upload file');
                show_dialog_error();
                break;
            }
            else if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileType)) {
                change_dialog_error('The file must be a picture');
                show_dialog_error();
                break;
            } else {
                $scope.doUpload($scope.files[i]._file);
                $scope.cabinateLostApply();
            }
        }
    }
    $scope.cabinateLostApply = function () {
    	show_dialog_loading();
        $scope.lockerApplication.guid = $scope.lockerAndCabinet[0].guid;
        $scope.lockerApplication.serialNumber = $scope.lockerAndCabinet[0].serialNumber;
        $http.post('locker/keyLost', $scope.lockerApplication)
            .success(function (data) {
                if(data.status == "completed"){
                    hide_dialog_loading();
                    change_dialog_error("<h2>Your apply has been submitted .</h2>");
                    show_dialog_error();
                }else if(data.status == "applied") {
                    hide_dialog_loading();
                    change_dialog_error("<h2>Do not submit twice</h2>");
                    show_dialog_error();
                }else if(data.status == "error") {
                    hide_dialog_loading();
                    change_dialog_error("error");
                    show_dialog_error();
                }
            }).error(function (data) {
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        })
    }
    $scope.clear = function () {
    	$scope.files='';
	};
    $scope.doUpload = function (file) {
    	var uploadUrl = '/newoa/locker/uploadFile/' + $scope.lockerApplication.guid;
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (result) {
            if (result != "error") {
//                $scope.leaveApplication.leaveUploadFile = result;
//                $scope.importFlag = false;
//                $scope.saveFlag = true;
//                $scope.flag = "importDone";
            	change_dialog_error('Upload files Sucess.');
                show_dialog_error();
                $('#keyLost').modal('hide');
            }
        }).error(function () {
            change_dialog_error('Upload files failed.');
            show_dialog_error();
        })
    };
    $scope.returnBack = function () {
        show_dialog_loading();
        $scope.lockerApplication.guid = $scope.lockerAndCabinet[0].guid;
        $scope.lockerApplication.serialNumber = $scope.lockerAndCabinet[0].serialNumber;
        $http.post('locker/returnBack', $scope.lockerApplication)
            .success(function (data) {
                hide_dialog_loading();
                $scope.init();
            }).error(function (data) {
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        })
    }
    $scope.forgetPswd = function () {
        show_dialog_loading();
        $scope.lockerApplication.guid = $scope.lockerAndCabinet[0].guid;
        $scope.lockerApplication.serialNumber = $scope.lockerAndCabinet[0].serialNumber;
        $http.post('locker/forgetPswd', $scope.lockerApplication)
            .success(function (data) {
                if(data.status == "completed"){
                    hide_dialog_loading();
                    change_dialog_error("Your original Password:"+data.psw.toString()+"<br>If you have ever changed the password,<br>please go to the Reception");
                    show_dialog_error();
                }else if(data.status == "applied") {
                    hide_dialog_loading();
                    change_dialog_error("<h2>Do not submit twice</h2><br>Your original Password:"+data.psw.toString()+"<br>If you have ever changed the password,<br>please go to the Reception");
                    show_dialog_error();
                }else if(data.status == "error") {
                    hide_dialog_loading();
                    change_dialog_error("error");
                    show_dialog_error();
                }
            }).error(function (data) {
            hide_dialog_loading();
            change_dialog_error("error");
            show_dialog_error();
        })
    }
    $scope.renew = function () {
        show_dialog_loading();
        $scope.lockerApplication.applyType = $scope.applyType;
        $scope.lockerApplication.serialNumber = $scope.lockerAndCabinet[0].serialNumber;
        $scope.lockerApplication.guid = $scope.personalInformation.adName;
        $scope.lockerApplication.process = $scope.personalInformation.coachGuid;
        $http.post('locker/renew', $scope.lockerApplication)
            .success(function (data) {
                hide_dialog_loading();
                $scope.init();
            }).error(function (data) {
                hide_dialog_loading();
                change_dialog_error("error");
                show_dialog_error();
        })
    }
    $scope.lockerIdChanged = function () {
        $scope.state1 = $scope.selectedLocker;
        $scope.state2 = $scope.selectedLocker;
        $scope.state3 = $scope.selectedLocker;
        $scope.state4 = $scope.selectedLocker;
        console.log($scope.state1 + $scope.state2 + $scope.state3 + $scope.state4);
    }
    $scope.state2Changed = function () {
        $scope.state1 = $scope.state2;
    }
    $scope.state4Changed = function () {
        $scope.state1 = $scope.state4;
        $scope.state2 = $scope.state4;
        $scope.state3 = $scope.state4;
    }

    $scope.openDate = function () {
        $scope.popup.opened = true;
    };

    $scope.openEndDate = function () {
        $scope.popup.openedend = true;
    };
}])