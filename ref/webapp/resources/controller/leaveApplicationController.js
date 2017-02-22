app.controller('LeaveApplicationController', ['$scope', 'fileUpload', '$http', '$filter', '$rootScope',
    function ($scope, fileUpload, $http, $filter, $rootScope) {
        $scope.select = {
            startDate: null,
            endDate: null
        }

        $scope.getLeaveType = function () {
            $scope.leaveType = null;
            $http.get('/newoa/leave/type').success(function (result) {
                $scope.leaveTypeList = result;
                hide_dialog_loading();
            }).error(function () {
                change_dialog_error('Errors in getting leave types.');
                show_dialog_error();
                hide_dialog_loading();
            });
        }
        $scope.getLeaveType();

        $scope.currentPage = 1;
        $scope.pageSize = 10;

        $scope.showLeaveTypeName = function (leaveTypeId) {
            var typeName = '';
            if ($scope.allEmployee === undefined || $scope.leaveTypeList == null)
                return;
            for (var i = 0, len = $scope.leaveTypeList.length; i < len; i++) {
                if ($scope.leaveTypeList[i].leaveTypeId == leaveTypeId) {
                    typeName = $scope.leaveTypeList[i].leaveTypeName;
                    break;
                }
            }
            return typeName;
        }

        $scope._status = null;

        $scope.status = [
            {
                name: 'Pending by Coach',
                id: 7
            },
            {
                name: 'Pending by PM',
                id: 1
            },
            {
                name: 'Pending by OM',
                id: 8
            },
            {
                name: 'Pending by GM',
                id: 9
            },
            {
                name: 'Pending by HR',
                id: 2
            },
            {
                name: 'Rejected by Coach',
                id: 10
            },
            {
                name: 'Rejected by PM',
                id: 3
            },
            {
                name: 'Rejected by OM',
                id: 11
            },
            {
                name: 'Rejected by GM',
                id: 12
            },
            {
                name: 'Rejected by HR',
                id: 4
            },
            {
                name: 'Approved',
                id: 5
            },
            {
                name: 'Done',
                id: 13
            },
            {
                name: 'Pending by HRM',
                id: 14
            },
            {
                name: 'Rejected by HRM',
                id: 15
            }
        ]

        $scope.leaveInit = function () {
            $scope.hint = "";
            show_dialog_loading();
            $http.get('/newoa/leave').success(function (list) {
                $scope.employee = list;
                if ($scope.employee.projectManagerID == null) {
                    $scope.employee.projectManagerID = $scope.employee.perMgrID;
                    $scope.hint = "Your PM is NULL, the chosen person is your coach.You can change your PM if necessary."
                }
                $scope.employee.projectManagerID = $scope.employee.projectManagerID.toString();
                hide_dialog_loading();
            }).error(function () {
                change_dialog_error('An error happened');
                show_dialog_error();
                hide_dialog_loading();
            });
        }
        /*
         * $scope.isHr !=-1  means role is HR
         * */
        $scope.approveListInit = function () {
            show_dialog_loading();
            $http.get('/newoa/leave/approvelist').success(function (list) {
                $scope.approvelist = list;
                hide_dialog_loading();
            }).error(function () {
                change_dialog_error('An error happened');
                show_dialog_error();
                hide_dialog_loading();
            });
        }

        $scope.searchByYear = "0";

        $scope.leaveListInit = function () {
            if ($scope.isHr != -1) {
                show_dialog_loading();
                $http.post('/newoa/leave/leavelistForHRAdmin', $scope.searchByYear).success(function (list) {
                    $scope.leavelist = list;
                    hide_dialog_loading();
                }).error(function () {
                    hide_dialog_loading();
                    change_dialog_error('An error happened');
                    show_dialog_error();
                });
            } else {
                show_dialog_loading();
                $http.get('/newoa/leave/leavelist').success(function (list) {
                    $scope.leavelist = list;
                    hide_dialog_loading();
                }).error(function () {
                    hide_dialog_loading();
                    change_dialog_error('An error happened');
                    show_dialog_error();
                });
            }
        }

        $scope.showNameByGuid = function (Guid) {
            var Name = '';
            if ($scope.allEmployee === undefined || $scope.allEmployee.length == null)
                return;
            for (var i = 0, len = $scope.allEmployee.length; i < len; i++) {
                if ($scope.allEmployee[i].adName == Guid) {
                    Name = $scope.allEmployee[i].emplName;
                    break;
                }
            }
            return Name;
        }

        $scope.updatePM = function () {
            $http.post('/newoa/leave/setPM', $scope.employee)
                .success(function (redata) {
                    if (redata == 1) {
                        $scope.hint = "Your PM has been changed.";
                    }
                    else {
                        $scope.hint = "Your PM hasn't been changed.";
                    }
                }).error(function () {
                $scope.hint = "Your PM hasn't been changed.";
            })
        }

        $scope.editStart = function (application) {
            if (application.isEdit == true) {
                var startTime = $filter('date')(application.startDate, 'yyyy-MM-dd');
                if (application.startTime != startTime) {
                    application.startTime = startTime;
                    $http.post('/newoa/leave/updateDate', application)
                        .success(function (redata) {
                            if (redata == null) {
                                change_dialog_error('Change date failed.');
                                show_dialog_error();
                            } else {
                                application.totalDays = redata;
                            }
                        }).error(function (redata) {
                        $scope.errorMessage = "System error";
                    });
                }
            }
            else {
                application.startDate = new Date(application.startTime.replace(/-/g, "/"));
            }
            application.isEdit = !application.isEdit;
        }

        $scope.editEnd = function (application) {
            if (application.isEdit2 == true) {
                var endTime = $filter('date')(application.endDate, 'yyyy-MM-dd');
                if (application.endTime != endTime) {
                    application.endTime = endTime;
                    $http.post('/newoa/leave/updateDate', application)
                        .success(function (redata) {
                            if (redata == null) {
                                change_dialog_error('An error happened');
                                show_dialog_error();
                            }
                            else {
                                application.totalDays = redata;
                            }
                        }).error(function (redata) {
                        $scope.errorMessage = "System error";
                    });
                }
            }
            else {
                application.endDate = new Date(application.endTime.replace(/-/g, "/"));
            }
            application.isEdit2 = !application.isEdit2;
        }

        $scope.leaveApplication = {};

        $scope.rejectComment = null;

        $scope.approve = function (approvelist) {
            if ($scope.selected.length == 0) {
                change_dialog_error('Please select an object');
                show_dialog_error();
                return;
            }

            show_dialog_loading();
            $http.post('/newoa/leave/approve', $scope.selected)
                .then(function (redata) {
                    if (redata.data.msg == "done") {
                        change_dialog_error('Approve completed');
                        show_dialog_error();
                        $scope.approveListInit();
                    } else if (redata.data.msg == "email_error") {
                        hide_dialog_loading();
                        change_dialog_error('Approve completed but send email failed');
                        show_dialog_error();
                        $scope.approveListInit();
                    } else {
                        hide_dialog_loading();
                        change_dialog_error('Approve failed');
                        show_dialog_error();
                    }
                    $scope.selected.splice(0, $scope.selected.length);
                });
        }

        $scope.mark = function (selected) {
            if ($scope.selected.length == 0) {
                change_dialog_error('Please select an object');
                show_dialog_error();
                return;
            }
            show_dialog_loading();
            $http.post('/newoa/leave/markAsDone', $scope.selected)
                .then(function (redata) {
                    if (redata.data == "success") {
                        $scope.leaveListInit();
                    } else {
                        hide_dialog_loading();
                        change_dialog_error('Failed');
                        show_dialog_error();
                    }
                    $scope.selected.splice(0, $scope.selected.length);
                });
        }
        /*
         * select the checked object to $scope.selectedTags
         */
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

        $scope.getApplication = function (info) {
            $scope.modal = info;
        }

        $scope.print = function () {
            $('#printButton').hide();
            $('#infoCloseButton').hide();
            angular.element('#print').jqprint();
            $('#printButton').show();
            $('#infoCloseButton').show();
        }

        $scope.openStartDate = function () {
            $scope.startDate.opened = true;
        }

        $scope.startDate = {
            opened: false
        }

        $scope.openEndDate = function () {
            $scope.endDate.opened = true;
        }

        $scope.endDate = {
            opened: false
        }

        $scope.searchByDate = function (employee) {
            //var applyDate = new Date(employee.appTime.replace(/-/g, "/"));
            var leaveStartDate = new Date(employee.startTime.replace(/-/g, "/"));
            var leaveEndDate = new Date(employee.endTime.replace(/-/g, "/"));

            if ($scope.select.startDate != null && $scope.select.endDate != null &&
                (leaveStartDate <= $scope.select.endDate && leaveEndDate >= $scope.select.startDate)) {
                return true;
            }
            else if ($scope.select.startDate == null && $scope.select.endDate != null && leaveStartDate <= $scope.select.endDate) {
                return true;
            } else if ($scope.select.startDate != null && $scope.select.endDate == null && leaveEndDate >= $scope.select.startDate) {
                return true;
            } else if ($scope.select.startDate == null && $scope.select.endDate == null) {
                return true;
            }
            else {
                return false;
            }
        }


        $scope.searchByEmpNum = function (employee) {
            if (employee == null) {
                return false;
            }
            if ($scope.employeeID == null) {
                return true;
            } else {
                return (employee.emplNo.indexOf($scope.employeeID) >= 0);
            }
        }

        $scope.searchByStatus = function (employee) {
            if (employee == null) {
                return false;
            }
            if ($scope._status == null) {
                return true;
            } else {
                return (employee.appStatusCode == $scope._status.id);
            }
        }
        $scope.submit = function () {

            if ($scope.employee.projectManagerID == null) {
                change_dialog_error('Please make sure your PM/Coach is not empty!');
                show_dialog_error();
                return;
            }
            $scope.leaveApplication.emplId = $scope.employee.emplID;
            if ($scope.leaveApplication.totalDays == null || $scope.leaveApplication.totalDays == 0) {
                change_dialog_error('Please calculate total days!');
                show_dialog_error();
                return;
            }

            $scope.leaveApplication.guid = $scope.employee.adName;
            $scope.leaveApplication.reportToEmpId = $scope.employee.leaderID;
            $scope.leaveApplication.leaveTypeId = $scope.leaveType.leaveTypeId;
            $scope.leaveApplication.leaveTypeName = $scope.leaveType.leaveTypeName;

            if ($scope.leaveApplication.leaveTypeId == 6 && $scope.leaveApplication.description == null) {
                change_dialog_error('Please input your description!');
                show_dialog_error();
                return;
            }
            if ($scope.leaveApplication.leaveUploadFile == null) {
                change_dialog_error('Please upload attachment!');
                show_dialog_error();
                return;
            }
            show_dialog_loading();
            if (typeof $scope.leaveApplication.startTime == "string") {
                $scope.leaveApplication.startTime = transferDate($scope.leaveApplication.startTime);
            }
            if (typeof $scope.leaveApplication.endTime == "string") {
                $scope.leaveApplication.endTime = transferDate($scope.leaveApplication.endTime);
            }
            $http.post('/newoa/leave/submit', $scope.leaveApplication).success(
                function (data) {
                    if (data == "success") {
                        change_dialog_error('Submit completed');
                        show_dialog_error();
                        window.location.href = "#/leave/leaveList";
                    } else {
                        hide_dialog_loading();
                        change_dialog_error(data);
                        show_dialog_error();
                    }
                }).error(function (data) {
                hide_dialog_loading();
                change_dialog_error('Submit failed');
                show_dialog_error();
                hide_dialog_loading();
            });
        }

        $scope.reject = function (list) {
            if ($scope.selected.length == 0) {
                change_dialog_error('Please select an object');
                show_dialog_error();
                return;
            }
            $('#commonModal').modal('show');
        }


        $scope.saveCommon = function () {
            if ($scope.selected != null) {
                $scope.selected.forEach(function (application) {
                    application.rejectComment = $scope.rejectComment;
                });
            }
            show_dialog_loading();
            $http.post('/newoa/leave/reject', $scope.selected)
                .then(function (redata) {
                    if (redata.data.msg == "done") {

                        $('#commonModal').modal('hide');
                        $scope.rejectComment = "";
                        change_dialog_error('Reject completed');
                        show_dialog_error();
                        $scope.approveListInit();
                    } else if (redata.data.msg == "email_error") {
                        $('#commonModal').modal('hide');
                        $scope.rejectComment = "";
                        change_dialog_error('Reject completed but send email failed');
                        show_dialog_error();
                        $scope.approveListInit();
                    } else {
                        hide_dialog_loading();
                        change_dialog_error('Reject failed or an error happened');
                        show_dialog_error();
                    }
                    $scope.selected.splice(0, $scope.selected.length);
                });
        }

        function transferDate(data) {
            var start_time = data;
            var newTime = start_time.replace(/-/g, "-");
            var transferdate = new Date(newTime);
            return transferdate;
        }

        $scope.leaveApplication.startTime = "";
        $scope.leaveApplication.endTime = "";
        $scope.count = function () {
            var tempLeaveApplication = angular.copy($scope.leaveApplication);

            if (typeof tempLeaveApplication.startTime == "string") {
                tempLeaveApplication.startTime = transferDate(tempLeaveApplication.startTime);
            }

            if (typeof tempLeaveApplication.endTime == "string") {
                tempLeaveApplication.endTime = transferDate(tempLeaveApplication.endTime);
            }
            $scope.btnsubmitdisable = false;

            if ($scope.leaveType != null && $scope.leaveApplication.startTime != "" && $scope.leaveApplication.endTime != "") {
                switch ($scope.leaveType.leaveTypeId) {
                    case 1:
                    case 2:
                    case 7:
                        $http.post('/newoa/leave/countByCalendar', tempLeaveApplication)
                            .success(function (data) {
                                $scope.leaveApplication.totalDays = data;
                            })
                            .error(function () {
                                change_dialog_error('Errors in counting days.');
                                show_dialog_error();
                            });
                        break;
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 8:
                        $http.post('/newoa/leave/countByWorkday', tempLeaveApplication)
                            .success(function (data) {
                                $scope.leaveApplication.totalDays = data;
                            })
                            .error(function () {
                                change_dialog_error('Errors in counting days.');
                                show_dialog_error();
                            });
                        break;
                }
            }
        }

        $scope.statusShow = function (code) {
            var statusName;
            $scope.status.forEach(function (statusCode) {
                if (statusCode.id == code) {
                    statusName = statusCode.name;
                }
            });
            return statusName;
        }

        $scope.isPmEdit = false;
        $scope.pmEdit = function () {
            $scope.isPmEdit = !$scope.isPmEdit;
        }

        $scope.flag = "import";
        $scope.files = [];
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
                }
            }
        }

        $scope.doUpload = function (file) {

            var uploadUrl = '/newoa/leave/uploadFile/' + $scope.employee.adName;
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (result) {
                if (result != "error") {
                    $scope.leaveApplication.leaveUploadFile = result;
                    //$('#uploadCertificateModal').modal('hide');
                    $scope.importFlag = false;
                    $scope.saveFlag = true;
                    $scope.flag = "importDone";
                    $('#leaveUploadFiles').modal('hide');
                }
            }).error(function () {
                change_dialog_error('Upload files failed.');
                show_dialog_error();
            })
        };

        $scope.showAttachmentList = function (application) {
            $scope.filePath = "";
            $scope.getAllFilesError = "";
            $scope.filePath = application.leaveUploadFile;
            $http.post('/newoa/leave/showAttachmentList', application)
                .success(function (redata) {
                    $scope.files = redata;
                }).error(function (redata) {
                $scope.getAllFilesError = "System error!";
            });
        }

        $scope.download = function (fileName) {

            var url = "leave/download/" + $scope.filePath + "/" + fileName;
            // window.location.href = url;
            window.open(
                url,
                '_blank'
            );
        }
    }])
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';
            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    //Also remove . and , so its gives a cleaner result.
                    if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
                        lastspace = lastspace - 1;
                    }
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    }).filter('start', function () {
    return function (input, start) {
        if (!input || !input.length) {
            return;
        }

        start = +start;
        return input.slice(start);
    };
});

app.directive('ngFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                        // File Name
                        name: item.name,
                        //File Size
                        size: item.size,
                        //File URL to view
                        url: URL.createObjectURL(item),
                        // File Input Value
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);