app.controller('trainingRecordController',function($scope,$http) {
	 var recordUrl = "/newoa/training/all";
	 show_dialog_loading();
	 $http.post(recordUrl)
	 .success(function(data) {
		 //console.log("Get all training records successfully:");
		 $scope.allTrainingRecord = data;
		 hide_dialog_loading();
	 }).error(function() {
		 //console.log("Fail to get all training records.");
	 })
	 
	 $scope.editCompleted = function(record) {
		 record.completed = !record.completed;
		 var saveUrl = "/newoa/training/save";
		 $http.post(saveUrl,record)
		 .success(function() {
			 //console.log("Change the record status successfully!");
		 }).error(function() {
			 //console.log("Fail to change the record status.");
		 })
	 }
});