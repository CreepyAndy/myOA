$(document).ready(function(){
	if($("#status").text()=="R1"){
		var s =document.createElement("script");
				s.type = "text/javascript";
				s.src = "/wechat/resources/js/roundmove1.js"
					$("body").append(s);
		var alleditandsave = "<button type='button' class='btn btn-warning' data-ng-click='AllEdit()'style='padding: 5px 12px;' data-toggle='modal' data-target='#myModal3'>All Edit</button><button type='button' class='btn btn-warning' data-ng-click='save()'style='padding: 5px 12px;' data-toggle='modal'data-target='#myModal3'>Save</button>"
		$("#botton").append(alleditandsave);
		var th1 = "<th style='width: 20px'>Rs1</th>"
//			alert("th1 have")
			$("#r1").html(th1)
		var td1 = "<td ><input type='text' style='width: 50px' id='txt_name_{{item.nationalId}}{{item.applyId}}' class='RS2' data-ng-change='datachange()'  data-ng-model='item.round1Score' readonly /></td>";
//			alert("td1 have")
			$("#rS1").html(td1)
	}
	if($("#status").text()=="R2"){
		var s =document.createElement("script");
			s.type = "text/javascript";
			s.src = "http://localhost:8080/wechat/resources/js/roundmove2.js"
				$("body").append(s);
		var alleditandsave = "<button type='button' class='btn btn-warning' data-ng-click='AllEdit()'style='padding: 5px 12px;' data-toggle='modal' data-target='#myModal3'>All Edit</button><button type='button' class='btn btn-warning' data-ng-click='save()'style='padding: 5px 12px;' data-toggle='modal'data-target='#myModal3'>Save</button>"
				$("#botton").append(alleditandsave);
		var th1 = "<th style='width: 20px'>Rs1</th>"
			$("#r1").html(th1)
		var th2 = "<th style='width: 20px'>Rs2</th>"
			$("#r2").html(th2)
		var td1 = "<td data-ng-bind='item.round1Score'></td>"
			$("#rS1").html(td1)
		var td2 = "<td ><input type='text' style='width: 50px' id='txt_name_{{item.nationalId}}{{item.applyId}}' class='RS2' data-ng-change='datachange()'  data-ng-model='item.round2Score' readonly /></td>";
			$("#rS2").html(td2)
	}
	if($("#status").text()=="R3"){
		var s =document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://localhost:8080/wechat/resources/js/roundmove3.js"
			$("body").append(s);
		var alleditandsave = "<button type='button' class='btn btn-warning' data-ng-click='AllEdit()'style='padding: 5px 12px;' data-toggle='modal' data-target='#myModal3'>All Edit</button><button type='button' class='btn btn-warning' data-ng-click='save()'style='padding: 5px 12px;' data-toggle='modal'data-target='#myModal3'>Save</button>"
			$("#botton").append(alleditandsave);
		var th1 = "<th style='width: 20px'>Rs1</th>"
			$("#r1").html(th1)
		var th2 = "<th style='width: 20px'>Rs2</th>"
			$("#r2").html(th2)
		var th3 = "<th style='width: 20px'>Rs3</th>"
			$("#r3").html(th3)	
		var td1 = "<td data-ng-bind='item.round1Score'></td>"
			$("#rS1").html(td1)
		var td2 = "<td data-ng-bind='item.round2Score'></td>"
			$("#rS2").html(td2)
		var td3 = "<td ><input type='text' style='width: 50px' id='txt_name_{{item.nationalId}}{{item.applyId}}' class='RS2' data-ng-change='datachange()'  data-ng-model='item.round3Score' readonly /></td>";
			$("#rS3").html(td3)	
	}
	if($("#status").text()=="pass"){
		var s =document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://localhost:8080/wechat/resources/js/roundmovep.js"
			$("body").append(s);
		var th1 = "<th style='width: 20px'>Rs1</th>"
			$("#r1").html(th1)
		var th2 = "<th style='width: 20px'>Rs2</th>"
			$("#r2").html(th2)
		var th3 = "<th style='width: 20px'>Rs3</th>"
			$("#r3").html(th3)	
		var td1 = "<td data-ng-bind='item.round1Score'></td>"
			$("#rS1").html(td1)
		var td2 = "<td data-ng-bind='item.round2Score'></td>"
			$("#rS2").html(td2)
		var td3 = "<td data-ng-bind='item.round3Score'></td>"
			$("#rS3").html(td3)
	}
	if($("#status").text()=="read"){
		var s =document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://localhost:8080/wechat/resources/js/roundmover.js"
			$("body").append(s);
	}
	if($("#status").text()=="unread"){
		var s =document.createElement("script");
		s.type = "text/javascript";
		s.src = "http://localhost:8080/wechat/resources/js/roundmovenr.js"
			$("body").append(s);
	}
});