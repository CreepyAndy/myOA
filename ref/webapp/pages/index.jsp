<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html ng-app="newOAModule">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="resources/images/icon/favicon.ico">
    <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
    <link rel='stylesheet' type="text/css" href="resources/css/font.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/bootstrap-select.min.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/bootstrap-datetimepicker.min.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/bootstrap-datepicker3.min.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/candidate.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/weui.min.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/roundmove.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/report.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/style_email.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/importExcelDropify.min.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/stylesheet.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/github-light.css"/>
    <link rel='stylesheet' type="text/css" href="resources/css/select2.min.css"/>
    <script>
        var name = "<sec:authentication property="name" htmlEscape="false"/>"
    </script>
    <!-- the old js from wechat -->
    <script type="text/javascript" src="resources/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="resources/js/bootstrap-select.min.js"></script>
    <script type="text/javascript" src="resources/js/tinymce-dist/tinymce.js"></script>
    <script type="text/javascript" src="resources/js/angular.min.js"></script>
    <script type="text/javascript" src="resources/js/jquery.nicescroll.js"></script>
    <script type="text/javascript" src="resources/js/angular-animate.js"></script>
    <script type="text/javascript" src="resources/js/ui-bootstrap-tpls-1.3.3.min.js"></script>
    <script type="text/javascript" src="resources/js/angular-ui-router.js"></script>
    <script type="text/javascript" src="resources/js/prettify.min.js"></script>
    <script type="text/javascript" src="resources/js/multiselect.min.js"></script>
    <script type="text/javascript" src="resources/js/multiselect.js"></script>
    <script type="text/javascript" src="resources/js/jquery.jqprint.js"></script>
    <script type="text/javascript" src="resources/js/jquery-migrate.js"></script>
    <script type="text/javascript" src="resources/js/tinymce.js"></script>
    <script type="text/javascript" src="resources/js/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="resources/js/bootstrap-datepicker.min.js"></script>
    <script type="text/javascript" src="resources/js/select2.min.js"></script>
    <script type="text/javascript" src="resources/js/ng-flow-standalone.min.js"></script>

    <script type="text/javascript" src="resources/js/dropify.min.js"></script>
    <script type="text/javascript" src="resources/js/ui-bootstrap-tpls-1.3.3.min.js"></script>
    <script type="text/javascript" src="resources/js/elastic.js"></script>
    <script type="text/javascript" src="resources/js/contextMenu.js"></script>
    <script type="text/javascript" src="resources/js/angular-route.min.js"></script>
    <!-- Controller for new OA-->
    <script type="text/javascript" src="resources/controller/router.js"></script>
    <script type="text/javascript" src="resources/controller/unique.js"></script>

    <script type="text/javascript" src="resources/controller/newOAController.js"></script>
    <script type="text/javascript" src="resources/controller/employeeInfoController.js"></script>
    <script type="text/javascript" src="resources/controller/certificateController.js"></script>
    <script type="text/javascript" src="resources/controller/dimissionApplicationController.js"></script>
    <script type="text/javascript" src="resources/controller/dimissionApplicationStatusController.js"></script>
    <script type="text/javascript" src="resources/controller/dimissionHRReviewController.js"></script>
    <script type="text/javascript" src="resources/controller/dimissionApplicationApproveController.js"></script>
    <script type="text/javascript" src="resources/controller/leaveApplicationController.js"></script>
    <script type="text/javascript" src="resources/controller/lockerApplicationController.js"></script>
    <script type="text/javascript" src="resources/controller/lockerApproveListController.js"></script>
    <script type="text/javascript" src="resources/controller/lockerAppHistoryController.js"></script>
    <script type="text/javascript" src="resources/controller/lockerManagementController.js"></script>
    <script type="text/javascript" src="resources/controller/trainingRecordController.js"></script>
    <script type="text/javascript" src="resources/controller/searchEmployeeInfoController.js"></script>
    <script type="text/javascript" src="resources/controller/EmailTemplateManagementController.js"></script>
    <script type="text/javascript" src="resources/controller/FreshTrainingCategoryController.js"></script>
    <script type="text/javascript" src="resources/controller/attachmentController.js"></script>
    <script type="text/javascript" src="resources/controller/summaryReportController.js"></script>
    <script type="text/javascript" src="resources/controller/accessCardController.js"></script>
    <script type="text/javascript" src="resources/controller/accessManagementController.js"></script>


    <script type="text/javascript">
        // side-menu scroller
        $(function () {
            $('#menu').niceScroll({
                cursorcolor: '#ccc',
                railalign: 'right',
                cursorborder: "none",
                horizrailenabled: false,
                zindex: 2001,
                cursoropacitymax: 1,
                // autohidemode:'false',
                spacebarenabled: false
            });
            $(window).bind("resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });
            $('.navbar-toggle').on('click', function () {
                if ($('#menu.hidden-xs').length) {
                    $('#menu').removeClass('hidden-xs');
                } else {
                    $('#menu').addClass('hidden-xs');
                }
            });
        });
        var config = {
            params: {
                source: 'HRAddCandidate'
            }
        };
    </script>
    <title>new oa</title>
</head>
<body ng-controller="newOAController">
<script type="text/javascript" src="resources/js/errorinfo.js"></script>
<input id="userGuid" value="${user.adName}" type="hidden">
<input id="authority" value="${authority}" type="hidden">
<input id="userOnboardDate" value="${user.gdcStartDate}" type="hidden">
<input id="userDomain" value="${user.supportingTeamName}" type="hidden">
<input id="userOMGuid" value="${user.operationManagerGuid}" type="hidden">
<input id="userJobLevel" value="${user.jobTitle}" type="hidden">
<input id="gmGuid" value="${GM.adName}" type="hidden">
<input id=hrmGuid value="${HRM.adName}" type="hidden">
<div class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle pull-left" data-toggle="collapse" data-target=".sidebar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand">
            <img src="resources/images/logo.png">
            <span class="">New OA</span>
        </a>
    </div>
</div>
<!-- side-nav -->
<div class="side-content">
    <nav nav-focus id="menu" class="navbar-default navbar-fixed-side side_menu" role="navigation">
        <div class="sidebar-collapse collapse in">
            <ul class="nav" id="side-menu">
                <li class="sidebar-user">
                    <div class="user-info">
                        <div class="user-name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${user.emplName}
                        </div>
                        <p class="manager-hyperlink" ui-sref="newhr">${user.jobTitle}</p>
                    </div>
                </li>
                <li ui-sref-active="on" id="summary">
                    <a ui-sref="home">
                        <i class="glyphicon glyphicon-home" aria-hidden="true"></i> Home
                    </a>
                </li>
                <li class="active">
                    <a href="javascript:;" ng-click="toggleGeneral()" data-target="#General" data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i> General
                        <i class="fa fa-angle-right angle-right" ng-if="!showGeneral"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showGeneral"></i>
                    </a>
                    <ul id="General" class="nav nav-second-level collapse">
                        <li ui-sref-active="on" id="ITTool">
                            <a ng-click="refToIT()">
                                <i class="fa fa-angle-right fa-fw"></i> IT Tool Equipment
                            </a>
                        </li>
                        <li ui-sref-active="on" id="library">
                            <a ng-href="http://chinagdc.mso.net/BookLibrary/">
                                <i class="fa fa-angle-right fa-fw"></i> Library
                            </a>
                        </li>
                        <li ui-sref-active="on" id="meeting room">
                            <a ng-href="http://chinagdc.mso.net/MeetingRoom/#/home">
                                <i class="fa fa-angle-right fa-fw"></i> Meeting Room
                            </a>
                        </li>
                        <li ui-sref-active="on" id="holiday">
                            <a ng-href="http://chinagdc.mso.net:8080/oa2">
                                <i class="fa fa-angle-right fa-fw"></i> Holiday Configuration
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="active" ng-if="'${authority}'.indexOf('NewOA HR Admin') != -1">
                    <a href="javascript:;" ng-click="toggleEmployee()" data-target="#employeeInfo"
                       data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i> Employee Information
                        <i class="fa fa-angle-right angle-right" ng-if="!showEmployee"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showEmployee"></i>
                    </a>
                    <ul id="employeeInfo" class="nav nav-second-level collapse">
                        <li ui-sref-active="on">
                            <a ui-sref="employeeInfo" ng-if="'${authority}'.indexOf('NewOA HR Admin') != -1">
                                <i class="fa fa-angle-right fa-fw"></i>Import
                            </a>
                        </li>
                        <li ui-sref-active="on" id="searchEmployeeInfo">
                            <a ui-sref="searchEmployeeInfo">
                                <i class="fa fa-angle-right fa-fw"></i>Details
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="">
                    <a href="javascript:;" ng-click="toggleDimission()" data-target="#dimission" data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i>
                        Termination
                        <i class="fa fa-angle-right angle-right" ng-if="!showDimission"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showDimission"></i>
                    </a>
                    <ul id="dimission" class="nav nav-second-level collapse">
                        <li ui-sref-active="on">
                            <a ui-sref="dimissionApplication">
                                <i class="fa fa-angle-right fa-fw"></i> Termination Request
                            </a>
                        </li>
                        <li ui-sref-active="on">
                            <a ui-sref="dimissionApplicationApprove" ng-click="dimissionGetApplication()">
                                <i class="fa fa-angle-right fa-fw"></i> Pending for Approval
                            </a>
                        </li>
                        <li ui-sref-active="on" ng-show="'${authority}'.indexOf('NewOA HR Admin') != -1">
                            <a ui-sref="dimissionHRReview" ng-click="dimissionHRReview()">
                                <i class="fa fa-angle-right fa-fw"></i> Archive
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="">
                    <a href="javascript:;" ng-click="toggleLeave()" data-target="#leave" data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i> Leave
                        <i class="fa fa-angle-right angle-right" ng-if="!showLeave"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showLeave"></i>
                    </a>
                    <ul id="leave" class="nav nav-second-level collapse">
                        <li ui-sref-active="off" id="leave">
                            <a ui-sref="leave" ng-click="leaveApp()">
                                <i class="fa fa-angle-right fa-fw"></i> Application
                            </a>
                        </li>
                        <li ui-sref-active="off" id="approveApp">
                            <a ui-sref="approveApp" ng-click="queryApproveLeaveList()">
                                <i class="fa fa-angle-right fa-fw"></i> Pending for Approval
                            </a>
                        </li>
                        <li ui-sref-active="off" id="leaveList">
                            <a ui-sref="leaveList" ng-click="queryLeaveList()">
                                <i class="fa fa-angle-right fa-fw"></i> History
                            </a>
                        </li>
                        <%--<li ui-sref-active="off" id="leaveListForHRAdmin" ng-show="'${authority}'.indexOf('HR Admin') != -1">
                            <a ui-sref="leaveList" ng-click="queryLeaveListForHRAdmin()">
                                <i class="fa fa-angle-right fa-fw"></i> History
                            </a>
                        </li>--%>
                    </ul>
                </li>
                <li class="active">
                    <a href="javascript:;" ng-click="toggleCertification()" data-target="#certification"
                       data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i> Certificate
                        <i class="fa fa-angle-right angle-right" ng-if="!showCertification"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showCertification"></i>
                    </a>
                    <ul id="certification" class="nav nav-second-level collapse">
                        <li ui-sref-active="off" id="certificate">
                            <a ui-sref="certificate">
                                <i class="fa fa-angle-right fa-fw"></i> Application
                            </a>
                        </li>
                        <li ui-sref-active="off" id="certificateInfo">
                            <a ui-sref="certificateInfo">
                                <i class="fa fa-angle-right fa-fw"></i> Pending for Approval
                            </a>
                        </li>
                        <li ui-sref-active="off"
                            id="certificateList" <%--ng-show="'${authority}'.indexOf('NewOA HR Admin') != -1"--%>>
                            <a ui-sref="certificateList">
                                <i class="fa fa-angle-right fa-fw"></i> Archive
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="active">
                    <a href="javascript:;" ng-click="toggleLocker()" data-target="#locker" data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i> Locker
                        <i class="fa fa-angle-right angle-right" ng-if="!showLeave"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showLeave"></i>
                    </a>
                    <ul id="locker" class="nav nav-second-level collapse">
                        <li ui-sref-active="off" id="lockerApplication">
                            <a ui-sref="lockerApplication">
                                <i class="fa fa-angle-right fa-fw"></i> Apply
                            </a>
                        </li>
                        <li ui-sref-active="off" id="lockerQuery">
                            <a ui-sref="lockerQuery">
                                <i class="fa fa-angle-right fa-fw"></i> Approve
                            </a>
                        </li>
                        <li ui-sref-active="off" id="lockerAppList">
                            <a ui-sref="lockerAppList" ng-click="lockerAdmin()">
                                <i class="fa fa-angle-right fa-fw"></i> List
                            </a>
                        </li>
                        <li ui-sref-active="off" id="lockerManagement">
                            <a ui-sref="lockerManagement" ng-show="'${authority}'.indexOf('HR Admin') != -1">
                                <i class="fa fa-angle-right fa-fw"></i> Locker Manager
                                </a>
                           </li>
                    </ul>
                </li>

                <li class="active">
                    <a href="javascript:;" ng-click="toggleAccessCard()" data-target="#accessCard" data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i> Access Card
                        <i class="fa fa-angle-right angle-right" ng-if="!showAccessCard"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showAccessCard"></i>
                    </a>
                    <ul id="accessCard" class="nav nav-second-level collapse">
                        <li ui-sref-active="off" id="accessCardInfo">
                            <a ui-sref="accessCardInfo">
                                <i class="fa fa-angle-right fa-fw"></i> Info
                            </a>
                        </li>
                        <li ui-sref-active="off" id="accessCardManagement" ng-show="isHr">
                            <a ui-sref="accessCardManagement">
                                <i class="fa fa-angle-right fa-fw"></i> Management
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="active"
                    ng-show="'${authority}'.indexOf('Train Admin') != -1 || '${authority}'.indexOf('NewOA HR Admin') != -1">
                    <a href="javascript:;" ng-click="toggleSettings()" data-target="#Settings" data-toggle="collapse">
                        <i class="fa fa-bars fa-fw"></i> Settings
                        <i class="fa fa-angle-right angle-right" ng-if="!showSettings"></i>
                        <i class="fa fa-angle-down angle-down" ng-if="showSettings"></i>
                    </a>
                    <ul id="Settings" class="nav nav-second-level collapse">
                        <li ui-sref-active="on" id="EmailTemplateManagement">
                            <a ui-sref="EmailTemplateManagement"
                               ng-show="'${authority}'.indexOf('NewOA HR Admin') != -1">
                                <i class="fa fa-angle-right fa-fw"></i> Email Template
                            </a>
                        </li>
                        <li ui-sref-active="on" id="traningInfo" ng-show="'${authority}'.indexOf('Train Admin') != -1">
                            <a ui-sref="traningInfo">
                                <i class="fa fa-angle-right fa-fw"></i> Traning Information
                            </a>
                        </li>
                        <li ui-sref-active="on" id="FreshTrainingCategory"
                            ng-show="'${authority}'.indexOf('Train Admin') != -1">
                            <a ui-sref="FreshTrainingCategory">
                                <i class="fa fa-angle-right fa-fw"></i> Training Category
                            </a>
                        </li>

                    </ul>
                </li>
                <li ui-sref-active="on" id="attachment">
                    <a ui-sref="Attachment" ng-click="getAllFiles()">
                        <i class="fa fa-file" aria-hidden="true"></i> Attachment
                    </a>
                </li>
                <li ui-sref-active="on" id="help">
                    <a ui-sref="help">
                        <i class="fa fa-question-circle-o" aria-hidden="true"></i> Help
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</div>
<!--  Right Content -->
<div class="content" ui-view></div>
</body>

</html>
