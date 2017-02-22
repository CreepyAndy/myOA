app.controller("sumarryReportController", function ($scope, $http, $filter) {
	
	$scope.getSummaryReport = function()
	{
		$scope.getSummaryReportError="";
		show_dialog_loading();
		$http.post('getSummaryReport',$scope.name)
			.success(function(redata){
				$scope.summaryReport=redata;
				hide_dialog_loading();
			}).error(function(redata){
				$scope.getSummaryReportError="system error!";
			hide_dialog_loading();
			})

	}
	
	$scope.getSummaryReport();
});