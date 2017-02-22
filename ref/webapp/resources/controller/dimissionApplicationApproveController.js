app.controller('dimissionApplicationApproveController',function($scope, $http, $filter, $rootScope){
	$scope.application={}
	$scope.approveModal={}

	$scope.dimissionGetApplication();

	$scope.isOM = false;
	$scope.checkIsOM=function(){
		if($scope.name == $scope.omGuid){
			$scope.isOM=true;
		}
	}
	$scope.checkIsOM();
	
	$scope.checked=[];
	$scope.checkBox=function(application){
		for(var i=0; i < $scope.checked.length; i++){
			if($scope.checked[i] == application){
				$scope.checked.splice(i,1);
				return;
			}
		}
		$scope.checked.push(application);
	}
	
	$scope.mutipleApprove = function(){
		show_dialog_loading();
		var infoList=[];
		$scope.checked.forEach(function(application){
			var info={
					_appId:application.dimissionAppId,
					_appType:"dimission",
					_rehirable:application.rehirable ? "true":"false",
					_approver:$scope.name
			}
			infoList.push(info);
		});	
		$http.post('application/dimissionApplication/multipleApprove',infoList)
			.success(function(redata){
				hide_dialog_loading();
				if(redata == "0"){
					change_dialog_error("Success!");
	                show_dialog_error();
	                $scope.dimissionGetApplication();
	                $scope.checked=[];
				}else{
					change_dialog_error(redata+"Request fail to Approve!");
	                show_dialog_error();
	                $scope.dimissionGetApplication();
	                $scope.checked=[];
				}
			}).error(function(redata){
				hide_dialog_loading();
				change_dialog_error("System error!");
                show_dialog_error();
			});
	}
	
	$scope.approve=function(listToApprove){
		$scope.approveModal=null;
		if(listToApprove==null){
		}
		else{
			listToApprove.forEach(function(application){
				if(application.check){
					$scope.approveModal=application;	
				}
			});
		}
	}
	
	$scope.tableApprove=function(application){
		$scope.approveModal=null;
		$scope.approveModal=application;
	}
	
	$scope.approveApplication=function(type){
		if($scope.approveModal!=null){
			show_dialog_loading();
			$scope.approveModal.rehire=type;
			var info={
					_appId:$scope.approveModal.dimissionAppId,
					_appType:"dimission",
					_rehirable:$scope.approveModal.rehire,
					_approver:$scope.name
			}
			$http.post('approveApplication',info)
			.success(function(redata){
				if(redata=="true"){
					change_dialog_error("Pending for next approver");
	                show_dialog_error();
					$('#approveModal').modal('hide');
					$http.post('application/dimissionApplication/getAllApprovingDimApp', $scope.name)
					.success(function(redata) {
						$scope.applicationList = redata;
						hide_dialog_loading();
					}).error(function(redata){
						hide_dialog_loading();
					});
					$scope.checked=[];
				}else{
					hide_dialog_loading();
					change_dialog_error("Fail to approve");
	                show_dialog_error(); 
				}
				
			}).error(function(redata){
				hide_dialog_loading();
				change_dialog_error("Fail to approve");
                show_dialog_error(); 
			});
		}
	}

	$scope.simpleApprove=function(application){
		show_dialog_loading();
		var info={
			_appId:application.dimissionAppId,
			_appType:"dimission",
			_rehirable:application.rehirable,
			_approver:$scope.name
		}
		$http.post('approveApplication',info)
			.success(function(redata){
				if(redata=="true"){
					change_dialog_error("Success!");
					show_dialog_error();
					$http.post('application/dimissionApplication/getAllApprovingDimApp', $scope.name)
						.success(function(redata) {
							$scope.applicationList = redata;
							$scope.checked=[];
							hide_dialog_loading();
						}).error(function(redata){
							hide_dialog_loading();
					});
				}else{
					hide_dialog_loading();
					change_dialog_error("Fail to approve");
					show_dialog_error();
				}

			}).error(function(redata){
			hide_dialog_loading();
			change_dialog_error("Fail to approve");
			show_dialog_error();
		});
	}
	
	$scope.rejectModal={};
	
	$scope.tableReject=function(application){
		$scope.rejectModal=null;
		$scope.rejectModal=application;
	}
	
	$scope.reject=function(listToApprove){
		$scope.rejectModal=null;
		if(listToApprove==null){
		}
		else{
			listToApprove.forEach(function(application){
				if(application.check){
					$scope.rejectModal=application;
				}
			});
		}
	}
	
	$scope.rejectApplication=function(){
		if($scope.rejectModal!=null){
			show_dialog_loading();
			var info={
					_appId:$scope.rejectModal.dimissionAppId,
					_appType:"dimission",
					_rejectComment:$scope.rejectModal.rejectComment
			}
			$http.post('rejectApplication', info)
			.success(function(redata){
				if(redata=="true"){
					change_dialog_error("Success!");
	                show_dialog_error();
					$('#rejectModal').modal('hide');
					$http.post('application/dimissionApplication/getAllApprovingDimApp', $scope.name)
					.success(function(redata) {
						$scope.applicationList = redata;
						$scope.checked=[];
						hide_dialog_loading();
					}).error(function(redata){
						hide_dialog_loading();
					});
				}else{
					hide_dialog_loading();
					change_dialog_error("Fail to reject!");
	                show_dialog_error();
				}
				
			}).error(function(redata){
				hide_dialog_loading();
				change_dialog_error("Fail to reject!");
                show_dialog_error();
			});
		}
	}
	
	$scope.select={
			startDate:null,
			endDate:null
	}
	$scope.searchByDate=function(application){
		if(application==null){
			return false;
		}
		var applyDate= new Date(application.appTime.replace(/-/g,   "/"));
		if($scope.select.startDate!=null&&$scope.select.endDate!=null){      
			return applyDate<=$scope.select.endDate&&applyDate>=$scope.select.startDate;
		}
		else if($scope.select.startDate==null&&$scope.select.endDate!=null){
			return applyDate<=$scope.select.endDate;
		}
		else if($scope.select.startDate!=null&&$scope.select.endDate==null){
			return applyDate>=$scope.select.startDate;
		}
		else{
			return true;
		}
	}
	
	$scope.searchByEmpolyeeID=function(application){
		if(application==null){
			return false;
		}
		if($scope.emplNumber==null){
			return true;
		}
		else{
			return application.emplNo.indexOf($scope.emplNumber)>=0;
		}
	}
	
   $scope.isCheck=function(hrApplication){
	   if(hrApplication.check==true){
		   $scope.applicationList.forEach(function(application){
			   application.check=false;
		   });
		   hrApplication.check=true;
	   }
	   else{
		   $scope.applicationList.forEach(function(application){
			   application.check=false;
		   });
	   }
   }
	
	$scope.openStartDate = function() {
        $scope.startDate.opened = true;
    };
    $scope.startDate = {
        opened: false
    };
    
    $scope.openEndDate = function() {
        $scope.endDate.opened = true;
    };
    $scope.endDate = {
        opened: false
    };
    
    $scope.edit=function(application){
    	if(application.isEdit==true){
    		var lastWorkingDay=$filter('date')(application.editDate,'yyyy-MM-dd');
    		if(application.lastWorkingDay!=lastWorkingDay){
    			application.lastWorkingDay=lastWorkingDay;
    			$http.post('application/dimissionApplication/save',application)
    			.success(function(redata){
    				if(redata==null){ 					
    				}
    			}).error(function(redata){
    				$scope.errorMessage="System error";
    			});
    		}
    	}
    	else{
    		application.editDate= new Date(application.lastWorkingDay.replace(/-/g,   "/"));
    	}
    	application.isEdit=!application.isEdit;	
    }
});