app.controller("searchEmployeeInfoController", function ($scope, $http, $filter) {
	$scope.searchInfo={};

	$scope.isOM = false;
	$scope.checkIsOM=function(){
		if($scope.name == $scope.omGuid){
			$scope.isOM=true;
		}
	}
	$scope.checkIsOM();

	$http.get('getAllJobTitle')
		.success(function(redata){
			$scope.jobTitleList=redata;
		}).error(function(redata){
			$scope.jobTitleList=[{label:"Syestem error,please refresh!"}];
		});

	$scope.teams=[
		{value:'1',label:'Guidewire'},
		{value:'2',label:'IT'},
		{value:'3',label:'Finance'},
		{value:'4',label:'HR'},
		{value:'6',label:'PQA'},
		{value:'7',label:'IS-ADT'},
		{value:'10',label:'IS-IMAT'},
		{value:'11',label:'Oracle'},
		{value:'13',label:'SAP'},
		{value:'16',label:'Compliance'},
		{value:'17',label:'GM'},
		{value:'24',label:'Admin'},
		{value:'21',label:'Others'}
	]
	
	$scope.getDomain = function(){
		$http.get('getAllDomain')
			.success(function(redata){
				$scope.teamList = redata;
			}).error(function(){
				$scope.teamList = [{supportingTeamName:"system error! fail to get domain,please refresh!"}];
			});
	}
	$scope.getDomain();

	$scope.educations=[
	    {value:'Colledge',label:'Colledge'},
		{value:'Bachelor',label:'Bachelor'},
		{value:'Master',label:'Master'},
		{value:'Doctor',label:'Doctor'}
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
	
	$scope.status = [
 		{
 			name : 'Intern',
 			id : 0
 		},
 		{
 			name : 'NoEmail',
 			id : 1
 		},
 		{
 			name : 'Formal',
 			id : 2
 		},
 		{
 			name : 'Trial',
 			id : 3
 		},
 		{
 			name : 'Dimissial',
 			id : 4
 		}
 	]

	$scope.getEmployee=function(){
		$http.get('getDetailEmployeeInfo')
			.success(function(redata){
				$scope.employeeList=redata;
			}).error(function(redata){
				$scope.errorMessage="System error";
			});
	}
			
	$scope.getEmployee();
	
	$scope.modal={};
	
	$scope.showEmployeeInfo=function(info){
		$scope.errorMessageModal="";
		$scope.infoState="job";
		$scope.isEdit="false";
		$scope.modal={};
		$scope.persionalInfo={};
		$scope.modal=angular.copy(info);
		$http.post('getPersonalInfo',$scope.modal.emplID)
		.success(function (redata) {
			$scope.personalInfo=redata;
		}).error(function (redata) {
			$scope.errorMessageModal="System error";
		});
	}
	
	$scope.infoState="job";

	$scope.changeState_Info = function(state) {
        $scope.infoState = state;
    }

    $scope.searchInfo.supportingTeamName=$scope.team;
	$scope.searchInfo.adName=$scope.name;
	$scope.getPersonInfo=function(){
		$scope.searchInfo.adName=$scope.name;
	}
	
	$scope.cearSearch=function(){
		$scope.searchInfo={};
	}

	$scope.findTeamMember = function(){
		$scope.searchInfo={
			supportingTeamName: $scope.team
		};
	}

	$scope.changeOnboardTimeType=function () {
		$scope.modal.gdcStartDate=$scope.modal.gdcStartDate.getTime();
	}

	$scope.changeBirthDateTimeType=function () {
		$scope.personalInfo.birthDate=$scope.personalInfo.birthDate.getTime();
	}

	$scope.addEmployeeInfo=function(){
		show_dialog_loading();
		$scope.addModal.birthDate=$scope.addModal.birthDate.getTime();
		$scope.addModal.gdcStartDate=$scope.addModal.gdcStartDate.getTime();
		$http.post('addEmployeeInfo',$scope.addModal)
			.success(function(redata){
				hide_dialog_loading();
				if(redata == "true"){
					$scope.getEmployee();
					$('#addInfoModal').modal('hide');
					$scope.errorMessageAddModal="";
				}
				else{
					change_dialog_error(redata);
					show_dialog_error();
				}
			}).error(function(redata){
				hide_dialog_loading();
				$scope.errorMessageAddModal="system error";
			});
	}

	$scope.edit=function (info) {
		$scope.errorMessageModal="";
		$scope.modal={};
		info.supportingTeamID=info.supportingTeamID.toString();
		$scope.personalInfo={};
		$scope.modal=angular.copy(info);
		$http.post('getPersonalInfo',$scope.modal.emplID)
			.success(function (redata) {
				$scope.personalInfo=redata;
			}).error(function (redata) {
				$scope.errorMessageModal="System error";
			});
		if($scope.authority.indexOf('NewOA HR Admin')!=-1){
			$scope.isEdit="admin";
			$scope.infoState="job";
		}else{
			$scope.isEdit="personal";
			$scope.infoState="personal";
		}
	}
	
	$scope.save=function(){
		show_dialog_loading();
		$scope.modal = angular.extend({}, $scope.modal, $scope.personalInfo);
		$http.post('modifyEmployeeInfo',$scope.modal)
		.success(function(redata){
			hide_dialog_loading();
			if(redata == "true"){
				$scope.getEmployee();
				$('#employeeInfoModal').modal('hide');
			}
			else{
				change_dialog_error(redata);
				show_dialog_error();
			}
		}).error(function(redata){
			hide_dialog_loading();
			$scope.errorMessageModal="System error";
		});
	}

	$scope.openbirthday = function() {
		$scope.popupbirthday.opened = true;
	};
	$scope.popupbirthday = {
		opened: false
	};

	$scope.openOnBoradDate = function() {
		$scope.popOpenOnBoradDate.opened = true;
	};
	$scope.popOpenOnBoradDate = {
		opened: false
	};
});