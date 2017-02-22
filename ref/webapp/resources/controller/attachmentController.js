app.controller('attachmentController', function($scope, $http, $filter, $rootScope) {
	$scope.data = 
		{
		attachmentTypes:
		[{
			name : 'Termination',
			id : 1
		}, {
			name : 'Leave',
			id : 2
		}, {
			name : 'Certification',
			id : 3
		}],
		chosen:{name : 'Termination', id : 1}
	};

	$scope.getAllFiles($scope.data.chosen.name);
	$scope.objToString=function(obj) {
	    return String(obj);
	}
	$scope.deleteFileDialog = function(fileName) {
		$('#deleteModel').modal('show');
		$scope.fileName = fileName;
	}
	$scope.deleteFile=function() {
		var fileNameAttachType = {"fileName":$scope.fileName,"attachmentType":$scope.data.chosen.name};
		$http.post('attachment/deleteFile', fileNameAttachType)
		.success(function(redata) {
			if(redata="true"){
				$scope.getAllFiles($scope.data.chosen.name);
				
			}else{
				change_dialog_error(redata);
			}
		}).error(function(redata){
			change_dialog_error("Request Failed!");
		});
		$('#deleteModel').modal('hide');
	}
	
	$scope.upload = function () {
		var fd = new FormData();
        fd.append('file', $scope.addFile);
        $http.post("attachment/uploadFile/"+ $scope.data.chosen.name, fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function (redata) {
        	if(redata=="true"){
        		$scope.getAllFiles($scope.data.chosen.name);
        	}else{
        		change_dialog_error(redata);
        	}
        	
        }).error(function(redata){
        	change_dialog_error("Request Failed!");
        });
    	$('#addFileModel').modal('hide');
    }
	
	$scope.download=function(fileName){
		
		var url = "attachment/download/"+$scope.data.chosen.name+"/" + fileName;
		// window.location.href = url;
		window.open(
					url,
				  '_blank' 
				);
	}
});