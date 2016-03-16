/**
 * Created by Administrator on 2016/3/2.
 */
var url = "./interface";

$.ajaxSetup({
    cache: true
});
var session = {
	    sessionId:null,
	    user:{},
	    userType:null,
	    currentPage:0
	    };
function sendAction(action, callback, method, hideLoading, async, timeout) {
    if (async !== false) {
        async = true;
    }
    var loading_span = $(".loading_indicator_span")
    var loading_indicator = $(".loading_indicator")
    if (session.id) {
        if (!hideLoading) {
            loading_span.css("visibility", "visible");
            loading_indicator.css("visibility", "visible");
        }
        action.sessionId = session.id;
        action.action_id = Math.random();
        action.data = $.toJSON(action.data) || $.toJSON({
                idle: ""
            });
        if (!method) {
            method = "post";
        }
        if (method && method == "post") {
            sendPostCommand(action, function (response) {
                loading_span.css("visibility", "hidden");
                loading_indicator.css("visibility", "hidden");
                callback(response);
            }, function () {
                loading_span.css("visibility", "hidden");
                loading_indicator.css("visibility", "hidden");
                callback({
                    succeed: false
                });
            }, async, timeout,'./action');
        } else {
            sendCommand(action, function (response) {
                loading_span.css("visibility", "hidden");
                loading_indicator.css("visibility", "hidden");
                callback(response);
            }, function () {
                loading_span.css("visibility", "hidden");
                loading_indicator.css("visibility", "hidden");
                callback({
                    succeed: false
                });
            }, async, timeout);
        }
    } else {
        alert("还未登陆, 不能发送请求");
    }
}
function sendPostCommand(command, callback, errorCallback, async, timeout,url) {
    var time = 20000;
    if (timeout) {
        time = timeout
    }
    $.ajax({
        type: "POST",
        url: url,
        async: async,
        data: command,
        timeout: time,
        dataType: "json",
        success: function (data) {
            if (typeof callback == "function") {
                callback(data);
            }
            if (data && !data.Succeed && data.SessionTimeout == 1) {
                alert("会话已经失效，请您重新登录");
                window.location.href = "./";
                return;
            }
        },
        error: function (xhr, status, error) {
            if (errorCallback && (typeof errorCallback == "function")) {
                errorCallback(xhr, status, error);
            } else {
                if (xhr.statusText != 'success') {
                    $().toastmessage('showErrorToast', '请求超时或网络问题,' + status || error);
                }
            }
        }
    });
}

function sendCommand(sendUrl, command, callback, errorCallback, async, timeout) {
    var time = 20000;
    if (timeout) {
        time = timeout
    }
    if ($.type(sendUrl) !== "string") {
        async = errorCallback;
        errorCallback = callback;
        callback = command;
        command = sendUrl;
        sendUrl = url;
    }
    $.ajax({
        type: "GET",
        url: sendUrl,
        async: async,
        data: command,
        timeout: time,
        dataType: "jsonp",
        jsonp: "callback",
        success: function (data, status) {
            if (typeof callback == "function") {
                callback(data);
            }
            if (data && !data.Succeed && data.SessionTimeout == 1) {
                alert("�Ự�Ѿ�ʧЧ���������µ�¼");
                window.location.href = "./";
                return;
            }
        },
        error: function (xhr, status, error) {
            if (errorCallback && (typeof errorCallback == "function")) {
                errorCallback(xhr, status, error);
            } else {
                if (xhr.statusText != 'success') {
                    $().toastmessage('showErrorToast', '����ʱ����������,' + status || error);
                }
            }
        }
    });
}