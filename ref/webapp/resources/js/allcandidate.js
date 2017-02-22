var myModule = angular.module("index", []);

myModule.controller('indexController', function($scope, $http) {
	$http({
		method : 'GET',
		url : 'http://localhost:8080/wechat/selectallcandidate?order=Reverse'
	}).success(function(data, status, headers, config) {
		console.log("success...");
		$scope.items = data;
	}).error(function(data, status, headers, config) {
		console.log("error...");
	});
	
	$scope.sort = '';
    $scope.selections =['Normal','Reverse','Disorder'];
    $scope.select = function(){
    	var sort=$scope.sort;
    	var postData = {text:'long blob of text'};
    	var config = {params: {order:sort}};
    	$http.post('http://localhost:8080/wechat/selectallcandidate', postData, config
    	).success(function(data, status, headers, config) {
    		$scope.items = data;
    	}).error(function(data, status, headers, config) {
    		alert("error");
    	});
    }
    
    $scope.disorder = function(){
    	$http({
    		method : 'GET',
    		url : 'http://localhost:8080/wechat/selectallcandidate?order=Disorder'
    	}).success(function(data, status, headers, config) {
    		$scope.items = data;
    	}).error(function(data, status, headers, config) {
    	});
    }
    
    
});

