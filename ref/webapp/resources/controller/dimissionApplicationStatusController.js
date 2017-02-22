app.controller('dimissionApplicationStatusController',function($scope, $http, $filter, $rootScope) {
	$scope.application={};
	$scope.check=function(data){
		alert(data.appTime);
	}
});