app.controller('dimissionHRReviewController',function($scope, $http, $filter, $rootScope){
	$scope.application={}
	$scope.select={
			startDate:null,
			endDate:null
	}
	
	$scope.leaveReasons=[
		"EI-Acceptance Withdrawn",
		"EI-Comp offer couldn't refuse",
		"EI-Death",
		"EI-Desire to Travel More",
		"EI-Dissat w/Compensation",
		"EI-Dissat w/Firm policy",
		"EI-Dissat w/Job Security",
		"EI-Dissat w/Phys Wrok Environ",
		"EI-Dissat w/Training",
		"EI-Dissat w/teamwk,cooperation",
		"EI-Dissat with supervisor(s)",
		"EI-Educational Pursuits",
		"EI-Ending Internship",
		"EI-Family/Personal Consider",
		"EI-Hired by Affiliate",
		"EI-Insufficient flexibility",
		"EI-Job Abandonment",
		"EI-Lack of connectivity w/Idr",
		"EI-Lack of non-monetary recog",
		"EI-Limited adv/growth opps",
		"EI-Military Service",
		"EI-Morale in group",
		"EI-More challenging work",
		"EI-Not Admitted to Partnership",
		"EI-Opportunity to travel less",
		"EI-Other Reason",
		"EI-Personal Decision to Reloca",
		"EI-Personal reason not PwC",
		"EI-Quality of coaching/fdbk",
		"EI-Result of Firm Action",
		"EI-Retirement w/Firm Benefits",
		"EI-Time for personal life",
		"EI-Work Related pressure",
		"EI-Work/career not avail here",
		"FI-Offer Withdrawn",
		"FI-Amex Non Compliance",
		"FI-Conduct",
		"FI-End of Temporary Contract",
		"FI-Expiry of Work Authorization",
		"FI-Job Elimination",
		"FI-Job Elimination/GSS",
		"FI-Misstatement on Application",
		"FI-Other Reason",
		"FI-Performance",
		"FI-Retirement",
		"FI-Violation of Policy",
		"FI-Work Shortage"
	]
	
	$scope.dimissionHRReview();
	
//    $scope.EmailTemplateinit = function () {
//		$scope.getEmailError="";
//        $http.post('/newoa/EmailTemplate/EmailTemplateManagement')
//			.success(function (data) {
//            	$scope.EmailTemplatelist = data;
//            	$scope.EmailTemplatelist.forEach(function(emailTemplate){
//    				if(emailTemplate.module=="HR_Operation_TerminationRemind"){
//    					$scope.templateinfoshow=emailTemplate;
//    				}
//    			});
//				$scope.templateinfoshow.tempSubject = $scope.templateinfoshow.tempSubject.replace(/EMPLOYEE_NAME/,$scope.checked[0].emplName);
//				$scope.templateinfoshow.tempSubject = $scope.templateinfoshow.tempSubject.replace(/LAST_WORKING_DATE/,$scope.checked[0].lastWorkingDay);
//        	}).error(function(redata){
//				$scope.getEmailError="System Error!";
//		});
//    }
    
    $scope.emailTemplateinit = function (){
    	$scope.getEmailError="";
    	$http.post('application/dimissionApplication/',$scope.checked[0].adName)
    		.success(function(redata){
    			$scope.templateinfoshow = redata;
    			$scope.templateinfoshow.tempSubject = $scope.templateinfoshow.tempSubject.replace(/EMPLOYEE_NAME/,$scope.checked[0].emplName);
				$scope.templateinfoshow.tempSubject = $scope.templateinfoshow.tempSubject.replace(/LAST_WORKING_DATE/,$scope.checked[0].lastWorkingDay);
    		}).error(function(){
    			$scope.getEmailError="System Error!";
    		});
    }

    $scope.sentEmail = function(){
		var Email;
		Email={
				tempSubject: $scope.templateinfoshow.tempSubject,
				cc: $scope.templateinfoshow.cc,
				tempContent: $scope.templateinfoshow.tempContent,
				googleEmailAddress:$scope.checked[0].googleEmailAddress,
				dimissionAppId:$scope.checked[0].dimissionAppId
				};
		$http.post('application/dimissionApplication/hrSendEmail',Email)
			.success(function (redata) {
                if(redata=="0"){
                    $('#updateTemplateModal').modal('hide');
                }else{
					change_dialog_error("Send Fail!");
					show_dialog_error();
                }
			}).error(function (redata) {
				change_dialog_error("System error , Send Fail!");
				show_dialog_error();
		})
	}

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

	$scope.status = [
		         		{
		         			name : 'Pending coach',
		         			id : 1
		         		},
		         		{
		         			name : 'Pending OM',
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
		         			name : 'Pending GM',
		         			id : 5
		         		},
		         		{
		         			name : 'Pending HRM',
		         			id : 6
		         		}
		         	]
	
	$scope.statusShow=function(code){
		var statusName;
		$scope.status.forEach(function(statusCode){
			if(statusCode.id==code){
				statusName=statusCode.name;
			}
		});
		return statusName;
	}
	
	$scope.reviewType="approved";
	$scope.getShow=function(reviewType){
		show_dialog_loading();
		var info={
				_type:reviewType
		}
		$http.post('application/dimissionApplication/reviewApplications', info)
		.success(function(redata) {
			if(redata._status){
				$scope.applicationHRList = redata._data;
				hide_dialog_loading();
			}else{
				//console.log("Get data failed!"+redata._errorMsg);
				hide_dialog_loading();
			}
		}).error(function(redata){
			hide_dialog_loading();
		});
	}

	$scope.saveDate=function(listToSave){
		listToSave.forEach(function(application){ 
			if(application.check){
				$http.post('application/dimissionApplication/save',application)
				.success(function(redata){
					if(redata){
					alert("success");
					}else{
						alert("fail");
					}
				});
			}
		});
	}
	
	$scope.searchByDate=function(application){
		if(application==null){
			return false;
		}
		var applyDate= new Date(application.lastWorkingDay.replace(/-/g,   "/"));
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
	
	$scope.openStartDate = function() {
        $scope.startDate.opened = true;
    }
    
    $scope.startDate = {
        opened: false
    }
    
    $scope.openEndDate = function() {
        $scope.endDate.opened = true;
    }
    
    $scope.endDate = {
        opened: false
    }
    
    $scope.openLastWorkingDay=function(){
    	$scope.lastWorkingDay.opened=true;
    }
    
    $scope.lastWorkingDay={
    		opened:false
    }
    
    $scope.showApplication=function(application){
    	$scope.modal=application;
    }
    
   $scope.isCheck=function(hrApplication){
	   if(hrApplication.check==true){
		   $scope.applicationHRList.forEach(function(application){
			   application.check=false;
		   });
		   hrApplication.check=true;
	   }
	   else{
		   $scope.applicationHRList.forEach(function(application){
			   application.check=false;
		   });
	   }
   }
    
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
    
   
   $scope.editReason=function(application){
	   $scope.editReasonErrorMessage="";
	   if(application.leaveReasonIsEdit == true){
   			$http.post('application/dimissionApplication/save',application)
   			.success(function(redata){
   				if(redata==null){ 					
   				}
   			}).error(function(redata){
   				$scope.editReasonErrorMessage="System error,edit fail!";
   			});
   		}
	   application.leaveReasonIsEdit=!application.leaveReasonIsEdit;
   }
    
   $scope.markAsDone=function(listOfAll){
	   if(listOfAll!=null){
		   var listToMark=[];
		   listOfAll.forEach(function(application){
			  if(application.check){
				  listToMark.push(application);
			  }
		   });
		   if(listToMark.length!=0){
			   show_dialog_loading();
			   $http.post('application/dimissionApplication/done',listToMark)
				.success(function(redata){
					if(redata=="true"){
	                    change_dialog_error('Success');
	                    show_dialog_error();
						$scope.getShow($scope.reviewType);
						$scope.checked=[];
						hide_dialog_loading();
					}else{
						change_dialog_error('Fail');
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
   }
   
   $scope.markAsUnDone=function(listOfAll){
	   if(listOfAll!=null){
		   var listToMark=[];
		   listOfAll.forEach(function(application){
			  if(application.check){
				  listToMark.push(application);
			  }
		   });
		   if(listToMark.length!=0){
			   show_dialog_loading();
			   $http.post('application/dimissionApplication/undone',listToMark)
				.success(function(redata){
					if(redata="true"){
	                    change_dialog_error('Success');
	                    show_dialog_error();
						$scope.getShow($scope.reviewType);
						$scope.checked=[];
						hide_dialog_loading();
					}else{
						change_dialog_error('Fail');
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
   }
   
   $scope.print = function() {
	   $('#printButton').hide();
       $('#closeButton').hide();
	   angular.element('#print').jqprint();
       $('#printButton').show();
       $('#closeButton').show();
	}

    
});