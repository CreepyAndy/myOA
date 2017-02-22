app.controller('FreshTrainingCategoryController', function ($scope, $http) {

    /**
     * initial function
     */
    $scope.FreshTrainingCategoryinit = function () {
        $('#myModal').modal("hide");
        $scope.trainingcategory_Info = {};
        $scope.getTrainingError="";
        //query
        $http.post('/newoa/FreshTrainingCategory/FreshTrainingCategoryManagement')
            .success(function (data) {
            $scope.TrainingCategorylist = data;
            hide_dialog_loading();
            //console.log(data);
            }).error(function(redata){
            $scope.getTrainingError="System Error!";
        });
    }
  /*  $scope.TemplateShow=function(code){
        var TemplateModule;
        $scope.traingingmodule.forEach(function(moduleCode){
            if(moduleCode.value==code){
                TemplateModule=moduleCode.label;
            }
        });
        return TemplateModule;
    }*/
    $scope.showTrainingCategoryAdd = function () {
        $scope.operation = "save";
        $scope.remindMessage = "";
        $scope.containRole = false;
        $scope.trainingcategory_Info = {};
        //$scope.trainingcategory_Info.tempStatus = true;
        $scope.trainingcategory_Info.fields = [
            {name: "", label: "", type: "int"}
        ];
        $('#myModal').modal("show");
    };

    $scope.submittrainingcategory = function () {
        //console.log($scope.trainingcategory_Info);
        $http.post('/newoa/FreshTrainingCategory/addFreshTrainingCategory', $scope.trainingcategory_Info)
            .success(function (result) {
                $scope.FreshTrainingCategoryinit();
            }).error(function () {
            $scope.getTrainingError = "System error !"
        })
    };
    $scope.showCategory=function(trainingdata){
        $scope.Categoryselected=trainingdata;
        $scope.Categoryselected.remindTemplateId=$scope.Categoryselected.remindTemplateId.toString();
        $scope.Categoryselected.dueDaysTemplateId=$scope.Categoryselected.dueDaysTemplateId.toString();
    }
    $scope.deleteCategoryData = function (trainingdata) {
        $http.post('/newoa/FreshTrainingCategory/deleteFreshTrainingCategory', trainingdata)
            .success(function (redata) {
                $scope.FreshTrainingCategoryinit();
            }).error(function(redata){
            $scope.getTrainingError="System Error!";
        });
    }
    $scope.updateCategoryData=function(trainingdata){
        $http.post('/newoa/FreshTrainingCategory/updateFreshTrainingCategory', trainingdata)
            .success(function (redata) {
            $scope.FreshTrainingCategoryinit();
            }).error(function(redata){
            $scope.getTrainingError="System Error!";
        });
    }
    $scope.emailTemplatesearch = function (data) {
        $http.post('/newoa/EmailTemplate/EmailTemplateManagement')
            .success(function (data) {
            $scope.emailTemplatelist = data;
            //console.log(data);
            }).error(function(redata){
            $scope.getTrainingError="System Error!";
        });
    }
    $scope.emailTemplatesearch();
});






