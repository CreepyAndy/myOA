app.controller('dimissionApplicationController',function($scope, $http, $filter, $rootScope){
	show_dialog_loading();
	$scope.employee={};
	$scope.dimissionApplication={};

	$scope.leaveReasons=[
		"EI-Dissat w/Compensation",
		"EI-Dissat w/Training",
		"EI-Limited adv/growth opps",
		"EI-Personal Decision to Reloca",
		"EI-Work/career not avail here",
		"EI-Opportunity to travel less",
		"EI-More challenging work",
		"EI-Family/Personal Consider",
		"EI-Dissat with supervisor(s)",
		"EI-Dissat w/Phys Wrok Environ",
		"EI-Educational Pursuits",
		"EI-Time for personal life",
		"EI-Comp offer couldn't refuse",
		"EI-Work Related pressure",
		"EI-Insufficient flexibility",
		"EI-Personal reason not PwC",
		"EI-Morale in group",
		"EI-Desire to Travel More",
		"EI-Dissat w/teamwk,cooperation",
		"EI-Hired by Affiliate"
	]

	$scope.employee.adName=document.getElementById("userGuid").value;
	
	$scope.applicated=true;
	$scope.hasHistory=false;
	
	$scope.todayDate=new Date();
	$scope.date = new Date();
	$scope.limitLastWorkingDay=function(){
		var onBoardDate = new Date($scope.onBoardDate.replace(/-/g,"/"));
		if(parseInt(Math.abs($scope.todayDate.getTime()  -  onBoardDate.getTime())  /  1000  /  60  /  60  /24) <= 180 ){
			$scope.date.setDate($scope.date.getDate()+4);
		}else {
			$scope.date.setDate($scope.date.getDate()+31);
		}
	}
	$scope.limitLastWorkingDay();

	$scope.dateOptions = { //init PC calendar
	        formatYear: 'yyyy',
	        minDate: $scope.date,
	        startingDay: 1,
	        showWeeks: false
	    };
	

	$scope.status = [
	         		{
	         			name : 'Pending by Coach/PM/RL',
	         			id : 1
	         		},
	         		{
	         			name : 'Pending by OM',
	         			id : 2
	         		},
	         		{
	         			name : 'Rejected',
	         			id : 3
	         		},
	         		{
	         			name : 'Approved',
	         			id : 4
	         		},
	         		{
	         			name : 'Pending by GM',
	         			id : 5
	         		},
	         		{
	         			name : 'Pending by HRM',
	         			id : 6
	         		}
	         	]
	
	function getInfo(){
		$http.post('application/dimissionApplication/getAnEmployeeDimissionApplication',$scope.employee.adName)
		.success(function(redata){
			$scope.employee=redata._employeeInfo;
			if(redata._currentSize == 0){
				$scope.applicated=false;
			}else{
				$scope.applicated=true;
				$scope.dimissionApplication=redata._current;
			}
			if(redata._historySize>0){
				$scope.hasHistory=true;
				$scope.historyApplicationList = redata._history;
			}
			hide_dialog_loading();
		}).error(function(redata){
			hide_dialog_loading();
		});
	}
	
	getInfo();
	
	$scope.download=function(){
		var url = "#/Attachment";
		window.location.href = url;
	}
	
	$scope.submit=function(employee){
		if(employee.leaveDate!=null){
			show_dialog_loading();
			var application={}
			var applyDate=new Date();
			application.appTime=$filter('date')(applyDate,'yyyy-MM-dd');
			application.guid=employee.adName;
			application.lastWorkingDay=employee.leaveDate;
			application.lastWorkingDay.setHours(application.lastWorkingDay.getHours()+8);
			application.lastWorkingDay=$filter('date')(application.lastWorkingDay,'yyyy-MM-dd');
			application.dimissionType=employee.leaveReason;
			application.description=employee.leaveComments;
			application.processorGuid=employee.coachGuid;
			application._appId=0;
			application._appType="dimission"
			application.hrNotes=employee.leaveReason;
			$http.post('application/dimissionApplication/create',application)
				.success(function(redata){
					if(redata=="true"){
						change_dialog_error('Success');
	                    show_dialog_error();
						getInfo();
					}else{
						change_dialog_error(redata);
	                    show_dialog_error();
						hide_dialog_loading();
					}
			}).error(function(redata){
				change_dialog_error('Fail');
                show_dialog_error();
				hide_dialog_loading();
			});
		}
	}
	$scope.cancel=function(){
		$scope.employee.leaveDate=null;
		$scope.employee.leaveReason=null;
		$scope.employee.leaveComments=null;
	}
	
//	$scope.employee.coachGuidIsEdit=false;
//	$scope.coachGuidedit=function(){
//		if($scope.employee.coachGuidIsEdit){
//			debugger;
//			$scope.employee.coachGuid=$scope.employee.coachGuid;
//			$scope.employee.coachName=$scope.tesss;
//		}
//		$scope.employee.coachGuidIsEdit=!$scope.employee.coachGuidIsEdit;
//	}
	
	$scope.openbirthday = function() {
	        $scope.popupbirthday.opened = true;
	    };
	$scope.popupbirthday = {
	        opened: false
	    };
	
	$scope.statusShow=function(code){
		var statusName;
		$scope.status.forEach(function(statusCode){
			if(statusCode.id==code){
				statusName=statusCode.name;
			}
		});
		return statusName;
	}
	
	$scope.reSendEmail=function(){
		show_dialog_loading();
		var pending;
		switch($scope.dimissionApplication.appStatusCode){
		case 1:
			pending=$scope.dimissionApplication.processorGuid;
			break;
		case 2:
			pending=$scope.employee.operationManagerGuid;
			break;
		case 5:
			pending=$scope.gmGuid;
			break;
		case 6:
			pending=$scope.hrmGuid;
			break;
		default:
			break;	
		}
		var info={
			_guid:$scope.employee.adName,
			_toGuid:pending,
			_type:"dimission"
		}
		$http.post('application/dimissionApplication/sendEmail',info)
		.success(function(redata){
			if(redata._status){
				hide_dialog_loading();
				change_dialog_error("Success! Reminding E-mail has been sent to "+redata._data);
                show_dialog_error();
			}else{
				hide_dialog_loading();
				change_dialog_error(redata._errorMsg);
                show_dialog_error();
			}
		}).error(function(redata){
			change_dialog_error('Fail');
            show_dialog_error();
			hide_dialog_loading();
		});
	}
});