app.controller('EmailTemplateManagementController', function ($scope, $http) {

    /**
     * initial function
     */
    $scope.EmailTemplateinit = function () {
        $('#myModal').modal("hide");
        $('#updateTemplateModal').modal("hide");
        $('#deletetemplateModal').modal("hide");
        $scope.templete_Info = {};
        //query
        // show_dialog_loading();
        $http.post('/newoa/EmailTemplate/EmailTemplateManagement').success(function (data) {
            $scope.EmailTemplatelist = data;
            hide_dialog_loading();
            //console.log(data);
        });
    }  
    $scope.showdetailTemp=function(txt){
    	$scope.templatemodal=txt;
    }
    $scope.showAddDialog = function () {
        $scope.operation = "save";
        $scope.remindMessage = "";
        $scope.containRole = false;
        $scope.templete_Info = {};
        $scope.templete_Info.tempStatus = true;
        //$scope.templete_Info.status = 0;
        $scope.templete_Info.fields = [
            {name: "", label: "", type: "int"}
        ];
        $('#myModal').modal("show");
    };

    $scope.submitemail = function () {
        //console.log($scope.templete_Info);
        $http.post('/newoa/EmailTemplate/addEmailTemplate', $scope.templete_Info)
            .success(function (result) {
                $scope.EmailTemplateinit();
            }).error(function () {
            $scope.errorMessage = "System error !"
        })

    };
    $scope.showTemplate=function(emailtemplateinfo){
        $scope.templateinfoshow=emailtemplateinfo;
    }
    $scope.updateEmailTemplate=function(templateinfodata){
        $http.post('/newoa/EmailTemplate/updateEmailTemplate', templateinfodata).success(function (redata) {
            $scope.EmailTemplateinit();
        });
    }

    $scope.deleteEmailTemplateData = function (templatedeletedata) {
        $http.post('/newoa/EmailTemplate/deleteEmailTemplate', templatedeletedata).success(
            function (redata) {
                $scope.EmailTemplateinit();
            });
    }

});






