/**
 * Created by Administrator on 2016/3/2.
 */
var url = "./action";

$.ajaxSetup({
    cache: true
});
var session = {
    logined: false,
    currentPage: {},
    customer: {},
    addCustomerView: null,
    customerView: null,
    searchCustomerView: null,
    loadingCustomerView: null,
    notifyPage: false,
    pageStatus: {},
    cacheErrorType: {}
};
function init() {
    //updateView();
    //resize();
    //
    //$(window).resize(function () {
    //    resize();
    //});
    //
    //$("#login").live("click", function (e) {
    //    _login();
    //});
    //$("#logoff").live("click", function (e) {
    //    _logoff();
    //});
    //$(".jspScrollable").each(function () {
    //    _initScroll($(this));
    //});
    //_initClickHandler();
    //
    //init2();
    //
    //checkLoginStatus();
}
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
        alert("��δ��½, ���ܷ�������");
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