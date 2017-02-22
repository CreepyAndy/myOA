app.controller('employeeInfoController',['$scope','fileUpload','getEmployeeInfo',function($scope,fileUpload,getEmployeeInfo) {
				$scope.importExcel = function() {
					 $scope.checkFileFormat();
				};
				$scope.flag = "import";
	            $scope.checkFileFormat = function() {
	                var file = document.getElementById("importExcel");
	                var filename = file.value;
	                var filetype = filename.substring(filename.indexOf("."));;
	                if (filetype == "") {
	                    change_dialog_error('can\'t find upload file');
	                    show_dialog_error();
	                } else if (filetype != ".xlsx") {
	                    change_dialog_error('upload file must be \'xlsx\'');
	                    show_dialog_error();
	                } else {
	                	show_dialog_loading();
	                	$scope.doUpload();
	                	$scope.flag = "importDone";
	                }
	            };
	            $scope.flagID = "";
	            $scope.doUpload = function() {
	            	var file = $scope.employeeInfoExcel;
	            	//console.log('file is ');
	            	//console.log(file);
	            	var uploadUrl = "/newoa/employee/importEmployees";
	            	fileUpload.uploadFileToUrl(file,uploadUrl) 
	            	.then(function(result){
	            		//console.log(result);
	    	        	$scope.flagID = result.data.importFlagId;
	    	        	$scope.employeesInfoList = result.data.employeeInfoList;
	    	        	$scope.errorEmployeeInfoList = result.data.errorEmployeeInfoList;
	    	        	$scope.updateEmployeeInfoList = result.data.updateEmployeeInfoList;
	    	        	$scope.addEmployeeInfoList = result.data.addEmployeeInfoList;
	    	        	$scope.noChangeEmployeeInfoList = result.data.noChangeEmployeeInfoList;
	    	        	
	    	        	$scope.errorNum = result.data.errorEmployeeInfoList.length;
	    	        	$scope.updateNum = result.data.updateEmployeeInfoList.length;
	    	        	$scope.addNum = result.data.addEmployeeInfoList.length;
	    	        	$scope.noChangeNum = result.data.noChangeEmployeeInfoList.length;
	    	        	
	    	        	$('#importExcelModal').modal('hide');
	    	        	hide_dialog_loading();
	    	        });
	            };
	            $scope.saveEmployeeInfo = function() {
	            	var saveUrl = "/newoa/employee/saveEmployeesImport";
	            	show_dialog_loading();
	            	getEmployeeInfo.getEmplInfoFromUrl(saveUrl, $scope.flagID);
	            	$scope.flag = "saveDone";
	            };
	            
	            $scope.downloadSampleExcel = function() {
	            	var downloadUrl = "employee/download/SampleExcel";
	        		window.open(
	        				downloadUrl,
	        				  '_blank' 
	        				);
	            }
	            
	            
}]).directive('fileModel',['$parse', function ($parse) {
		return {
			restrict: 'A',
            link: function(scope, element, attrs) {
               var model = $parse(attrs.fileModel);
               var modelSetter = model.assign;
               
               element.bind('change', function(){
                  scope.$apply(function(){
                     modelSetter(scope, element[0].files[0]);
                  });
               });
            }
         };
}]).service('fileUpload', ['$http', function($http) {
		this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('file', file);
	        return $http.post(uploadUrl, fd, {
		           transformRequest: angular.identity,
		           headers: {'Content-Type': undefined}
		        })
		     }
	}]).service('getEmployeeInfo', ['$http', function($http) {
		this.getEmplInfoFromUrl = function(saveUrl, flagID){
	        $http.post(saveUrl, flagID)
	        .success(function(){
	        	$('#importExcelModal').modal('hide');
	        	hide_dialog_loading();
	        })
	        .error(function(){
	        	change_dialog_error('Fail to Save Employees\' Information');
	            show_dialog_error();
	        });
	     }
	}]).filter('cut', function () {
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
              if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});



