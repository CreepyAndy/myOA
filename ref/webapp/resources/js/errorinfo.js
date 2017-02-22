document.write('<link rel="stylesheet" href="/newoa/resources/css/errorinfo.css" type="text/css" />');
$("body").append(
	"<div class=\"dialog_error_alert\" style=\"display:none\">"+
		"<div class=\"dialog_mask\"></div>"+
		"<div class=\"dialog_error_dialog\">"+
			"<div class=\"dialog_error_hd\">"+
				"<strong class=\"dialog_error_title\">Notice</strong>"+
			"</div>"+
			"<div class=\"dialog_error_bd\"></div>"+
			"<div class=\"dialog_error_ft\">"+
			"<a href=\"javascript:;\" class=\"dialog_error_btn primary\" onclick=\"hide_dialog_error()\">OK</a>"+
			"</div>"+
		"</div>"+
	"</div>"
);

function show_dialog_error() {
	$(".dialog_error_alert").show();
}
function hide_dialog_error() {
	$(".dialog_error_alert").hide();
}
function change_dialog_error(title){
	$(".dialog_error_title").html(title);
}
$("body").append(
	"<div class=\"dialog_success_alert\" style=\"display:none\">"+
        "<div class=\"dialog_mask\"></div>"+
           "<div class=\"dialog_toast\"> <i class=\"dialog_success_icon\"></i>"+
                "<p class=\"dialog_success_content\">Success</p>"+
           "</div>"+
    "</div>"
)
function show_dialog_success() {
	$(".dialog_success_alert").show();
}
function show_dialog_success_time(time) {
    $(".dialog_success_alert").show();
    setTimeOut("$(\".dialog_success_alert\").hide();",time);
}
function hide_dialog_success() {
	$(".dialog_success_alert").hide();
}
$("body").append(
	"<div class=\"dialog_loading_toast\" style=\"display:none\">"+
                "<div class=\"dialog_mask\"></div>"+
                "<div class=\"dialog_toast\">"+
                    "<div class=\"dialog_loading\" id=\"leafs\">"+
                        "<div class=\"dialog_loading_leaf_0 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_1 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_2 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_3 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_4 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_5 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_6 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_7 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_8 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_9 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_10 dialog_loading_leaf\" ></div>"+
                        "<div class=\"dialog_loading_leaf_11 dialog_loading_leaf\" ></div>"+
            "</div>"+
            "<p class=\"dialog_toast_content\">Loading</p>"+
        "</div>"+
    "</div>"
)
function show_dialog_loading() {
 	$(".dialog_loading_toast").show();
}
function hide_dialog_loading() {
	$(".dialog_loading_toast").hide();
}