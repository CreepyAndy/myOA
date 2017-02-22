app.controller('newOAController', function($scope, $http, $filter, $rootScope) {
	$scope.showEmployee = false;
	$scope.showDimission = false;
	$scope.showLeave = false;
	$scope.showAccessCard = false;
	$scope.showCertification = false;
	$scope.showSettings = false;
	$scope.showGeneral = false;
	$scope.name = document.getElementById("userGuid").value;
	$scope.authority=document.getElementById("authority").value;
	$scope.isHr = document.getElementById("authority").value.indexOf('NewOA HR Admin');
	$scope.onBoardDate=document.getElementById("userOnboardDate").value;
	$scope.team=document.getElementById("userDomain").value;
	$scope.omGuid=document.getElementById("userOMGuid").value;
	$scope.jobLevel=document.getElementById("userJobLevel").value;
	$scope.gmGuid=document.getElementById("gmGuid").value;
	$scope.hrmGuid=document.getElementById("hrmGuid").value;

	$scope.getCoachName=function(){
		$http.get('getEmployeeGuidAndName')
			.success(function(redata){
				$scope.allEmployee=redata;
			}).error(function(redata){
				$scope.allEmployee=[{emplName:"System error ! Please Refresh !"}];
			});	
	}
	$scope.getCoachName();
	
	$scope.toggleGeneral = function() {
		$scope.showGeneral = !$scope.showGeneral;
	}
	$scope.toggleEmployee = function() {
		$scope.showEmployee = !$scope.showEmployee;
	}
	$scope.toggleDimission = function() {
		$scope.showDimission = !$scope.showDimission;
	}
	$scope.toggleLeave = function() {
		$scope.showLeave = !$scope.showLeave;
	}

	$scope.toggleCertification = function() {
		$scope.showCertification = !$scope.showCertification;
	}
	$scope.toggleSettings = function () {
		$scope.showSettings = !$scope.showSettings;
	}
	$scope.importExcel = function() {
		checkFileFormat();
	}
	$scope.toggleAccessCard = function () {
		$scope.showAccessCard = !$scope.showAccessCard;
	}
	
	$scope.dimissionGetApplication = function() {
        $scope.dimissionApplicationErrorMessage="";
		$http.post('application/dimissionApplication/getAllApprovingDimApp', $scope.name)
			.success(function(redata) {
				$scope.applicationList = redata;
			}).error(function(redata){
                $scope.dimissionApplicationErrorMessage="System error!";
		});
	}
	
	$scope.getAllFiles=function(attachmentType){
		$scope.getAllFilesError="";
		$http.post('attachment/getAllFiles',attachmentType == null ? "Termination":attachmentType)
			.success(function(redata) {
				$scope.files = redata;
			}).error(function(redata){
                $scope.getAllFilesError="System error!";
		});
	}
	
	$scope.dimissionHRReview = function() {
		var info={
			_type:"approved"	
		}
		$http.post('application/dimissionApplication/reviewApplications',info)
			.success(function(redata) {
				if(redata._status){
					$scope.applicationHRList = redata._data;
				}else{
					//console.log("Get data failed!"+redata._errorMsg);
				}
			}).error(function(redata){

		});
	}

	$scope.leaveApp = function() {
		show_dialog_loading();
		$http.get('/newoa/leave').success(function(data) {
			$scope.employee = data;
			hide_dialog_loading();
		}).error(function(data){
			change_dialog_error('An error happened');
	        show_dialog_error();
			hide_dialog_loading();
		});
	}

	$scope.searchByYear= "0";

	$scope.queryLeaveList = function() {
		if ($scope.isHr != -1) {
			show_dialog_loading();
			$http.post('/newoa/leave/leavelistForHRAdmin',$scope.searchByYear).success(function (list) {
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
	
	$scope.queryApproveLeaveList = function() {
		show_dialog_loading();
		$http.get('/newoa/leave/approvelist').success(function(data) {
			$scope.approvelist = data;
			hide_dialog_loading();
		}).error(function(data){
			change_dialog_error('An error happened');
	        show_dialog_error();
			hide_dialog_loading();
		});
	}
	
	$scope.refToIT = function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            window.location.href = "http://chinagdc.mso.net:8090/#/Pages/CurrentApplicationList.xaml"
        } else {
            window.location.href = "http://chinagdc.mso.net:8090/#/Pages/CurrentApplicationList.xaml"
            change_dialog_error("Please open this link with IE.");
            show_dialog_error();
        }

    }
    // $scope.lockerAdmin = function () {
    //     $http.post('/newoa/locker/refresh').success(function (data) {
    //         show_dialog_loading();
    //         if (data._status) {
    //             $scope.employee = data._data.employee;
    //             $scope.guid = $scope.employee.adName;
    //             $http.post('/newoa/locker/lockerAdminQuery', $scope.guid).success(function (data) {
    //                 show_dialog_loading();
    //                 $scope.list = data;
    //                 hide_dialog_loading();
    //             });
    //         } else {
    //             //console.log("Session failed! " + data._data);
    //         }
    //         show_dialog_loading();
    //     });
    // }
});