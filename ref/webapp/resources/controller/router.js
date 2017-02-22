var app = angular.module('newOAModule', ['ngAnimate', 'ui.bootstrap', 'ui.router', 'ui.tinymce', 'ui.bootstrap.contextMenu','flow']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
	    .state('home', {
	        url: '/',
	        templateUrl: 'html/basic/summaryReport.html'
	    })
        .state('employeeInfo', {
            url: '/employeeInfo',
            templateUrl: 'html/hr/employeeInfo.html'
        })
       .state('help', {
            url: '/help',
            templateUrl: 'html/basic/help.html'
        })      
        .state('certificate', {
            url: '/certificate',
            templateUrl: 'html/basic/certificate/certificate.html'
        })
        .state('certificateInfo', {
            url: '/certificateInfo',
            templateUrl: 'html/basic/certificate/certificateInfo.html'
        })
        .state('certificateList', {
        	url: '/certificateList',
        	templateUrl: 'html/basic/certificate/certificateList.html'
        })
        .state('leave', {
            url: '/leave',
            templateUrl: 'html/basic/leave/leaveApplication.html'
        })
         .state('dimissionApplication', {
            url: '/dimissionApplication',
            templateUrl: 'html/basic/dimission/newOADimission.html'
        }) 
        .state('dimissionApplicationStatus', {
            url: '/dimissionApplicationStatus',
            templateUrl: 'html/basic/dimission/dimissionApplicationStatus.html'
        })
         .state('dimissionApplicationApprove', {
            url: '/dimissionApplicationApprove',
            templateUrl: 'html/basic/dimission/dimissionApplicationApprove.html'
        })
         .state('dimissionHRReview', {
            url: '/dimissionHRreview',
            templateUrl: 'html/hr/dimissionHRReview.html'
        })
        .state('leaveList', {
            url: '/leave/leaveList',
            templateUrl: 'html/basic/leave/leaveApplicationList.html'
        })
        .state('approveApp', {
            url: '/leave/approvelist',
            templateUrl: 'html/basic/leave/approveLeaveApplication.html'
        })
          .state('lockerApplication', {
             url: '/locker/apply',
             templateUrl: 'html/basic/locker/lockerApplication.html'
         })   
          .state('lockerQuery', {
             url: '/locker/todo',
             templateUrl: 'html/basic/locker/lockerApproveList.html'
         })
        
         .state('lockerAppList', {
             url: '/locker/history',
             templateUrl: 'html/basic/locker/lockerAppList.html'
         })
        
          .state('lockerManagement', {
             url: '/locker/lockerManagement',
             templateUrl: 'html/basic/locker/lockerManagement.html'
         })
        .state('accessCardInfo',{
            url: '/accessCard/info',
            templateUrl: 'html/basic/accessCard/accessCard.html'
        })
        .state('accessCardManagement',{
            url: '/accessCard/management',
            templateUrl: 'html/basic/accessCard/accessManagement.html'
        })
        .state('traningInfo', {
            url: '/traningInfo',
            templateUrl: 'html/traningInfo.html'
        })
        .state('searchEmployeeInfo', {
            url: '/searchEmployeeInfo',
            templateUrl: 'html/hr/searchEmployeeInfo.html'
        })
        .state('EmailTemplateManagement', {
            url: '/EmailTemplateManagement',
            templateUrl: 'html/hr/EmailTemplateManagement.html'
        })
        .state('FreshTrainingCategory', {
            url: '/FreshTrainingCategory',
            templateUrl: 'html/hr/FreshTrainingCategory.html'
        })
        .state('Attachment', {
            url: '/Attachment',
            templateUrl: 'html/basic/attachment.html'
        })
});
app.config(['flowFactoryProvider',function(flowFactoryProvider){
	flowFactoryProvider.defaults = {
	        target: '/upload',
	        permanentErrors:[404, 500, 501]
	    };
	
}]);