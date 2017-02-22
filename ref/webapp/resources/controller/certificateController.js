app.controller("certificateController", function($scope, $http, $filter) {
	$scope.chosens = [ {
		name : 'Incumbency_Certificate[在职证明]',
		id : 1,
		value:'Incumbency_Certificate'
	}, {
		name : 'Income_Certificate[收入证明]',
		id : 2,
		value : 'Income_Certificate'
	}, {
		name : 'Travel_Certificate[旅行证明]',
		id : 3,
		value : 'Travel_Certificate'
	}, {
		name : 'Other_Certificates[其他]',
		id : 4,
		value : 'Other_Certificates'
	} ];

	/*$scope.chosens = [ {
		name : 'Incumbency_Certificate',
		id : 1
	}, {
		name : 'Income_Certificate',
		id : 2
	}, {
		name : 'Travel_Certificate',
		id : 3
	}, {
		name : 'Other_Certificates',
		id : 4
	} ];*/

	$scope.chosen = {
		/*name : 'Incumbency_Certificate',
		id : 1*/
	}
	$scope.applicated = false;
	$scope.submitCertificate = function(data) {
		$scope.talentEmail = {};
		data.type = $scope.chosen.value;
		$scope.talentEmail.subject = data.type;
		switch ($scope.chosen.id) {
			case (1):
				$scope.talentEmail.context = "Dear XXX, Your staff:" + data.name
					+ ", Guid:" + data.guid + " Information: Section: "
					+ data.section + " and Date: " + data.date + ".";
				break;

			case (2):
				$scope.talentEmail.context = "Dear XXX, Your staff:" + data.name
					+ ", Guid:" + data.guid + " Information: Section: "
					+ data.level + " and Date: " + data.time + ".";
				break;

			case (3):
				$scope.talentEmail.context = "Dear XXX, Your staff:" + data.name
					+ ", Guid:" + data.guid + " Information: Destination: "
					+ data.destination + " and Department: " + data.department
					+ ".";
				break;
		}

		$http.post('sendemail', $scope.talentEmail).success(function(data) {
		}).error(function(data) {
		});
	}

	$scope.openStartDate = function() {
		$scope.popupStartDate.opened = true;
	};

	$scope.popupStartDate = {
		opened : false
	};

	$scope.openEndDate = function() {
		$scope.popupEndDate.opened = true;
	};

	$scope.popupEndDate = {
		opened : false
	};

	$scope.print = function() {
		$('#printButton').hide();
		$('#closeButton').hide();
		angular.element('#print').jqprint();
		$('#printButton').show();
		$('#closeButton').show();
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

	$scope.mark = function (selected) {
		if ($scope.selected.length == 0) {
			change_dialog_error('Please select an object');
			show_dialog_error();
			return;
		}
		show_dialog_loading();
		$http.post('certification/markAsDone', $scope.selected)
			.then(function (redata) {
				if (redata.data == "success") {
					$scope.getAllCertificateInfo();
				} else {
					change_dialog_error('Failed');
					show_dialog_error();
				}
				hide_dialog_loading();
				$scope.selected.splice(0,$scope.selected.length);
			});
	}

	$scope.showCertificate = function(data){
		show_dialog_loading();
		$scope.getEmpInfo();

		var info = {
			guid:$scope.certificate.adName,
			appType : data
		};

		$http.post('ifAlready',info).success(function(reinfo){
			/*if(reinfo._status){
				change_dialog_error(reinfo._data);
				show_dialog_error();
				$scope.already = 1;
			}*/
			if(reinfo.toString().indexOf("new")==-1){
				/*change_dialog_error(reinfo);
				show_dialog_error();*/
				$scope.already = 1;
			}else{
				$scope.already=0;
			}
			hide_dialog_loading();
		});

	};
	// $scope.showcertificate = function() {
	// $scope.emailStatusTemplate = {};
	// $scope.emailStatusTemplate = $scope.chosen.id;
	// $http.post('getEmailTemplate', $scope.emailStatusTemplate)
	// .success(function(data) {
	// $scope.email = data;
	// document.getElementById("emailTemplate").innerHTML =
	// data.emailSubjectTemplate;
	// }).error(function(data) {
	// alert('fail')
	// });
	// }

	/*$scope.getCoachName=function(){
		$http.get('getAllEmployeeInfo')
			.success(function(redata){
				$scope.allEmployee=redata;
			}).error(function(redata){

		});
	}

	$scope.getCoachName();*/

	$scope.hideModel = function(){
		$('#Reconfirm').modal('hide');
	};

	$scope.saveCertificate = function(data) {
		show_dialog_loading();
		$('#Reconfirm').modal('hide');
		$('#applicationInfoModal').modal('hide');
		data.type = $scope.chosen.value;
		if (data.type == "Travel_Certificate") {
			data.startDate.setHours(data.startDate.getHours() + 8);
			data.startDate = $filter('date')(data.startDate, 'yyyy-MM-dd');
			data.endDate.setHours(data.endDate.getHours() + 8);
			data.endDate = $filter('date')(data.endDate, 'yyyy-MM-dd');
		}

		$scope.certificateInfo = data;
		var info = {
			_appId : null,
			_appType : data.type,
			guid : data.adName,
			empName : data.emplName,
			destination : data.destination,
			startDate : data.startDate,
			endDate : data.endDate,
			coachGuid : data.coachGuid,
			PMGuid : $scope.certificate.projectManagerGuid,
			RLGuid : data.leaderGuid,
			OMGuid : data.operationManagerGuid,
			GMGuid : $scope.gmGuid,
			max : null,
			chopType : data.chopType,
			comment : data.comment,
			passportNumber : data.passportNumber,
			hr : null,
			hrm : null,
			EmpNo : data.emplNo,
			ChineseName : data.chineseName,
			GDCStartDate : data.gdcStartDate,
			cerUploadFile : $scope.cerUploadFile
		};
		$http.post('saveApplication', info)
			.success(function(redata) {

				hide_dialog_loading();
				change_dialog_error('<p>Noticification:</p><br>'+
						'<p style="text-align:left;padding-left:10px">Please print out the Application Form after OM approval.'+
						'<br>You supposed to received the certification on Tuesday or Friday after you submit the hard copy to HR Self-service Station.'+
						'<br> HR will inform you after the whole process is completed.</p>');
				show_dialog_error();

				$('#Reconfirm').modal('hide');
				$('#applicationInfoModal').modal('hide');
				$scope.applicated = true;
				window.location.href ="#/certificateList";

			}).error(function() {
			hide_dialog_loading();
			change_dialog_error('Submit Failed!');
			$('#applicationInfoModal').modal('hide');
			$('#Reconfirm').modal('hide');
			show_dialog_error();
		})
		//$scope.getEmpInfo();
	};



	$scope.getApplication = function(info) {
		show_dialog_loading();
		$scope.modal = {};
		$scope.travelInfo = {};
		$('#applicationInfoModal').on('show.bs.modal',function(){
			$scope.modal = {};
			$scope.travelInfo = {};
		});
		$http.post('getEmpInfo', info.adName).success(function(redata) {
			$scope.modal = redata;
			$scope.travelInfo = info;

			if(info.status_log.indexOf("Processing")==-1){
				$scope.validPrint = 1;
			}else{
				$scope.validPrint = 0;
			}
			hide_dialog_loading();


		}).error(function(redata) {
			hide_dialog_loading();
			change_dialog_error("System error!")
			show_dialog_error();
		});

	};

	var guid = document.getElementById("userGuid").value;

	$scope.getEmpInfo = function() {
		show_dialog_loading();
		$http.post('getEmpInfo', guid).success(function(redata) {
			$scope.certificate = redata;
			$scope.certificate.projectManagerName = redata.coachName;
			$scope.certificate.projectManagerGuid = redata.coachGuid;
			$scope.certificate.operationManager = redata.operationManager;
			$scope.certificate.operationManagerGuid = redata.operationManagerGuid;
			$scope.modal = redata;
			hide_dialog_loading();
		}).error(function(redata) {
			hide_dialog_loading();
		})

	};

	$scope.getEmpInfo();


	$scope.getAllCertificateInfo = function() {
		$http.post('getAllCertificateInfo',guid).success(function(CertificateList) {
			$scope.certificateList = CertificateList;
		}).error(function(CertificateList) {

		})
	};

	$scope.getAllCertificateInfo();

	$scope.getcertificateInfo = function() {
		$http.post('getcertificateInfo', guid).success(function(redata) {
			$scope.information = redata;
		}).error(function(redata) {
		})
	};

	$scope.getcertificateInfo();

	$scope.getDate = function() {
		$scope.startDate.setHours($scope.startDate.getHours() + 8);
		$scope.startDate = $filter('date')($scope.startDate, 'yyyy-MM-dd');
		$scope.startDate;

		$scope.endDate.setHours($scope.endDate.getHours() + 8);
		$scope.endDate = $filter('date')($scope.endDate, 'yyyy-MM-dd');
		$scope.endDate;
	}

	var isChoosed = 0;
	$scope.submitApprove = function() {
		show_dialog_loading();
		angular.forEach($scope.information, function(info) {
			if (info.selected == undefined || info.selected == false) {
				isChoosed ++;
			}
		})

		if(isChoosed == $scope.information.length) {
			hide_dialog_loading();
			change_dialog_error('Please Select!');
			show_dialog_error();
			isChoosed = 0;
			$scope.getcertificateInfo();
			return;
		}
		angular.forEach($scope.information, function(info) {
			if (info.selected == true) {
				var info = {
					_appType : info.type,
					_appId : info.id,
					guid : info.adName

				}
				$http.post('approveApplication', info).then(function(redata) {
					hide_dialog_loading();
					change_dialog_error('Approved Completed!');
					$scope.getcertificateInfo();
					show_dialog_error();
				})
			}
		});
	}

	$scope.sendCompletedEmail = function(emailInfo) {
		show_dialog_loading();
		$http.post('sendCompletedEmail', emailInfo).then(function(redata) {
			hide_dialog_loading();
			change_dialog_error('Send Email Completed!');
			$scope.getAllCertificateInfo();
			show_dialog_error();
		})
	}

	$scope.searchByStatus = function(info){
		if( $scope.statusInfo == null){
			return true;
		}
		if($scope.statusInfo=="Processing"){
			return info.status_log!='Approved';
		}
		else if( $scope.statusInfo == 'Approved'){
			return info.status_log=='Approved';
		}
		else if($scope.statusInfo == "Done"){
			return info.status_log=='Done';
		}
		else{
			return true;
		}
	}

	$scope.sendTestEmail = function() {
		$http.post('sendTestEmail').success(function() {

		})
	}

	$scope.submitReject = function() {
		show_dialog_loading();
		angular.forEach($scope.information, function(info) {
			if (info.selected == undefined || info.selected == false) {
				isChoosed ++;
			}
		})
		if(isChoosed == $scope.information.length) {
			hide_dialog_loading();
			change_dialog_error('Please Select!');
			show_dialog_error();
			isChoosed = 0;
			$('#rejectModal').modal('hide');
			$scope.getcertificateInfo();
			return;
		}
		angular.forEach($scope.information, function(info) {
			if (info.selected == true) {
				var info = {
					_appType : info.type,
					_appId : info.id,
					guid : info.adName,
					rejectReason: $scope.rejectComment
				}
				$http.post('rejectApplication', info).then(function(redata) {
					hide_dialog_loading();
					change_dialog_error('Reject Completed!');
					$scope.getcertificateInfo();
					$('#rejectModal').modal('hide');
					show_dialog_error();
				})
			}
		});
	}
	$scope.cerFiles = [];
	$scope.cerUploadAttachment = function(){
		for (var i = 0; i < $scope.cerFiles.length; i++) {
			var fileName = $scope.cerFiles[i].name;
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
				$scope.doCerUpload($scope.cerFiles[i]._file);
			}
		}
	}

	$scope.doCerUpload = function(file){
		var uploadUrl = '/newoa/certificate/uploadFile/'+ $scope.certificate.adName;
		var fd = new FormData();
		fd.append('file', file);
		show_dialog_loading();
		$http.post(uploadUrl, fd, {
			//transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).success(function (result) {
			if(result != "error"){
				$scope.cerUploadFile=result;
			}
			hide_dialog_loading();
			$('#cerUploadFiles').modal('hide');
			change_dialog_error("upload success!");
			show_dialog_error();
		}).error(function(){
			change_dialog_error('Upload files failed.');
			show_dialog_error();
		})
	}

	$scope.showCerAttachmentList = function(application){
		$scope.filePath = "";
		$scope.getAllFilesError="";
		$scope.filePath = application.cerUploadFile;
		$http.post('showCerAttachmentList',application)
			.success(function(redata) {
				$scope.files = redata;
			}).error(function(redata){
			$scope.getAllFilesError="System error!";
		});
	}

	$scope.cerDownload=function(fileName){

		var url = "leave/download"+$scope.filePath +"/"+ fileName;
		// window.location.href = url;
		window.open(
			url,
			'_blank'
		);
	}

});
