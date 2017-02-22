app.controller('hrManager',
	function($scope, $http) {

		initialUserInfo = function() {
			$scope.user.userName = "";
			$scope.user.password = "";
			$scope.confirmpw = "";
			$scope.showpw = false;
			$scope.showconfirm = false;
		}

		$http.get('forHrm/getUser').success(
			function(data, status, headers, config) {
				$scope.userRoles = data;
			}).error(function(data, status, headers, config) {
			console.log("error...");
		});

		$scope.addNewUser = function(user) {
			$http.post('forHrm/addNewUser', user).success(function(data) {
				$scope.userRoles = data;
				console.log(data);
			}).error(function(data, status, headers, config) {
				console.log("error...");
			});

		};

		$scope.checkHrmFlag = function(userRole) {
			userRole.hrFlag = userRole.hrmFlag ? true : userRole.hrFlag;
		}

		$scope.checkHrFlag = function(userRole) {
			userRole.hrmFlag = userRole.hrFlag ? userRole.hrmFlag : false;
		}

		$scope.updateAuthority = function(userRoles) {
			$http.post('forHrm/updateAuthority', userRoles).success(
				function(data) {
					$('#myModal4').modal({
						keyboard: true
					});
					$scope.userRoles = data;
					console.log(data);
				}).error(function(data, status, headers, config) {
				console.log("error...");
			});
		};

		$scope.checkName = function() {
		
			var userName = $scope.user.userName;
			$scope.checkNm = true;
			$scope.showname = false;
			$scope.namestyle = {
				"border": "1px solid #a9a9a9"
			};
			/* 以字母开头，可以包含点和下划线，必须以@pwc.com结尾 */
			var reg = new RegExp("[a-zA-Z0-9_.]+@pwc.com$")
			if (!reg.exec(userName)) {
				$scope.namestyle = {
					"border": "2px solid red"
				};
				$scope.checkNm = false;
				$scope.showname = true;
			} else {
				for(var i in $scope.userRoles){
					if(userName==$scope.userRoles[i].userName){
						change_dialog_error("HR already exists!");
					  	show_dialog_error();
					  	console.log("HR already exists");
					  	$scope.checkNm = false;
					}
				}
			}
		};

		$scope.checkPassword = function() {
			var password = $scope.user.password;
			var passwordLen = $scope.user.password.length;
			var reg1 = new RegExp("[a-z]");
			var reg2 = new RegExp("[A-Z]");
			var reg3 = new RegExp("[0-9]");
			var reg4 = new RegExp("[-`~!@#$%^&*()+{}|;:'\"<,.?/>_+=]");

			/* 判断密码必须包含小写字母 */
			if (!reg1.exec(password)||!reg2.exec(password)||!reg3.exec(password)) {
				$scope.pwstyle = {
					"border": "2px solid red"
				};
				$scope.checkPw = false;
				$scope.showpw = true;
			}
			else if (!reg4.exec(password) && password.indexOf("\\") == -1 && password.indexOf("\[") == -1 && password.indexOf("\]") == -1) {
				$scope.pwstyle = {
					"border": "2px solid red"
				};
				$scope.checkPw = false;
				$scope.showpw = true;
			}
			/* 判断密码长度在8到16位 */
			else if (passwordLen < 8 || passwordLen > 16) {
				$scope.pwstyle = {
					"border": "2px solid red"
				};
				$scope.checkPw = false;
				$scope.showpw = true;
			} else {
				$scope.pwstyle = {
					"border": "1px solid #a9a9a9"
				};
				$scope.checkPw = true;
				$scope.showpw = false;

			}
		};

		$scope.confirmPw = function() {
			if ($scope.confirmpw != $scope.user.password) {
				$scope.confirmstyle = {
					"border": "2px solid red"
				}
				$scope.checkConfirm = false;
				$scope.showconfirm = true;
			} else {
				$scope.confirmstyle = {
					"border": "1px solid #a9a9a9"
				};
				$scope.checkConfirm = true;
				$scope.showconfirm = false;
			}
		};

		$scope.initAddHR = function(){
			$scope.user = {};
			$scope.user.password='';
			$scope.user.userName='';
			$scope.confirmpw = '';
			$scope.confirmstyle = {
				"border": "1px solid #a9a9a9"
			};
			$scope.pwstyle = {
				"border": "1px solid #a9a9a9"
			};
			$scope.namestyle = {
				"border": "1px solid #a9a9a9"
			};
			$scope.showconfirm = false;
			$scope.showname = false;
			$scope.showpw = false;
		}
	});