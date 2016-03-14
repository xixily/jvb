/**
 * author dengxf
 * Created by Administrator on 2016/3/2.
 */

var handler = window.handler = {
    //当菜单被选择时，对应的html文件和方法会被加载。文件名和方法名就是page的值
    monitor: {
        monitorPageSize: 10,
        cdr_peer_list: function (data) {
            var date = dateParse(new Date());
            $("#cdrPeerBeginTime").val(date + " 00:00:00");
            $("#cdrPeerEndTime").val(date + " 23:59:59");
            //$('#cdr_peer_agent_name').html(render.monitor.renderCdrPeerAgents('agents'));
            getBufferedView('/monitor/cdr_peer_list_table', function (view) {
                var monitorPane = $('#cdrPeerListTable');
                monitorPane.empty();
                monitorPane.html(view);
                var beginTime = utils.format(new Date(), 'yyyy-MM-dd') + ' 00:00:00';
                $("#cdr_peer_list_picker_start").val(beginTime);
                getBufferedView('/monitor/cdr_peer_list_item', function (itemView) {
                    var queryData = {
                        BEGIN_TIME: beginTime,
                        END_TIME: $("#cdr_peer_list_picker_end").val(),
                        pageSize: handler.monitor.monitorPageSize,
                        ACTION_TYPE: "login"
                    }
                    //name != 'admin';
                    var action = {
                        action: "app.monitor.queryCdrPeer",
                        data: queryData
                    }
                    sendAction(action, function (res) {
                        if (!res.success) {
                            console.info('Query cdr peer failure: ' + res.message);
                            return;
                        }
                        var panel = $('#cdr_peer_data');
                        panel.empty();
                        panel.append(render.monitor.renderCdrPeer(res.list));
                        $(".class_list span.cdr_peer_result_count").text(res.count);
                        var list = $(".class_list #cdr_peer_index li");
                        updatePagination(list, res.count, handler.monitor.monitorPageSize, 1);
                    });
                });
            });
        },
        // TODO 导出坐席状态日志
        exportMonitorLog: function (data) {
            var query = data;
            var action = {
                action: "app.monitor.exportMonitorLog",
                data: query
            };
            sendAction(action, function (res) {
                if (res.Succeed != true) {
                    if (res.Message == '5000') {
                        console.info('export monitorlog failure: ' + res.message);
                        utils.showError('导出数据超过5000条，请重新选择查询条件');
                    } else {
                        console.info('export monitorlog failure: ' + res.message);
                        utils.showError('导出失败！');
                    }
                    return;
                }
                downloadFile(res.path);
                utils.showSucc('导出成功！');
            });
        },
        queryCdrPeer: function (data) {
            var queryData = data;
            queryData.pageSize = handler.monitor.monitorPageSize;
            queryData.ACTION_TYPE = "login";
            //name != 'admin';
            var page = '';
            if (data.page) {
                page = data.page;
            } else {
                page = 1;
            }
            var action = {
                action: "app.monitor.queryCdrPeer",
                data: queryData
            }
            sendAction(action, function (res) {
                if (!res.success) {
                    console.info('Query cdr peer failure: ' + res.message);
                    return;
                }
                var panel = $('#cdr_peer_data');
                panel.empty();
                panel.append(render.monitor.renderCdrPeer(res.list));
                $(".class_list span.cdr_peer_result_count").text(res.count);
                var list = $(".class_list #cdr_peer_index li");
                updatePagination(list, res.count, handler.monitor.monitorPageSize, page);
            });
        }, paginationCdrPeer: function (data, src) {
            var page = src.val() || 1;
            data.page = page;
            handler.monitor.queryCdrPeer(data);
        }, showBusyCdrPeerDetail: function (data) {
            var params = data.split(',');
            getBufferedView('monitor/cdr_peer_busy_detail', function (view) {
                var beginTime = $("#cdrPeerBeginTime").val();
                var endTime = $("#cdrPeerEndTime").val();
                var queryBusyCdrPeerData = {
                    BEGIN_TIME: params[1],
                    END_TIME: params[2],
                    pageSize: handler.cdr.cdrPageSize,
                    AGENT: params[0],
                    ACTION_TYPE: 'busy'
                }
                //name != 'admin';
                var action = {
                    action: "app.monitor.queryCdrPeer",
                    data: queryBusyCdrPeerData
                }
                sendAction(action, function (res) {
                    if (!res.success) {
                        console.info('Query cdr peer failure: ' + res.message);
                        return;
                    }
                    var panel = $('#modal_public_pane');
                    panel.empty();
                    panel.append(view);
                    $('#cdr_peer_busy_detail_agent').val(params[0]);
                    $('#cdr_peer_busy_detail_begin_time').val(params[1]);
                    $('#cdr_peer_busy_detail_end_time').val(params[2]);
                    render.monitor.cdrPeerBusyDetail(res.list, 'cdr_peer_busy_detail_table_content');
                    $('#cdr_peer_busy_detail_modal').modal();
                    $(".class_list span.cdr_peer_busy_detail_result_count").text(res.count);
                    var list = $(".class_list #cdrPeerBusyDetail_index li");
                    updatePagination(list, res.count, handler.monitor.monitorPageSize, 1);
                });
            });
        }, paginationCdrPeerBusyDetail: function (data, src) {
            var page = src.val() || 1;
            data.page = page;
            var queryData = data;
            queryData.pageSize = handler.monitor.monitorPageSize;
            queryData.ACTION_TYPE = "busy";
            //name != 'admin';
            queryData.BEGIN_TIME = $('#cdr_peer_busy_detail_begin_time').val();
            queryData.END_TIME = $('#cdr_peer_busy_detail_end_time').val();
            queryData.AGENT = $('#cdr_peer_busy_detail_agent').val();
            var action = {
                action: "app.monitor.queryCdrPeer",
                data: queryData
            }
            sendAction(action, function (res) {
                if (!res.success) {
                    console.info('Query cdr peer failure: ' + res.message);
                    return;
                }
                render.monitor.cdrPeerBusyDetail(res.list, 'cdr_peer_busy_detail_table_content');
                $('#cdr_peer_busy_detail_modal').modal();
                $(".class_list span.cdr_peer_busy_detail_result_count").text(res.count);
                var list = $(".class_list #cdrPeerBusyDetail_index li");
                updatePagination(list, res.count, handler.monitor.monitorPageSize, data.page);
            });
        }, resetQueryCondition: function () {
            //$('#cdr_peer_agent_name').html(render.monitor.renderCdrPeerAgents('agents'));
            $("input[name='BEGIN_TIME']").val('');
            $("input[name='END_TIME']").val('')
            utils.setSearchInput("cdr_peer_agent_name_div", '')
            $('#cdr_peer_agent_name_input').val('')

            $.datepicker.clearDateTime('#cdr_peer_list_picker_start');
            $.datepicker.clearDateTime('#cdr_peer_list_picker_end');
            $('#cdr_peer_list_picker_start').val(dateParse(new Date())+" 00:00:00");
            $('#cdr_peer_list_picker_end').val("");

        }, getLogoutReasonName: function (reason) {
            var name = null;
            switch (reason) {
                case "reserve":
                    name = "重复登录";
                    break;
                case "Timeout":
                    name = "超时";
                    break;
                case "akick":
                    name = "管理员签出";
                    break;
                default:
                    name = "正常";
            }
        },
        monitor_agent: function (id) {
            try {
                var ul = "<ul class=\"nav nav-tabs\" id=\"monitor_ul\">";
                var curpbxid = softphonebar_getpbxid(phone_data.pbx_in_ip);
                ul += "<li class=\"active\"><a href=\"#monitor_" + curpbxid + "\">" + phone_pbxs[phone_data.pbx_in_ip].pbxNick + "</a></li>";
                for (var pbx in phone_pbxs) {
                    if (pbx != phone_data.pbx_in_ip) {
                        var pbxid = softphonebar_getpbxid(pbx);
                        ul += "<li><a href=\"#monitor_" + pbxid + "\" >" + phone_pbxs[pbx].pbxNick + "</a></li>";
                    }
                }
                ul += "</ul>";
                var content = "";
                getBufferedView('monitor/monitor_agent_item', function (view) {
                    var allpbxDiv = $("#monitor_allpbx");
                    allpbxDiv.empty();
                    content += "<div class=\"tab-content\">";
                    for (var pbx in phone_pbxs) {
                        var agentItem = view;
                        var pbxid = softphonebar_getpbxid(pbx);
                        agentItem = agentItem.replace("monitor_serviceNo", "monitor_serviceNo" + "_" + pbxid);
                        agentItem = agentItem.replace("monitor_queue", "monitor_queue" + "_" + pbxid);
                        agentItem = agentItem.replace(/monitor_peer/g, "monitor_peer" + "_" + pbxid);
                        agentItem = agentItem.replace("monitor_waitCountTotal", "monitor_waitCountTotal" + "_" + pbxid);
                        agentItem = agentItem.replace("monitor_countAll", "monitor_countAll" + "_" + pbxid);
                        agentItem = agentItem.replace(/__pbxid/g, pbxid);
                        agentItem = agentItem.replace("monitor_onlineCount", "monitor_onlineCount" + "_" + pbxid);
                        agentItem = agentItem.replace("monitor_idleCount", "monitor_idleCount" + "_" + pbxid);

                        if (pbx == phone_data.pbx_in_ip) {
                            content += "<div class=\"tab-pane active\" id=\"monitor_" + pbxid + "\">";
                        } else {
                            content += "<div class=\"tab-pane\" id=\"monitor_" + pbxid + "\">";
                        }
                        content += agentItem;
                        content += "</div>";
                    }
                    content += "</div>";
                    allpbxDiv.html(ul + content);
                    var monitorUlA = $('#monitor_ul a');
                    monitorUlA.click(function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    });
                    monitorUlA.on('shown', function (e) {
                        var value = e.target + "";
                        var pbxid = value.substr(value.indexOf("#monitor_") + 9, value.length);
                        var pbx = _softphonebar_getpbx(pbxid);
                        phone_pbxMonitor(pbx);
                        var obj_queue = document.getElementById('monitor_queue_options_' + pbxid);
                        if(obj_queue)
                            obj_queue.selectedIndex = 0;
                        _softphonebar_deptChange(pbxid);
                        phone_data.currentPbxId = pbx;
                    });
                    _softphonebar_monitorInit();
                    resize();
                });
            } catch (e) {
            }
        },
        monitor_report: function (id) {
            try {
                var ul = "<ul class=\"nav nav-tabs\" id=\"monitoring_ul\">";
                var curpbxid = softphonebar_getpbxid(phone_data.pbx_in_ip);
                ul += "<li class=\"active\"><a href=\"#monitoring_" + curpbxid + "\">" + phone_pbxs[phone_data.pbx_in_ip].pbxNick + "</a></li>";
                for (var pbx in phone_pbxs) {
                    if (pbx != phone_data.pbx_in_ip) {
                        var pbxid = softphonebar_getpbxid(pbx);
                        ul += "<li><a href=\"#monitoring_" + pbxid + "\" >" + phone_pbxs[pbx].pbxNick + "</a></li>";
                    }
                }
                ul += "</ul>";
                var content = "";
                getBufferedView('monitor/monitor_report_item', function (view) {
                    $("#monitoring_allpbx").empty();
                    content += "<div class=\"tab-content\">";
                    for (var pbx in phone_pbxs) {
                        var agentItem = view;
                        var pbxid = softphonebar_getpbxid(pbx);
                        agentItem = agentItem.replace("_monitoring", pbxid + "_monitoring");
                        agentItem = agentItem.replace("_todayCallChartTip", pbxid + "_todayCallChartTip");
                        agentItem = agentItem.replace("_TodayPandect", pbxid + "_TodayPandect");
                        agentItem = agentItem.replace("_TodayPandectChart", pbxid + "_TodayPandectChart");
                        agentItem = agentItem.replace("_today_call_sum", pbxid + "_today_call_sum");
                        agentItem = agentItem.replace("_todayChartInCallBox", pbxid + "_todayChartInCallBox");
                        agentItem = agentItem.replace("_today_call_in_success", pbxid + "_today_call_in_success");
                        agentItem = agentItem.replace("_today_call_in_failure", pbxid + "_today_call_in_failure");
                        agentItem = agentItem.replace("_todayChartOutCallBox", pbxid + "_todayChartOutCallBox");
                        agentItem = agentItem.replace("_today_call_out_success", pbxid + "_today_call_out_success");
                        agentItem = agentItem.replace("_today_call_out_failure", pbxid + "_today_call_out_failure");
                        agentItem = agentItem.replace("_today_call_in_sum", pbxid + "_today_call_in_sum");
                        agentItem = agentItem.replace("_today_call_out_sum", pbxid + "_today_call_out_sum");
                        agentItem = agentItem.replace("_todayServiceNumberChartTip", pbxid + "_todayServiceNumberChartTip");
                        agentItem = agentItem.replace("_ServiceNumber", pbxid + "_ServiceNumber");
                        agentItem = agentItem.replace("_ServiceNumberChart", pbxid + "_ServiceNumberChart");
                        agentItem = agentItem.replace("_todayInCallChartTip", pbxid + "_todayInCallChartTip");
                        agentItem = agentItem.replace("_TwentyFourHourInChart", pbxid + "_TwentyFourHourInChart");
                        agentItem = agentItem.replace("_TwentyFourHourInCallMouseTip", pbxid + "_TwentyFourHourInCallMouseTip");
                        agentItem = agentItem.replace("_TwentyFourHourInCallChartArea", pbxid + "_TwentyFourHourInCallChartArea");
                        agentItem = agentItem.replace("_todayOutCallChartTip", pbxid + "_todayOutCallChartTip");
                        agentItem = agentItem.replace("_TwentyFourHourOutChart", pbxid + "_TwentyFourHourOutChart");
                        agentItem = agentItem.replace("_TwentyFourHourOutCallMouseTip", pbxid + "_TwentyFourHourOutCallMouseTip");
                        agentItem = agentItem.replace("_TwentyFourHourOutCallChartArea", pbxid + "_TwentyFourHourOutCallChartArea");
                        if (pbx == phone_data.pbx_in_ip) {
                            content += "<div class=\"tab-pane active\" id=\"monitoring_" + pbxid + "\">";
                        } else {
                            content += "<div class=\"tab-pane\" id=\"monitoring_" + pbxid + "\">";
                        }
                        content += agentItem;
                        content += "</div>";
                    }
                    content += "</div>";
                    $("#monitoring_allpbx").html(ul + content);
                    $('#monitoring_ul a').click(function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    })
                    $('#monitoring_ul a').on('shown', function (e) {
                        var value = e.target + "";
                        var pbxid = value.substr(value.indexOf("#monitoring_") + 12, value.length);
                        var pbx = _softphonebar_getpbx(pbxid);
                        phone_pbxMonitor(pbx);
                    })
                    _softphonebar_monitoringInit();
                    resize();
                });
            } catch (e) {
            }
        }
    },
    interfaceIndex: function (id) {
        if ($("#interface_container").find("#" + id).length == 0) {
            var currentUser = session.user;
            var interUrl = getCache("urls", id);
            var parameter = interUrl.parameter;
            var url = interUrl.url, parmt = "";
            if (parameter) {
                for (var i = 0; i < parameter.length; i++) {
                    var parameterValue;
                    if (parameter[i].value != "agentName") {
                        //parameterValue=eval("currentUser."+parameter[i].value);
                        parameterValue = currentUser[parameter[i].value];
                    } else {
                        parameterValue = currentUser.name;
                    }
                    if (parameterValue) {
                        parmt += parameter[i].name + "=" + parameterValue + "&";
                        parameterValue = null;
                    }
                }
                url += "?" + parmt;
                if (interUrl.isEncrypt != 1) {
                    if (interUrl.encodeKey) {
                        url += "encryptKey=" + hex_md5(parmt + "key=" + interUrl.encodeKey);
                    }
                }
            }
            var inner = "<iframe id='" + id + "' src='" + url + "' frameborder='0' width=100% height=100% scrolling=auto class='inner_container' marginheight=0px marginwidth=0px></iframe>";
            $("#interface_container").append(inner);
        }
        $("#interface_container .inner_container").css("display", "none");
        //$("#interface_container .inner_container").css("height", $(window).height() + 10);
        $("#interface_container").find("#" + id).css("display", "block");
    },
    showLogout: function (data) {
        utils.logout();
    },
    logout: function () {
        var weChatInfo = handler.media.weChat;
        if (weChatInfo.weChatStatus == "10") {
            handler.media.weChat.syncAgentStatus("0");
        }
        if ((session.user.isCallAgent && session.user.isCallAgent == "1")) {
            var checked = $("#logout_check").attr("checked");
            var queueRemove = true;
            if (checked)
                queueRemove = false;
            phone_exit(queueRemove);
        } else {
            session.logined = false;
            window.location = './main.html';
        }
//        var user = session.user;
//        if (user.uversion === "text" || phone_data.busyType == "10") {
//            handler.media.weChat.syncAgentStatus(false);
//        }
    },
    sms_record: function (id) {
        $("#sms_record_startTime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            pickerPosition: "bottom-left"
        });
        $("#sms_record_endTime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            pickerPosition: "bottom-left"
        });
        var cache = getCache("smsStatus");
        $("#sms_record_status").html("");
        var options = "<option value=''>全部</option>";
        var temp = '<option value="_value">_display</option>';
        for (var i = 0; i < cache.length; i++) {
            var option = temp.replace('_value', cache[i]["code_value"]);
            option = option.replace('_display', cache[i]["code_name"]);
            options += option;
        }
        $("#sms_record_status").html(options);
        //handler.sms.smsInputSearch();
        handler.sms.smsRecordQueryData({}, $("#sms_record_list_page"));

        utils.loadSearchInput({ id: "sms_record_user",
            width: "260",
            height: "18",
            tip: "按姓名,拼音搜索",
            data: getCache("minAgents"),
            searchField: ["name"],
            pinyinField: ["name"],
            listField: ["name"],
            userIdField: "_id",
            showField: "name",
            showAllList: true,
            showAllAgent: true,
            callbackFuc: function (object) {
                //console.dir(object);
                $("#sms_record_userId").val(object._id);
            },
            onKeyChanged: function () {
                if ($("#sms_record_user_input").val() != "") {
                    $("#sms_record_userId").val(utils.serachInputNoresult);
                } else {
                    $("#sms_record_userId").val("");
                }
            }
        });

    },
    group_sms_page: function (id) {
        $("#group_sms_startTime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            pickerPosition: "bottom-left"
        });
        $("#group_sms_endTime").datetimepicker({
            format: "yyyy-mm-dd hh:ii",
            autoclose: true,
            pickerPosition: "bottom-left"
        });
        handler.sms.groupSmsRecordQueryData({}, $("#group_sms_record_list_page"));
        utils.loadSearchInput({ id: "group_sms_user",
            width: "200",
            height: "18",
            tip: "按姓名,拼音搜索",
            data: getCache("minAgents"),
            searchField: ["name", "empNo"],
            pinyinField: ["name"],
            listField: ["name"],
            userIdField: "_id",
            showField: "name",
            showAllList: true,
            showAllAgent: true,
            callbackFuc: function (object) {
                $("#group_sms_userId").val(object._id);
            },
            onKeyChanged: function () {
                if ($("#group_sms_user_input").val() != "") {
                    $("#group_sms_userId").val(utils.serachInputNoresult);
                } else {
                    $("#group_sms_userId").val("");
                }
            }
        });
    },

    createCombox: function (src) {
        var cacheType = src.attr('cache');
        var valueField = src.attr('valueField');
        var displayField = src.attr('disPlayField');
        var cache = getCache(cacheType) || [];
        var temp = '<option value="_value">_display</option>';
        for (var i = 0; i < cache.length; i++) {
            var option = temp.replace('_value', cache[i][valueField]);
            option = option.replace('_display', cache[i][displayField]);
            src.append(option);
        }
    },

    config_list: function (id) {
        var pbx = session.account.pbx;
        var config_a = $('#config_list li.multipbx a');
        var config_tab = $('#config_list li.multipbx');
        var ul = '<ul class="dropdown-menu">';
        var menuItemTmp = '<li><a href="#" class="action" appaction="__action" appdata="__data" data-toggle="tab">__name</a></li>';
        var concatDropDown = function (pbx, actionName) {
            var lis = "";
            for (var i = 0; i < pbx.length; i++) {
                lis += menuItemTmp.replace('__action', actionName).replace('__name', pbx[i].NickName).replace('__data', pbx[i].PBX);
            }
            return lis;
        }
        if (pbx && pbx.length == 1) {
            var tabA = null;
            for (var i = 0, len = config_a.length; i < len; i++) {
                tabA = $(config_a[i]);
                tabA.addClass('action');
                tabA.attr('appaction', tabA.attr("actionname"));
                tabA.attr('appdata', pbx[0].PBX);
            }
            var lis = concatDropDown(pbx, "ivr.showIvrConfig");
            $("#ivraddpbx").before(lis);
        } else if (pbx && pbx.length > 1) {
            var tabA = null, tab = null;
            for (var j = 0, len = config_a.length; j < len; j++) {
                tabA = $(config_a[j]);
                tab = $(config_tab[j]);
                tabA.append('<b class="caret">');
                tab.addClass('dropdown');
                tabA.attr('data-toggle', 'dropdown');
                var lis = concatDropDown(pbx, tabA.attr("actionname"));
                lis += '</ul>';
                tab.append(ul + lis);
            }
            var lis = concatDropDown(pbx, "ivr.showIvrConfig");
            $("#ivraddpbx").before(lis);
        }

    },
    resetForm: function (src) {
        var form = src.parents('form');
        form.find(':input').each(function () {
            var input = $(this);
            if (input.attr('type') !== 'hidden') {
                input.val('');
            }
        });
        form.find('a.user_toleftall').click();
    },

    config: {
        user: {
            refreashUserCache: function (list) {
                if (list.event == 'updateUser' || list.event == 'stopUser' || list.event == 'startUser') {
                    var userData = {
                        _id: list.eventData._id,
                        name: list.eventData.name,
                        role: list.eventData.role,
                        depId: list.eventData.depId,
                        status: list.eventData.status,
                        empNo: list.eventData.empNo,
                        pinyin: list.eventData.pinyin,
                        sipConfigId: list.eventData.sipConfigId,
                        isCallAgent: list.eventData.isCallAgent
                    }
                    updateCache("minAgents", list.eventData._id, userData)
                }
                if (list.event == 'addUser') {
                    var userData = {
                        _id: list.eventData._id,
                        name: list.eventData.name,
                        role: list.eventData.role,
                        depId: list.eventData.depId,
                        status: list.eventData.status,
                        empNo: list.eventData.empNo,
                        pinyin: list.eventData.pinyin,
                        sipConfigId: list.eventData.sipConfigId,
                        isCallAgent: list.eventData.isCallAgent
                    }
                    addCache("minAgents", userData);
                }
            },
            getAgentCache: function (isBill) {
                var data = {}
                data.page = 1;
                data.status = 'enable'
                var againCount = 0;
                session.dicMap.minAgents = [];
                if (isBill) {
                    if (session.account.pbx && session.account.pbx.length > 0) {
                        data.sipConfigId = session.account.pbx[0].PBX;
                    } else {
                        return;
                    }
                } else {
                    data.sipConfigId = session.user.sipConfigId;
                }
                handler.config.user.getAgentsAccordingPbx(data, againCount, function (res) {
                    if (res) {
                        delete data.count;
                        data.page = 1;
                        data.sipConfigId = {$ne: data.sipConfigId};
                        handler.config.user.getAgentsAccordingPbx(data, againCount, function (res) {
                            if (res) {
                                delete data.count;
                                delete data.sipConfigId
                                data.page = 1;
                                data.status = "disable"
                                handler.config.user.getAgentsAccordingPbx(data, againCount, function (res) {
                                    if (res) {
                                        return session.dicMap.minAgents

                                    } else {
                                        utils.showError("获取缓存数据异常!" + "minAgents");
                                        console.log(data)
                                    }
                                });

                            } else {
                                utils.showError("获取缓存数据异常!" + "minAgents");
                                console.log(data)
                            }

                        });
                    } else {
                        utils.showError("获取缓存数据异常!" + "minAgents");
                        console.log(data)
                    }
                });

            },
            getAgentsAccordingPbx: function (data, againCount, callback) {
                if (againCount < 4) {
                    var action = {
                        action: 'config.user.getminUserDic',
                        data: data
                    }
                    sendAction(action, function (response) {
                        if (response.success) {
                            var n = Math.ceil(response.count / 1000);
                            if (n > 1 && data.page <= n) {
                                session.dicMap.minAgents = session.dicMap.minAgents.concat(response.list);
                                data.page = data.page + 1;
                                data.count = response.count;
                                handler.config.user.getAgentsAccordingPbx(data, 0, callback);
                            } else {
                                session.dicMap.minAgents = session.dicMap.minAgents.concat(response.list);
                                callback(true);
                            }
                        } else {
                            handler.config.user.getAgentsAccordingPbx(data, againCount + 1, callback);
                        }

                    }, "post", true, true);
                } else {
                    utils.showError("获取缓存数据异常!" + "minAgents");
                    callback(false);
                }
            },
            getDisableUser: function (id, callback) {
                var data = {};
                data._id = id;
                var action = {
                    action: 'config.user.getDisableUser',
                    data: data
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        callback(response.list);
                    } else {
                        callback([]);
                    }
                });

            },
            currentPbx: '',
            changePbx: function (data) {
                render.user.renderUserPbxSelect(data);
                //todo 查询当前页面的坐席
                handler.config.user.config_user(data);
            },
            config_user: function (data, src) {
                //                var pbx = src.attr('appdata');
                var pbx = null;
                if (data === 'config_user') {
                    if (session.account.pbx.length > 0) {
                        pbx = session.account.pbx[0].PBX;
                    }
                } else {
                    pbx = data;
                }
                if (session.user.scope === '0') {
                    pbx = session.user.sipConfigId;
                }
                if (pbx == null) {
                    render.user.renderUserPbxSelect(pbx);
                    $('#config_user_list_div').css('display', 'none');
                    return;
                }
                handler.config.user.currentPbx = pbx;
                getBufferedView('config/user/config_user', function (userListView) {
                    var pane = $('#view_config_user');
                    pane.empty();
                    var htm = render.renderConfigUserList(pbx, userListView);
                    pane.html(htm);
                    if (session.user.type == 'manager' && data != "all") {
                        pane.find(".deal_user_btn").show();
                    } else if (handler.config.role.containFunc("manager", "Function") && data != "all") {
                        pane.find(".batch_editUser").show();
                    }
                    render.user.renderUserPbxSelect(pbx);
                    getBufferedView('config/user/config_user_list_item', function (userListItemView) {
                        var action = {
                            action: 'config.user.queryTinyData',
                            data: {accountId: session.user.accountId, sipConfigId: pbx}
                        };
                        sendAction(action, function (response) {

                            if (response.success) {
                                var agents = response.list;
                                var itemHtml = '';
                                for (var i = 0; i < agents.length; i++) {
                                    var agent = agents[i];
                                    itemHtml += render.renderConfigUserListItem(agent, userListItemView);
                                }
                                $('#agent_list_pane', pane).html(itemHtml);
                                $(".class_list span.result_count", pane).text(response.count);
                                var list = $(".class_list #agent_list_index li", pane);
                                updatePagination(list, response.count, 10, 1);
                                resize();
                            }
                        });
                    });
                });
            },
            checkAllBatchUser: function (src) {
                var pane = $(src).closest("table").find("tbody");
                var users = pane.find('input[name="userCheck"]');
                var check = $(src).prop("checked");
                if (check) {
                    users.each(function () {
                        $(this).prop("checked", true);
                    });
                } else {
                    users.each(function () {
                        $(this).prop("checked", false);
                    });
                }
            },
            configUserUpdate: function (data, src) {
                data.accountId = session.user.accountId;
                data.userId = data._id;
                delete data['_id'];
                handler.config.role.hasChatRole(data.role,function(res){
                    if(res){
                        data.isChatAgent = "1";
                    }else{
                        data.isChatAgent = "0";
                    }

                    var action = {
                        action: 'config.user.update',
                        data: data
                    };
                    var self = this;
                    sendAction(action, function (response) {
                        if (response.success) {
                            var pane1 = $('#agent_detail_pane');
                            pane1.empty();
                            $("#agent_list_pane").find("input[value='" + data.userId + "']").closest("form").find("a").click();
                            utils.showSyncInfo("正在修改用户请稍等！", null, null, 500);
                            //                        handler.config.user.showAgentDetail({_id: data.userId});
                            //                        var preTd = $('#agent_list_pane').find('tr[show=true]').children();
                            //                        $(preTd[0]).html(data.name);
                            //                        $(preTd[1]).html(data.empNo);

                        } else {
                            if (response.repeatFields && response.repeatFields.length > 0) {
                                for (var i = 0; i < response.repeatFields.length; i++) {
                                    var val = response.repeatFields[i];
                                    src.closest('form').find("input[name='" + val + "']").css('border-color', 'red');
                                }
                                alert('红色文本框信息重复，请修改!');
                            } else if (response.code == '1006') {
                                alert('上级不能是自己或自己的下属，请重新选择!');
                            } else {
//                            if (response.message.indexOf("406") != -1) {
//                                src.closest('form').find("input[name='email']").css('border-color', 'red');
//                                alert('邮箱已经存在');
//                            } else {
                                utils.closeBox();
                                alert("修改用户失败！");
//                            }
                            }
                        }
                    });

                })

            },
            configUserAdd: function (data, src) {
                if (!handler.config.user.currentPbx) {
                    alert('请先配置PBX!');
                    return;
                }
                data.accountId = session.user.accountId;
                data.sipConfigId = handler.config.user.currentPbx;
                data.pinyin = cnToSpell.getSpell(data.name);
                handler.config.role.hasChatRole(data.role,function(res){
                    if(res){
                        data.isChatAgent = "1";
                    }else{
                        data.isChatAgent = "0";
                    }
                    var action = {
                        action: 'config.user.add',
                        data: data
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            src.closest('#agent_detail_pane').empty();
                            utils.showSyncInfo("正在增加用户请稍等！", null, null, 500);
//                        handler.resetForm(src);
                        } else {
                            if (response.repeatFields && response.repeatFields.length > 0) {
                                console.dir(response.repeatFields);
                                for (var i = 0; i < response.repeatFields.length; i++) {
                                    var val = response.repeatFields[i];
                                    console.log(src.closest('form').find("input[name='" + val + "']"));
                                    src.closest('form').find("input[name='" + val + "']").css('border-color', 'red');
                                }
                                alert('红色文本框信息重复，请修改!');
                            } else {
//                            if (response.message.indexOf("406") != -1) {
//                                src.closest('form').find("input[name='email']").css('border-color', 'red');
//                                alert('邮箱已经存在');
//                            } else {
                                utils.closeBox();
                                alert("增加用户失败!");
//                            }
                            }
                        }
                    });
                });

            },
            initUserUpdateOption: function (pane, data) {
                pane.find('select[name="uversion"]').html(render.renderCodeOption('userVersion', data.uversion));
                pane.find('select[name="isCallAgent"]').html(render.renderCodeOption('YES_NO', data.isCallAgent, true));
                pane.find('select[name="depId"]').html(render.dep.renderDepOption(data.depId));
                pane.find('select[name="busyType"]').html(render.renderCodeOption('YES_NO_0_1', data.busyType, true));
                var radios = pane.find('input[name="scope"]');
                radios.each(function (j) {
                    if ($(this).val() == data.scope) {
                        $(this).attr("checked", "true");
                    }
                });
                utils.loadSearchInput({ id: "user_relation",
                    width: "110",
                    height: "14",
                    tip: "按姓名,拼音搜索",
                    data: getCache("minAgents"),
                    searchField: ["name", "empNo"],
                    pinyinField: ["name"],
                    showDep: true,
                    listField: ["name"],
                    userIdField: "_id",
                    showField: "name",
                    showAllList: true,
                    showAllAgent: true,
                    callbackFuc: function (object) {
                        if (object.id == '') {
                            $("#user_parentId").val(object._id);
                        }
                        var userInput = $('#user_relation_input', '#user_relation');
                        if (userInput.length > 0) {
                            if (userInput.val() === object.name) {
                                $("#user_parentId").val(object._id);
                            }
                        }
                    },
                    onKeyChanged: function () {
                        if ($("#user_relation_input").val()||$("#user_relation_input").val()==='') {
                            $("#user_parentId").val("");
                        }
                    }
                });
                if (data.parentId) {
                    utils.setSearchInput("user_relation", getCache("minAgents", data.parentId).name);
                    $("#user_parentId").val(data.parentId);
                }
            },
            showConfigUserUpdate: function (data, src) {
                getBufferedView('config/user/config_user_detail_update', function (view) {
                    var dataForUpdate = {};
                    dataForUpdate._id = data._id;
                    var action = {
                        action: 'config.user.queryUserRole',
                        data: dataForUpdate
                    };
                    var self = this;
                    sendAction(action, function (response) {
                        if (response.success) {
                            var user = response.list[0];
                            var panel = $('#config_user_option_detail');
                            panel.empty();
                            panel.html(render.renderConfigUserUpdate(user, view));
                            handler.config.user.initUserUpdateOption(panel, user);
                            if (isHasFun("manager") != -1) {
                                panel.find(".user_pwd").show();
                            }
                            var roles = response.roles;
                            var userrole = [];
                            if (user.role) {
                                if (user.role instanceof Array) {
                                    userrole = user.role;
                                } else {
                                    userrole = user.role.split(',');
                                }
                            }
                            for (var i in roles) {
                                var flag = "false";
                                for (var j in userrole) {
                                    if (userrole[j] == roles[i]._id) {
                                        flag = "true";
                                        break;
                                    }
                                }
                                if (flag == "true") {
                                    $("#user_role", panel).append("<option selected value='" + roles[i]._id + "'>" + roles[i].display_name + "</option>");


                                } else {
                                    $(".user_selectL", panel).append("<option value='" + roles[i]._id + "'>" + roles[i].display_name + "</option>");

                                }
                            }

                            src.html('保存');
                            src.attr('appaction', 'config.user.configUserUpdate');
                            src.prev('i').attr('class', 'icon-ok');
                        }
                    });
                });
            },
            showAppUserUpdate: function (data, src) {
                getBufferedView('config/user/config_app_user_update', function (view) {
                    var panel = $('#user_edit_body');
                    panel.empty();
                    panel.html(render.renderConfigUserUpdate(session.user, view));
                    $('#user_edit').modal();
                })
            },
            appUserSwitchExtenType: function (data, src) {
                var ownSipList = session.user.ownSipNums;
                var gatewaySip = null;
                var LocalSip = null;
                for (var i = 0; i < ownSipList.length; i++) {
                    if (ownSipList[i].type == 'gateway') {
                        gatewaySip = ownSipList[i].Exten;
                    }
                    if (ownSipList[i].type == 'Local') {
                        LocalSip = ownSipList[i].Exten;
                    }
                }
                if (data.extenType === 'gateway') {
                    if (gatewaySip === null) {
                        alert("您没有设置语音网关sip号！");
                        return;
                    } else {
                        phone_switch_exten_type('gateway', gatewaySip);
                        session.user.extenType = 'gateway';
                    }
                } else if (data.extenType === 'Local') {
                    if (!session.user.mobile) {
                        alert("您的直线号码为空，请您配置好直线号码并重新登录！");
                        return;
                    }
                    if (LocalSip != null) {
                        phone_switch_exten_type('Local', LocalSip);
                        session.user.extenType = 'Local';
                    } else {
                        alert("您的直线sip号没有生效，请您重新登录！");
                        return;
                    }
                } else if (data.extenType === 'sip') {
                    phone_switch_exten_type('sip', 'agent');
                    session.user.extenType = 'sip';
                }
            },
            appUserMessageSettings: function (data) {
                var user = session.user,
                    email = user.email;
                if (data.alertEmail) {
                    if (!email || email == '') {
                        alert('您的邮箱为空，请先设置好邮箱后再启用新工单到达提醒！');
                        return;
                    }
                    data.alertEmail = 'checked';
                } else {
                    data.alertEmail = '';
                }
                data.userId = user._id;
                var action = {
                    action: 'config.user.updateUserMessageSettings',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        user.alertEmail = data.alertEmail;
                        utils.showSucc("修改消息设置成功");
                        $('#user_edit').modal('hide');
                    } else {
                        alert(response.message);
                    }
                });
            },
            appUserPasswordUpdate: function (data, src) {
                var user = session.user;
                if (data.oldPassword != user.password) {
                    alert('输入的旧密码不对!');
                    $("#oldPassword").val("");
                    $("#oldPassword").focus();
                    return;
                }
                if (data.password != data.newPassword) {
                    alert('新密码和确认密码输入不一致!');
                    $("#newPassword").val("");
                    $("#newPassword").focus();
                    return;
                }
                delete data['newPassword'];
                delete data['oldPassword'];

                data.accountId = user.accountId;
                data.userId = user._id;
                data.role = user.role;
                data.sipConfigId = user.sipConfigId;
                data.status = user.status;
                data.password = data.password;
                data.name = user.name;
                data.empNo = user.empNo;
                data.loginName = user.loginName;
                data.AutoBusyTime = user.AutoBusyTime;
                data.mobile = user.mobile;
                data.email = user.email;
                data.uversion = user.uversion;
                data.isCallAgent = user.isCallAgent;
                var action = {
                    action: 'config.user.update',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        $('#user_edit').modal('hide');
                    } else {
                        alert(response.message);
                    }
                });
            },
            appUserUpdate: function (data, src) {
                data.accountId = session.user.accountId;
                data.userId = session.user._id;
                data.role = session.user.role;
                data.sipConfigId = session.user.sipConfigId;
                data.status = session.user.status;
                data.password = session.user.password;
                data.isCallAgent = session.user.isCallAgent;
                data.isChatAgent = session.user.isChatAgent;
                data.uversion = session.user.uversion;
                data.status = session.user.status;
                var action = {
                    action: 'config.user.update',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        handler.config.user.appUserUpdateRefresh(data);
                        $('#user_edit').modal('hide');
                        utils.showSyncInfo("正在修改用户请稍等！", null, null, 500);
                    } else {
                        var repeatFields = response.repeatFields;
                        if (repeatFields && repeatFields.length > 0) {
                            var messItem = null, repeatItem = [];
                            for (var i = 0, len = repeatFields.length; i < len; i++) {
                                messItem = repeatFields[i];
                                if (messItem === 'email') {
                                    repeatItem.push('邮箱');
                                } else if (messItem === 'loginName') {
                                    repeatItem.push('登录名');
                                }
                            }
                            if (repeatItem.length > 0) {
                                utils.showError(repeatItem.join(',') + "已被使用，请您重新填写");
                            }
                        } else {
                            utils.closeBox();
                            alert("修改用户失败!");
                        }
                    }
                });
            },
            appUserUpdateRefresh: function (data) {
                session.user.name = data.name;
                session.user.empNo = data.empNo;
                session.user.loginName = data.loginName;
                session.user.AutoBusyTime = data.AutoBusyTime;
                session.user.mobile = data.mobile;
                session.user.email = data.email;

                $("#user_exten").text(" - " + session.user.empNo);
                $("#user_name").text(session.user.name);
            },
            showAgentDetail: function (data, src) {
                if (src) {
                    src.closest('tbody').children().removeAttr('show');
                    src.closest('tr').attr('show', 'true');
                }
                var action = {
//                    action: 'manager.queryAccountPbxAgent',
                    action: 'config.user.query',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        var user = response.list[0];
                        getBufferedView('config/user/config_user_detail', function (view) {
                            var pane = $('#agent_detail_pane');
                            pane.empty();
                            pane.html(render.renderConfigUserDetail(user, view));
                            //当从计费跳到新节点时显示“重置密码”功能。正常登入不显示其功能。
                            if (session.user.type == "manager") {
                                pane.find("#user_passwordchange").attr("style", "display:inline");
                            }

                            if (user.status == 'disable') {
                                var statusOption = $('#user_status_option'),
                                    changePbxOption = $('#user_changePbx_option'),
                                    userUpdateOption = $('#user_update_option'),
                                    passwordChange = $('#user_passwordchange');
                                statusOption.attr('href', "#startModalAlert");
                                statusOption.html('启用');

                                changePbxOption.attr("style", "display: none;");
                                userUpdateOption.attr("style", "display: none;");
                                passwordChange.attr("style", "display: none");

                                $(statusOption).prev('i').attr('class', 'icon-ok-circle');
                            }
                            getBufferedView('config/user/config_user_detail_info', function (view) {

                                pane = $('#config_user_option_detail');

                                pane.empty();
                                if (user.status == 'disable') {
                                    user.status = '不可用';
                                } else if (user.status == 'enable') {
                                    user.status = '可用';
                                }
                                if (user.busyType == "0") {
                                    user.busyType = '否';
                                } else if (user.busyType == '1') {
                                    user.busyType = '是';
                                } else {
                                    user.busyType = '否';
                                }

                                if (user.isCallAgent == '2') {
                                    user.isCallAgent = '否';
                                } else if (user.isCallAgent == '1') {
                                    user.isCallAgent = '是';
                                } else {
                                    user.isCallAgent = '否';
                                }
                                //从缓存中获取部门信息
                                var dep = getCache("department");
                                for (var k = 0; k < dep.length; k++) {
                                    var obj = dep[k];
                                    if (obj._id == user.depId) {
                                        user.depId = dep[k].name;
                                    }
                                }

                                pane.html(render.renderConfigUserDetail(user, view));
                                $(".user_search_dorpdown").attr("style", "margin-left:-11px;");
                                resize();
                            });
                        });
                    }
                });
            },
            initUserAddOption: function (pane) {
                pane.find('select[name="uversion"]').html(render.renderCodeOption('userVersion'));
                pane.find('select[name="isCallAgent"]').html(render.renderCodeOption('YES_NO', '1', true));
                pane.find('select[name="depId"]').html(render.dep.renderDepOption());
                pane.find('select[name="busyType"]').html(render.renderCodeOption('YES_NO_0_1', '0', true));
                utils.loadSearchInput({ id: "user_relation",
                    width: "110",
                    height: "14",
                    tip: "按姓名,拼音搜索",
                    data: getCache("minAgents"),
                    searchField: ["name", "empNo"],
                    pinyinField: ["name"],
                    listField: ["name"],
                    userIdField: "_id",
                    showField: "name",
                    showDep: true,
                    showAllList: true,
                    showAllAgent: true,
                    callbackFuc: function (object) {
                        $("#user_parentId").val(object._id);
                    },
                    onKeyChanged: function () {
                        if ($("#user_relation_input").val()||$("#user_relation_input").val()==='') {
                            $("#user_parentId").val("");
                        }
                    }
                });
            },
            showConfigUserAdd: function (data, src) {
                getBufferedView('config/user/config_user_agent_add', function (view) {
                    var panel = $('#agent_detail_pane');
                    panel.empty();
                    panel.html(view.replace(/__sipConfigId/g, data));
                    handler.config.user.initUserAddOption(panel);

                    //修改的部分
                    var action = {
                        action: 'manager.queryRoleAll',
                        data: {accountId: session.user.accountId}
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var roles = response.list;
                            var optionHtml = '';
                            for (var i = 0; i < roles.length; i++) {
                                var role = roles[i];
                                $(".user_selectL", panel).append("<option value='" + role._id + "'>" + role.display_name + "</option>");
                            }
                        }


                    });
                });
            },
            showConfigUserBatchAdd: function (data, src) {
                getBufferedView('config/user/config_user_batch_add_modal', function (view) {
                    var pane = $('#agent_detail_pane');
                    pane.empty();
                    pane.html(view.replace(/__sipConfigId/g, data));
                    var modalPane = $('#user_batch_add_modal');
                    modalPane.modal({
                        backdrop: 'static'
                    }).modal('show');
//                    var roles = getCache('roles');
//                    var html='';
//                    for(var i=0;i<roles.length;i++){
//                        var rol = roles[i];
//                        html += "<option value='"+rol._id+"'>"+rol.display_name+"</option>";
//                    }
                    modalPane.find("select[name='role[]']").html(render.dep.renderRoleOption());
                    modalPane.find('select[name="uversion"]').html(render.renderCodeOption('userVersion'));
                    modalPane.find('select[name="depId"]').html(render.dep.renderDepOption());

                    handler.config.user.initBatchOperate(modalPane);
                });

            },
            confirmBatch: function (data, src) {
                var modalPane = $('#user_batch_add_modal');
                var inputs = modalPane.find('.modal-body-begin input:text');
                for (var i = 0; i < inputs.length; i++) {
                    var ele = $(inputs[i]);
                    if ($.trim(ele.val()) == '') {
                        data[ele.attr('name')] = ele.attr('placeholder');
                        ele.val(ele.attr('placeholder'));
                    }
                }
                modalPane.find('.modal-body-begin').css('display', 'none');
                modalPane.find('.modal-body-after').css('display', 'block');
                modalPane.find('.modal-footer .after').css('display', 'inline');
                modalPane.find('.modal-footer .before').css('display', 'none');
                var num = parseInt(data.batchNum);
//                var loginNameInt = parseInt(data.loginName.match(/\d+/));
//                var index = data.loginName.search(/\d+/);
//                var loginNa = '';
//                if(index >= 0){
//                    loginNa = data.loginName.substring(0,index);
//                }else{
//                    loginNameInt = 0;
//                    loginNa = data.loginName;
//                }
                var empNoInt = parseInt(data.empNo);
                if (!data.email) {
                    data.email = '';
                }
                if (!data.mobile) {
                    data.mobile = '';
                }
                getBufferedView('config/user/config_user_batch_add_modal_after_list', function (view) {
                    var htm = '';
                    for (var i = 0; i < num; i++) {
                        var modalView = view;
//                        if(loginNameInt < 10){
//                            data.loginName = loginNa + '0'+loginNameInt;
//                        }else{
//                            data.loginName = loginNa+loginNameInt;
//                        }
//                        data.name  = data.loginName;
                        data.empNo = '' + empNoInt;
                        var email = session.account.accountName;
                        if (email.indexOf(".") == -1) {
                            email = email + ".com";
                        }
                        data.email = empNoInt + "@" + email;
                        htm += render.replaceDataByObjectNew(data, modalView);
//                        loginNameInt++;
                        empNoInt++;
                    }
                    var afterBody = modalPane.find('.modal-body-after .contentBody');
                    afterBody.html(htm);
//                    var roles = getCache('roles');
//                    var seleHtml = '';
//                    for(var k=0;k<roles.length;k++){
//                        var rol = roles[k];
//                        if(rol._id == data.role[0]){
//                            seleHtml += "<option value='"+rol._id+"' selected>"+rol.display_name+"</option>";
//                        }else{
//                            seleHtml += "<option value='"+rol._id+"'>"+rol.display_name+"</option>";
//                        }
//                    }
                    afterBody.find('select[name="isCallAgent"]').html(render.renderCodeOption('YES_NO', '1', true));
                    afterBody.find("select[name='role[]']").html(render.dep.renderRoleOption(data.role[0]));
                    afterBody.find('select[name="uversion"]').html(render.renderCodeOption('userVersion', data.uversion));
                    afterBody.find('select[name="depId"]').html(render.dep.renderDepOption(data.depId));
                });
            },
            backBatch: function (data, src) {
                var modalPane = $('#user_batch_add_modal');
                modalPane.find('.modal-body-begin').css('display', 'block');
                modalPane.find('.modal-body-after').css('display', 'none').find('table tbody').empty();
                modalPane.find('.modal-footer .after').css('display', 'none');
                modalPane.find('.modal-footer .before').css('display', 'inline');
            },
            checkBatchSelf: function (parent) {
                var map1 = {}, map2 = {}, map3 = {};
                var count = 0;
                parent.find("input[name='loginName']").each(function () {
                    var v = $(this).val();
                    if (map1[v]) {
                        count++;
                        $(this).css('border-color', 'red');
                    } else {
                        map1[v] = 1;
                    }
                });
                parent.find("input[name='empNo']").each(function () {
                    var v = $(this).val();
                    if (map2[v]) {
                        count++;
                        $(this).css('border-color', 'red');
                    } else {
                        map2[v] = 1;
                    }
                });
//                parent.find("input[name='email']").each(function () {
//                    var v = $(this).val();
//                    if (map3[v]) {
//                        count++;
//                        $(this).css('border-color', 'red');
//                    } else {
//                        map3[v] = 1;
//                    }
//                });
                return count;
            },
            checkBatchRepeat: function (result, parent) {
                var count = 0;
                var f1 = result.loginName;
                var f2 = result.empNo;
                var f3 = result.email;
                if (f1) {
                    count++;
                    for (var i = 0; i < f1.length; i++) {
                        parent.find("input[name='loginName']").each(function () {
                            if ($(this).val() == f1[i]) {
                                $(this).css('border-color', 'red');
                            }
                        });
                    }
                }
                if (f2) {
                    count++;
                    for (var i = 0; i < f2.length; i++) {
                        parent.find("input[name='empNo']").each(function () {
                            if ($(this).val() == f2[i]) {
                                $(this).css('border-color', 'red');
                            }
                        });
                    }
                }
//                if (f3) {
//                    count++;
//                    for (var i = 0; i < f3.length; i++) {
//                        parent.find("input[name='email']").each(function () {
//                            if ($(this).val() == f3[i]) {
//                                $(this).css('border-color', 'red');
//                            }
//                        });
//                    }
//                }

                if (count > 0) {
                    alert('座席工号、登录名已存在，请修改!');
                }
            },
            saveBatchUser: function (data, src) {
                if (!handler.config.user.currentPbx) {
                    alert('请先配置PBX!');
                    return;
                }
                var modalAfterPane = $('#user_batch_add_modal').find('.modal-body-after');
                var errors = handler.config.user.checkBatchSelf(modalAfterPane);
                if (errors > 0) {
                    alert('座席工号、登录名不能重复，请修改!');
                    return;
                }
                var forms = modalAfterPane.find('.contentBody tr');
                var list = [];
//                var useres = che('agents')getCa;
//                var users = [];
//                for(var i=0;i<useres.length;i++){
//                       users.push(copy(useres[i]));
//                }
                modalAfterPane.find('input').css('border-color', 'rgb(204, 204, 204)');
                for (var i = 0; i < forms.length; i++) {
                    var fm = $(forms[i]);
                    if (!validate.validate(fm)) return false;
                    var dataOfForm = getDataOfForm(fm);
                    if (dataOfForm.succeed) {
                        dataOfForm.data.accountId = session.user.accountId;
                        dataOfForm.data.sipConfigId = handler.config.user.currentPbx;
                        dataOfForm.data.pinyin = cnToSpell.getSpell(dataOfForm.data.name);
//                        users.push(dataOfForm.data);
                        list.push(dataOfForm.data);
                    } else {
                        return false;
                    }
                }
                var action = {
                    action: 'config.user.addBatch',
                    data: list
                };
                sendAction(action, function (res) {
                    if (res.success) {
                        alert("增加座席成功，请稍等一会手动刷新座席列表！");
                        $('#user_batch_add_modal').modal('hide');
                    } else {
                        if (res.repeatFields) {
                            handler.config.user.checkBatchRepeat(res.repeatFields, modalAfterPane.find(".contentBody"));
                        } else {
                            alert("批量增加用户失败!");
                        }
                    }
                });

            },
            initBatchOperate: function (pane) {
                pane.find("select[name='setUversion']").html(render.renderCodeOption('userVersion'));
                pane.find("select[name='setDepId']").html(render.dep.renderDepOption());
                pane.find("select[name='setRole']").html(render.dep.renderRoleOption());
                //批量修改密码
                pane.find("input[name='setPassword']").keyup(function () {
                    var val = $(this).val();
                    pane.find('input[name="password').each(function (i) {
                        $(this).val(val);
                    })
                });

                pane.find("input[name='setAutoBusyTime']").keyup(function () {
                    var val = $(this).val();
                    pane.find('input[name="AutoBusyTime').each(function (i) {
                        $(this).val(val);
                    })
                })
                pane.find("select[name='setUversion']").change(function () {
                    var val = $(this).val();
                    pane.find('select[name="uversion"]').each(function (i) {
                        $(this).val(val);
                    })
                });
                pane.find("select[name='setDepId']").change(function () {
                    var val = $(this).val();
                    pane.find('select[name="depId"]').each(function (i) {
                        $(this).val(val);
                    })
                });
                pane.find("select[name='setRole']").change(function () {
                    var val = $(this).val();
                    pane.find('select[name="role[]"]').each(function (i) {
                        $(this).val(val);
                    })
                });
            },
            showConfigUserBatchUpdate: function (data, src) {
                data.accountId = session.user.accountId;
                data.pageSize = 10;
                data.status = "enable";
                var left = src.closest('.left-column');
                var trs = left.find("#agent_list_pane tr");
                if (trs.length == 0) {
                    alert("还没有创建坐席");
                    return false;
                }
                data.page = left.find(".pagination li[class='active']").find("a").val() || 1;
                var pane = $('#agent_detail_pane');
                getBufferedView('config/user/config_user_batch_update', function (view) {
                    pane.empty();
                    pane.html(view);
                    pane.find("#user_batch_update_modal").modal({
                        backdrop: 'static'
                    }).modal('show');
                    getBufferedView('config/user/config_user_batch_update_item', function (view2) {
                        var pane1 = pane.find("#user_batch_update_modal tbody");
                        var action = {
                            action: 'config.user.query',
                            data: data
                        };

                        sendAction(action, function (response) {
                            if (response.success) {
                                var agents = response.list;
                                var body = [];
                                for (var i = 0; i < agents.length; i++) {
                                    if (session.user.type == "agent") {
                                        view2 = view2.replace(/__display/g, "none");
                                    }
                                    var agent = agents[i];
                                    body.push(render.replaceDataByObject2(agent, view2));
                                }
                                pane1.html(body.join(""));
                                handler.config.user.initBatchOperate(pane);
                            }
                        });
                    });
                });
            },
            updateBatchUser: function (data, src) {
                var pane = $('#agent_detail_pane').find('#user_batch_update_modal tbody');
                var errors = handler.config.user.checkBatchSelf(pane);
                if (errors > 0) {
                    alert('座席工号、登录名不能重复，请修改!');
                    return;
                }
                var forms = pane.find('tr');
                var list = [];
//                pane.find('input').css('border-color','rgb(204, 204, 204)');
                var total = 0;
                for (var i = 0; i < forms.length; i++) {
                    var fm = $(forms[i]);
                    if (!fm.find('input[name="userCheck"]').prop("checked")) {
                        total++;
                        continue;
                    }
                    if (!validate.validate(fm)) return false;
                    var dataOfForm = getDataOfForm(fm);
                    if (dataOfForm.succeed) {
                        dataOfForm.data.pinyin = cnToSpell.getSpell(dataOfForm.data.name);
                        list.push(dataOfForm.data);
                    } else {
                        return false;
                    }
                }
                if (total == forms.length) {
                    alert('请至少选择一个');
                    return false;
                }
                var action = {
                    action: 'config.user.updateBatch',
                    data: list
                };
                sendAction(action, function (res) {
                    if (res.success) {
                        alert("修改座席成功，请稍等一会手动刷新座席列表！");
                        $('#agent_detail_pane').find('#user_batch_update_modal').modal('hide');
                    } else {
                        if (res.repeatFields) {
                            handler.config.user.checkBatchRepeat(res.repeatFields, pane);
                        } else {
                            alert("批量修改用户失败!");
                        }
                    }
                });
            },
            configUserQueryData: function (data, src) {
                data.accountId = session.user.accountId;
                data.page = src.val() || 1;
                data.pageSize = 10;

                var pane = src.closest('.left-column');
                getBufferedView('config/user/config_user_list_item', function (userListItemView) {
                    var action = {
                        action: 'config.user.queryTinyData',
                        data: data
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var agents = response.list;
                            //var allUser = response.allUsers;
                            //refreshCache('agents',allUser);
                            //                            if("ivr" in session.dicMap){
                            //                                session.dicMap.ivr['c5_account_user'] = response.allUsers;//
                            //                            }//没有地方对他进行展示，只有修改
                            var itemHtml = '';
                            for (var i = 0; i < agents.length; i++) {
                                var agent = agents[i];
                                itemHtml += render.renderConfigUserListItem(agent, userListItemView);
                            }
                            $('#agent_list_pane', pane).html(itemHtml);
                            $(".class_list span.result_count", pane).text(response.count);
                            var list = $(".class_list #agent_list_index li", pane);
                            $("#user_query_high_list").attr("style", "display: none");
                            $("#user_query_list").removeAttr("style");
                            $("#config_high_user_input_reload").attr("style", "display: none");
                            $("#config_user_input_reload").removeAttr("style");
                            updatePagination(list, response.count, 10, data.page);
                            resize();
                        }
                    });
                });
                if (src.text().trim() == '刷新') {
                    if (session.user.scope) {
                        getAgentCache(false);
                    } else {
                        getAgentCache(true);
                    }

                }

            },
            queryHighUsers: function (data, src) {
                if (!src.val() && src.text().trim() != '刷新') {
                    session.queryHighUsersCondition = data;
                    $("#user_search_query").toggleClass("user_query_close");
                } else {
                    data = session.queryHighUsersCondition;
                }
                data.page = src.val() || 1;
                data.pageSize = 10;

                for (var key in data) {
                    if (!data[key]) {
                        delete data[key];
                    }
                }
                data.accountId = session.user.accountId;

                //调用高级查询的方法
                var pane = src.closest('.left-column');
                getBufferedView('config/user/config_user_list_item', function (userListItemView) {
                    var action = {
                        action: "config.user.queryHighUsers",
                        data: data
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var agents = response.list;
                            var itemHtml = '';
                            for (var i = 0; i < agents.length; i++) {
                                var agent = agents[i];
                                itemHtml += render.renderConfigUserListItem(agent, userListItemView);
                            }
                            $('#agent_list_pane', pane).html(itemHtml);
                            $(".class_high_list span.result_high_count", pane).text(response.count);
                            var list = $(".class_high_list #agent_high_list_index li", pane);
                            $("#user_query_list").attr("style", "display: none");
                            $("#user_query_high_list").removeAttr("style");
                            $("#config_user_input_reload").attr("style", "display: none");
                            $("#config_high_user_input_reload").removeAttr("style");
                            updatePagination(list, response.count, 10, data.page);
                            resize();
                        }
                    });
                });
                if (src.text().trim() == '刷新') {
                    if (session.user.scope) {
                        getAgentCache(false);
                    } else {
                        getAgentCache(true);
                    }
                }
            },
            resetQueryHighUsers: function (data, src) {
                var task_high_query_form = $("#user_search_query")
                task_high_query_form.find(".userNameClass").val("");
                task_high_query_form.find(".userEmpNoClass").val("");
                task_high_query_form.find(".users_status").val("");
                task_high_query_form.find(".users_status").change();
                task_high_query_form.find(".userPhoneClass").val("");
                task_high_query_form.find(".userEmailClass").val("");
                task_high_query_form.find(".userDepartmentsClass").val("");
                task_high_query_form.find(".userDepartmentsClass").change();

            },
            passwordchange: function (data, src) {
                var userId = src.attr('userId');
                data._id = userId
                console.log(data);
                var action = {
                    action: 'config.user.changePassword',
                    data: data
                };
                sendAction(action, function (response) {


                    getBufferedView('config/user/config_user_changedpassword', function (view) {
                        console.log(view);
                        view = view.replace(/__changedpassword/g, response.password);
                        $("#view_changed_agentpassword").empty();
                        $("#view_changed_agentpassword").append(view);
                        $('#passwordchange').modal('toggle');
                    });


                });
            },

            //FIXME:configUserStop 和 configUserStart 以及后台的代码为重复代码
            configUserStop: function (data, src) {
                $('#stopModalAlert').modal('hide');
                var userId = src.attr('userId');
                var action = {
                    action: 'config.user.stop',
                    data: {_id: userId}
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        handler.config.user.showAgentDetail({_id: userId});
                        utils.showSyncInfo("正在停用用户请稍等!", null, null, 500)
                    } else {
                        utils.closeBox();
                        alert("停用座席失败！" + response.message);
                    }
                });
            },
            configUserStart: function (data, src) {
                $('#startModalAlert').modal('hide');
                var userId = src.attr('userId');
                var action = {
                    action: 'config.user.start',
                    data: {_id: userId}
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        handler.config.user.showAgentDetail({_id: userId});
                        utils.showSyncInfo("正在启用用户请稍等!", null, null, 500);
                    } else {
                        utils.closeBox();
                        alert('启用座席失败！' + response.message)
                    }
                });
            },
            showConfigChangePbx: function (data, src) {
                var clildTargets = src[0].parentNode.children;
                var temporaryTargets = [];
                for (var i = 0; i < clildTargets.length; i++) {
                    if (clildTargets[i] != src) {
                        temporaryTargets.push(clildTargets[i]);
                    }
                }
                for (var i = 0; i < temporaryTargets.length; i++) {
                    var temporaryTarget = temporaryTargets[i];
                    if (temporaryTarget.innerHTML === '保存') {
                        temporaryTarget.innerHTML = '编辑';
                        temporaryTarget.setAttribute('appaction', 'config.user.showConfigUserUpdate');
                        temporaryTarget.previousElementSibling.setAttribute('class', 'icon-edit');
                    }
                }

                var dataForConfigChangePbx = {};
                dataForConfigChangePbx._id = data._id;
                getBufferedView('config/user/config_user_changePbx', function (view) {
                    var action = {
                        action: 'config.user.query',
                        data: dataForConfigChangePbx
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var user = response.list[0];
                            var panel = $('#config_user_option_detail');
                            panel.empty();
                            panel.html(render.renderConfigUserChangePbx(user, view));
                            var select = panel.find("#newPbxId");
                            var pbx = session.account.pbx || [];
                            var temp = '<option value="_value">_display</option>';
                            for (var i = 0; i < pbx.length; i++) {
                                var option = temp.replace('_value', pbx[i].PBX);
                                option = option.replace('_display', pbx[i].NickName);
                                select.append(option);
                            }
                        }
                    });
                });
            },
            configUserChangePbx: function (data, src) {
                data.accountId = session.account._id;
                if (data.oldPbxId == data.newPbxId) {
                    utils.showError("目标PBX与当前相同,请重新选择PBX");
                    return;
                }
                //校验该座席是否为技能组座席
                var queueData = {
                    Account: data.accountId,
                    PBX: data.oldPbxId,
                    'Members.id': data.userId
                };
                queueData.Status = {'$ne': 'delete'};
                var queueAction = {
                    action: 'manager.ivr.queue.queryIvrQueueList',
                    data: queueData
                }
                sendAction(queueAction, function (queueRes) {
                    if (!queueRes.success) {
                        utils.showError("根据座席校验座席是否为技能组座席出错!");
                        return;
                    } else {
                        if (queueRes.queueList && queueRes.queueList.length > 0) {
                            utils.showError("请将当前座席从技能组列表移除!");
                            return;
                        } else {
                            var action = {
                                action: 'config.user.changePbx',
                                data: data
                            };
                            sendAction(action, function (response) {
                                if (response.success) {
                                    utils.showConfirm("迁移座席成功，请稍后手动刷新座席列表！");
                                    var pane1 = $('#agent_detail_pane');
                                    pane1.empty();
                                    //handler.config.user.showAgentDetail({_id: data.userId});
                                } else {
                                    utils.showError("迁移座席失败.");
                                }
                            });
                        }
                    }
                });
            }
        },
        account: {
            config_account: function (id) {
                var pane = $('#view_' + id);
                var action = {
                    action: 'manager.getAccountById',
                    data: {_id: session.user.accountId}
                };
                var flag = false;
                sendAction(action, function (result) {
                    if (result.success) {
                        var data = result.data;
                        pane.find('input').each(function () {
                            var ele = $(this);
                            var name = ele.attr('name');
                            if (name) {
                                if (name == 'knowledgeLayer') {
                                    flag = true;
                                    if (!data[name]) {
                                        data[name] = 3;
                                    }
                                } else {
                                    ele.attr('title', data[name]);
                                }
                                ele.val(data[name]);
                            }
                        });
                        if (!flag) {
                            pane.find('input[name=knowledgeLayer]').val('3');
                        }
                        resize();
                    } else {
                        alert("获取账号信息失败!");
                    }
                });
            },
            saveAccount: function (data) {
                delete data.accountName;
                delete data.companyName;
                var action = {
                    action: 'manager.updateAccount',
                    data: data
                };
                sendAction(action, function (result) {
                    if (result.success == true) {
                        //$().toastmessage('showSuccessToast','修改账号信息成功!');
                        alert('修改账号信息成功!');
                    } else {
                        alert('保存账号信息失败!');
                        //$().toastmessage('showErrorToast','保存账号信息失败!');
                    }
                });
            },
            cleanAccount: function (data) {
                getBufferedView('config/account/config_clean', function (view) {
                    var pane = $('#config_clean_page');
                    pane.empty();
                    pane.html(view);
                    $('#config_clean_page').modal({
                        show: true
                    })
                });
            },
            immediatelyCleanup: function (data) {
                data._id = session.user.accountId;
                var action = {
                    action: 'manager.immediatelyCleanup',
                    data: data
                };
                sendAction(action, function (result) {
                    if (result.success) {
                        //$().toastmessage('showSuccessToast','修改账号信息成功!');
                        alert('账戶清理——立即执行成功');
                        $('#config_clean_page').modal('hide');
                    } else {
                        alert('账户清理——立即执行失败： ' + result.message);
                        //$().toastmessage('showErrorToast','保存账号信息失败!');
                    }
                });

            },
            timingCleanup: function (data) {
                data._id = session.user.accountId;
                var action = {
                    action: 'manager.timingCleanup',
                    data: data
                };
                sendAction(action, function (result) {
                    if (result.success == true) {
                        //$().toastmessage('showSuccessToast','修改账号信息成功!');
                        alert('账户清理——定时执行成功!');
                        $('#config_clean_page').modal('hide');
                    } else {
                        alert('账户清理——定时执行失败： ' + result.message);
                    }
                });
            },
            config_clean: function (id) {
//                var pane = $('#view_' + id);
//                var action = {
//                    action: 'manager.getAccountById',
//                    data: {_id: session.user.accountId}
//                };
//                var flag = false;
//                sendAction(action, function (result) {
//                    if (result.success) {
//                        var data = result.data;
//                        pane.find('input').each(function () {
//                            var ele = $(this);
//                            var name = ele.attr('name');
//                            if (name) {
//                                if (name == 'knowledgeLayer') {
//                                    flag = true;
//                                    if (!data[name]) {
//                                        data[name] = 3;
//                                    }
//                                } else {
//                                    ele.attr('title', data[name]);
//                                }
//                                ele.val(data[name]);
//                            }
//                        });
//                        if (!flag) {
//                            pane.find('input[name=knowledgeLayer]').val('3');
//                        }
//                        resize();
//                    } else {
//                        alert("获取账号信息失败!");
//                    }
//                });
            }
        },
        customer: {
            currentField: null,
            config_customer: function (meunId) {
                var pane = $('#view_config_customer');
                var action = {
                    action: 'manager.customer.getCustomerTemplate'
                };

                sendAction(action, function (response) {
                    if (response.success) {
                        var items = response.data;
                        var navItems = "";
                        var nav = pane.find('#config_customer_nav_pane');
                        for (var i in items) {
                            var item = items[i];
                            navItems += '<li><a class="action" appaction="config.customer.showCustomerConfigMain" active="' + item.active + '" appdata="' + item._id + '">' +
                                '<i class="icon-chevron-right"></i>' + item.name + '</a></li>';
                        }
                        nav.append(navItems);
                        nav.find('li a:first').click();
                    }
                });
//        });
            },
            showCustomerConfigMain: function (data, target) {
                var active = getCache('custTmpls', data).active;
//                var active = target.attr('active');
                var pane = $('#config_customer_template_pane');
                pane.empty();
                if (active == false) {
                    getBufferedView('config/customer/config_customer_active', function (view) {
                        view = view.replace(RegExp('__id', 'g'), data);
                        pane.html(view);
                    });
                } else {
                    getBufferedView('config/customer/config_customer_tab', function (view) {
                        pane.html(view);
                        var nav = pane.find("#customer_config_tab");
                        nav.find(".action").each(function () {
                            $(this).attr({appdata: data});
                        });
                        $('#view_config_customer').find("#tmpl_custdb_id1").val(data);
                        nav.find('li a:first').click();
                    });
                }


            },
            showCustomFieldConfig: function (data, target) {
                getBufferedView('config/customer/config_custom_fields', function (view) {
                    var pane = $('#customer_config_tab_content');
                    pane.empty();
                    pane.html(view);
                    var action = {
                        action: "manager.customer.queryFields",
                        data: {_id: data}
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var customFields = response.data.custom_fields || [];
                            var dicHtml = render.generateCustOptions("dic");
                            var fields = ['single', 'multi', 'number', 'date', 'dropdown', 'radio', 'checkbox', 'dropdowncc'];
                            var pane2 = $("#config_customer_fieldstype_pane");
                            var index = 0;
                            var finishInitFields = function () {
                                initDragable();
                                initContainer();
                                handler.config.customer.displayFieldsView(customFields, $("#customer_db_fields_demo"), $("#config-customer-field-sidebar"));
                            };
                            var initFields = function () {
//                                  finishInitFields();
                                if (index >= fields.length) {
                                    finishInitFields();
                                    return;
                                }
                                var fieldsItem = fields[index];
                                getBufferedView("config/customer/fields/" + fieldsItem, function (view) {
                                    pane2.append(view);
                                    if (fieldsItem == 'dropdown') {
                                        if (dicHtml) {
                                            var html = pane2.find(".dragItem-dropdown").html();
                                            pane2.find(".dragItem-dropdown").html(html.replace(/__dic/g, dicHtml));
                                        }
                                    } else if (fieldsItem == 'radio') {
                                        if (dicHtml) {
                                            var html = pane2.find(".dragItem-radio").html();
                                            pane2.find(".dragItem-radio").html(html.replace(/__dic/g, dicHtml));
                                        }
                                    } else if (fieldsItem == 'checkbox') {
                                        if (dicHtml) {
                                            var html = pane2.find(".dragItem-checkbox").html();
                                            pane2.find(".dragItem-checkbox").html(html.replace(/__dic/g, dicHtml));
                                        }
                                    } else if (fieldsItem == 'dropdowncc') {
                                        if (pane2.find(".dragItem-dropdowncc")) {
                                            pane2.find(".dragItem-dropdowncc").hide();
                                        }
                                    }

                                    index++;
                                    initFields();
                                });
                            }
                            initFields();
                        }
                    });
                });
            },
            getCCLabel: function (id) {
                var dic = getCache('options', id);
                var heads = dic.headers;
                if (heads && heads.length > 0) {
                    return heads;
                } else {
                    return [dic.name];
                }
            },
            casecadeView: function (id, src, cc) {
                var df = render.generateCustDefaultOptions(id);
                var heads = handler.config.customer.getCCLabel(id);
                src.siblings(".dragdefault").html(df);
                var t = handler.config.customer.currentField;
                if (t && t.attr('itemtype') == 'checkbox') {
                    src.siblings('.dragdefault').find('select').attr('name', 'default[]');
                }
                if (!t || t.attr("itemtype") != 'dropdown')return;
                var count = 1;
                var obj = t.parent().parent().parent();
                var colLength = obj.siblings().length + 1;
                var overLength = obj.nextUntil().length + 1;
                var savebtn = $('#config_customer_template_pane .popover.fade').find('button:contains("保存")');
                if (colLength < cc || overLength < cc) {
                    alert("请重新调整布局来放置级联选项!");
                    savebtn.removeClass('do_action');
                    savebtn.attr('disabled', 'true');
                    return false;
                } else {
                    savebtn.addClass('do_action');
                    savebtn.removeAttr('disabled');
                }
                t.find(".demo-label").text(heads[0]);
                if ($("#popovered-form")) {
                    $("#popovered-form").find('#label').val(heads[0]);
                }
                var setCC = function (cc, o, num) {

                    var t2 = o.next();
                    if (cc >= num) {
                        if (t2 && t2.hasClass('column')) {
//                            t2.html("");

                            getBufferedView("config/customer/fields/dropdowncc", function (view) {
                                t2.append(view);
                                t2.find(".demo-label").text(heads[count]);
                                t2.find(".dragViewItem").attr({"label": heads[count], "dic": id + "_" + count});
                                count++;
                                cc--;
                                setCC(cc, t2, ++num);
                            });
                        }
                    }
                };
                var clearCC = function (o) {
                    var t2 = o.next();
                    if (t2 && t2.hasClass('column') && t2.find(".dragItem-dropdowncc")) {
                        t2.html("");
                        clearCC(t2);
                    }
                };
                if (cc <= 1) {
                    clearCC(obj);
                } else {
                    for (var i = colLength - overLength; i < obj[0].parentNode.children.length; i++) {
                        $(obj[0].parentNode.children[i]).next().html("");
                    }
                    setCC(cc, obj, 1);
                }
            },
            displayFieldsView: function (fields, pane, tempPane) {
                fields = fields || [];
                for (var i = 0; i < fields.length; i++) {
                    var rowdata = fields[i];
                    var colNum = rowdata.cols.length;
                    var currentRow = tempPane.find(".dragrow-col" + colNum).clone();
                    var cols = rowdata.cols || [];
                    for (var m = 0; m < cols.length; m++) {
                        var coldata = cols[m];
                        var currentCol = currentRow.find(".column:eq(" + m + ")");
                        var items = coldata.fields || [];
                        for (var n = 0; n < items.length; n++) {
                            var itemdata = items[n];
                            var type = itemdata.type;
                            var currentItem = tempPane.find(".dragItem-" + type).clone();
                            var drayItem = currentItem.find(".dragViewItem");
                            drayItem.attr({label: itemdata.name, fieldId: itemdata._id, defaultval: itemdata.default, isRequired: itemdata.required, isQuery: itemdata.query, dic: itemdata.dic});
                            currentItem.find(".demo-label").text(itemdata.name);
                            currentCol.append(currentItem);
                        }
                    }
                    pane.append(currentRow);
                    initContainer();
                }
                if (pane.find(".dragItem-dropdowncc")) {
                    pane.find(".dragItem-dropdowncc").show();
                }

            },
            removeDragViewItem: function (data, src) {
                $('#customer_config_tab_content').mousedown();
            },
            dragItemActivePopover: function (data, src) {
                handler.config.customer.currentField = $(src);
                $(src).popover('toggle');
                var container = $('#config_customer_template_pane');
                var parent = $("#customer_config_tab_content");
                if ($(src).hasClass("popover-active")) {
                    $(src).removeClass("popover-active");
                } else {
                    parent.find(".popover-active").popover('hide').removeClass("popover-active");
                    $(src).addClass("popover-active");
                    var label = $(src).attr("label");
                    var isRequired = $(src).attr("isRequired");
                    var isQuery = $(src).attr("isQuery");
                    var defaultval = $(src).attr("defaultval");
                    var dic = $(src).attr("dic");
                    window.setTimeout(function () {
                        container.find('#datetimepicker').datetimepicker({
//                            pickerPosition: 'top-left',language: 'zh-CN', format: 'yyyy-mm-dd', todayBtn: 1, todayHighlight: 1, autoclose: 1 ,weekStart: 1, minView:2
                            dateFormat: "yy-mm-dd", showTimepicker: false
                        });
                        container.find('.popover').find("#popovered-form #label").val(label);
                        var c1 = container.find('.popover').find("#popovered-form");
                        c1.find('input[name=required][value=' + isRequired + ']').attr('checked', 'true');
                        c1.find('input[name=query][value=' + isQuery + ']').attr('checked', 'true');
                        if (c1.find('input[name="default"]')) {
                            c1.find('input[name="default"]').val(defaultval);
                        }
                        var type = c1.find("input[name='type']").val();
                        if (type == "dropdown" || type == "checkbox" || type == "radio") {
                            var c = c1.find("select[name='dic']");
                            c.val(dic);
                            //                        handler.customer.optionSelect(c, dic);
                            //                            if (defaultval) {
                            var df = render.generateCustDefaultOptions(dic, defaultval);
                            c1.find(".dragdefault").html(df);
                            if (type == 'checkbox') {
                                c1.find('.dragdefault select').attr('name', 'default[]');
                            }
                            //}
                        }
                    }, 250);
                }
            },
            saveCustomFieldsConfig: function (data, src) {
                var tid = $('#view_config_customer').find("#tmpl_custdb_id1").val();
                var fieldData = handler.config.customer.getDataFromDragContiner($("#customer_db_fields_demo"));
                if (!fieldData) {
                    return false;
                }
                var data = {_id: tid, custom_fields: fieldData};
                var action = {
                    action: "manager.customer.updateTmplCustomField",
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        syncDicCache('custTmpls', data._id, 'custom_fields', response.data);
                        if (response.needReload) {
                            alert("保存字段成功！此客户数据配置了同步第三方服务，请修改同步第三方客户资料同步配置！");
                        } else {
                            alert("保存字段成功！");
                        }
                        //重新加载配置页面
                        handler.config.customer.showCustomFieldConfig(data._id);
                    }
                });
            },
            getDataFromDragContiner: function (pane) {
                var data = [];
                var exitsLabel = [];
                var rows = pane.find(".drag-row");
                for (var i = 0; i < rows.length; i++) {
                    var cols = $(rows[i]).find(".column");
                    var currentRow = {cols: []};
                    for (var m = 0; m < cols.length; m++) {
                        var items = $(cols[m]).find(".dragViewItem");
                        var currentCol = { fields: []};
                        for (var n = 0; n < items.length; n++) {
                            var currentItem = {};
                            var type = $(items[n]).attr("itemType");
                            var lab = $(items[n]).attr('label');
                            if ($.inArray(lab, exitsLabel) != -1) {
                                alert(lab + '字段重复！');
                                return;
                            }
                            exitsLabel.push(lab);
                            if (type == 'checkbox' || type == 'dropdown' || type == 'dropdowncc' || type == 'radio') {
                                if (!$(items[n]).attr('dic')) {
                                    alert($(items[n]).attr("label") + '没有配置字典！');
                                    return false;
                                }
                            }
                            currentItem.name = $(items[n]).attr("label");
                            currentItem.type = type;
                            currentItem._id = $(items[n]).attr("fieldId");
                            currentItem.required = $(items[n]).attr("isRequired");
                            currentItem.query = $(items[n]).attr("isQuery");
                            currentItem.default = $(items[n]).attr("defaultval");
                            currentItem.dic = $(items[n]).attr("dic");
                            currentCol.fields.push(currentItem);
                            if (type == 'checkbox') {
                                currentItem.default = currentItem.default.split(',');
                            }
                        }
                        currentRow.cols.push(currentCol);
                    }
                    data.push(currentRow);
                }
                return data;
            },
            saveDrayItemConfig: function (data, src) {
                var popoverSrc = $("#view_config_customer").find(".demo").find(".popover-active");
                if (popoverSrc.length == 0) {
                    return false;
                }
                //如果变更了，字段类型
                if (data.changeType) {
                    var oldType = data.type;
                    data.type = data.changeType;
                    if (data.type == 'radio') {
                        //关联2级以上字典的下拉列表字段，不允许从下拉列表改成单选
                        if (oldType == 'dropdown') {
                            var thisDic = getCache('options', data.dic);
                            if (thisDic.cascade > 1) {
                                alert('关联2级以上字典的下拉列表字段，不允许从下拉列表改成单选！');
                                return;
                            }
                        }
                    }
                    popoverSrc.attr("itemType", data.type);
                    var drayItemExample = popoverSrc.find("div:last-child");
                    var typeInput = popoverSrc.find("input[name='type']");
                    drayItemExample.empty();
                    if (data.type == 'radio') {
                        popoverSrc.attr("data-original-title", "单选框配置");
                        typeInput.val("radio");
                        drayItemExample.html('<div class="inline-checkbox"><label class="inline"><input type="radio" id="optionsRadios1" value="1">选项1</label></div>' +
                            '<div class="inline-checkbox"><label class="inline"><input type="radio" id="optionsRadios2" value="2">选项2</label></div>' +
                            '<div class="inline-checkbox"><label class="inline"><input type="radio" id="optionsRadios3" value="3">选项3</label></div>');
                    } else if (data.type == 'dropdown') {
                        popoverSrc.attr("data-original-title", "下拉选项配置");
                        typeInput.val("dropdown");
                        drayItemExample.html('<select style="width: 90%;"></select>');
                    } else if (data.type == 'single') {
                        popoverSrc.attr("data-original-title", "单行文本配置");
                        drayItemExample.html('<input type="text" style="width: 90%;"/>');
                    } else if (data.type == 'multi') {
                        popoverSrc.attr("data-original-title", "多行文本配置");
                        drayItemExample.html('<textarea rows="3" style="width: 90%;"></textarea>');
                    }
                }

                var type = data.type;
                if (type == "single" || type == "multi" || type == "number") {
                    popoverSrc.find(".demo-label").text(data.label);
                    popoverSrc.attr("label", data.label);
                    popoverSrc.attr("isRequired", data.required);
                    popoverSrc.attr("isQuery", data.query);
                } else if (type == 'date') {
                    popoverSrc.find(".demo-label").text(data.label);
//                  popoverSrc.find("input:text,textarea").val(data.default);
                    popoverSrc.attr("label", data.label);
                    popoverSrc.attr("defaultval", data.default);
                    popoverSrc.attr("isRequired", data.required);
                    popoverSrc.attr("isQuery", data.query);

                } else if (type == "dropdown") {
                    popoverSrc.find(".demo-label").text(data.label);
                    popoverSrc.attr("label", data.label);
                    popoverSrc.attr("defaultval", data.default);
                    popoverSrc.attr("isRequired", data.required);
                    popoverSrc.attr("dic", data.dic);
                    popoverSrc.attr("isQuery", data.query);

                } else if (type == "checkbox") {
                    popoverSrc.find(".demo-label").text(data.label);
//                    var dicId = data.dic;
//                    var options = getCache('options',dicId).options || [];
//                    var checkboxHtml='';
//                    var checkboxPane = popoverSrc.find('.drag-item-view-content');
//                    checkboxPane.empty();
//                    for(var i =0 ;i<options.length;i++){
//                        var opt = options[i];
//                        checkboxHtml+='<div class="inline-checkbox"><label class="inline">'+
//                            '<input type="checkbox" value="'+opt.key+'">'+opt.name+'</label></div>';
//                    }
//                    checkboxPane.html(radioHtml);
//                    if(data.default){
//                        checkboxPane.find('input[value='+data.default+']:checkbox').attr('checked',true);
//                    }
                    popoverSrc.attr("label", data.label);
                    if (data.default) {
                        popoverSrc.attr("defaultval", data.default.join(','));
                    }
                    popoverSrc.attr("isRequired", data.required);
                    popoverSrc.attr("dic", data.dic);
                    popoverSrc.attr("isQuery", data.query);

                } else if (type == "radio") {
                    popoverSrc.find(".demo-label").text(data.label);
//                    var dicId = data.dic;
//                    var options = getCache('options',dicId).options || [];
//                    if(options.length != 0){
//                        var radioHtml='';
//                        var radioPane = popoverSrc.find('.drag-item-view-content');
//                        radioPane.empty();
//                        for(var i =0 ;i<options.length;i++){
//                            var opt = options[i];
//                            radioHtml+='<div class="inline-checkbox"><label class="inline">'+
//                                '<input type="radio" value="'+opt.key+'">'+opt.name+'</label></div>';
//                        }
//                        radioPane.html(radioHtml);
//                        if(data.default){
//                            radioPane.find('input[value='+data.default+']:radio').attr('checked',true);
//                        }
//                    }
                    popoverSrc.attr("label", data.label);
                    popoverSrc.attr("defaultval", data.default);
                    popoverSrc.attr("isRequired", data.required);
                    popoverSrc.attr("dic", data.dic);
                    popoverSrc.attr("isQuery", data.query);

                } else if (type == "dropdowncc") {
                    popoverSrc.find(".demo-label").text(data.label);
                    popoverSrc.attr("label", data.label);
                    popoverSrc.attr("isRequired", data.required);
                    popoverSrc.attr("isQuery", data.query);

                }
                handler.config.customer.dragItemActivePopover(null, popoverSrc);
            },
            cancelDrayItemConfig: function (data, src) {
                var popoverSrc = $("#view_config_customer").find(".demo").find(".popover-active");
                if (popoverSrc.length == 0) {
                    src.closest('.popover.fade').remove();
                } else {
                    handler.config.customer.dragItemActivePopover(null, popoverSrc);
                }
            },
            showAddCustomerTemplateItem: function (data) {
                getBufferedView('config/customer/config_add_customer_template', function (view) {
                    var pane = $('#modal_public_pane');
                    pane.empty();
                    pane.html(view);
                    $("#addCustomerTemplateModal").modal();
                });
            },
            addCustomerTemplate: function (data, target) {
                data.account = session.account;
                var action = {
                    action: 'manager.customer.addCustomerTemplate',
                    data: data
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        addCache('custTmpls', response.data);
                        var html = '<li><a class="action" appaction="config.customer.showCustomerConfigMain" appdata="' + response.data._id + '">' + '<i class="icon-chevron-right"></i>' + data.name + '</a></li>'
                        var pane = $('#config_customer_nav_pane');
                        pane.append(html);
                        $('#addCustomerTemplateModal').modal('hide');
                        pane.find('li a[appdata="' + response.data._id + '"]').click();
                    }
                });
            },
            showCustomerTemplate: function (data, target) {
                getBufferedView('config/customer/config_customer_detail', function (view) {
                    var pane = $('#customer_config_tab_content');
                    pane.empty();
                    pane.html(view.replace(RegExp('__id', 'g'), data));
                    var item = getCache('custTmpls', data);
                    var statusView = "";
                    for (var i in item.status) {
                        var status = item.status[i];
                        statusView += '<span class="' + i + '">' + status + '</span>, ';
                    }
                    if (statusView.length > 0) {
                        statusView = statusView.substr(0, statusView.length - 2);
                    }
                    pane.find('.config_customer_status').html(statusView);

                    var fieldsView = "";
                    for (var i in item.stable_fields) {
                        var field = item.stable_fields[i];
                        fieldsView += '<span class="config_cust_' + i + '">' + field + '</span>, ';
                    }
                    if (fieldsView.length > 0) {
                        fieldsView = fieldsView.substr(0, fieldsView.length - 2);
                    }
                    pane.find('.config_customer_fields').html(fieldsView);
                    pane.find('#config_customer_uniqueNum')[0].checked = item.unique_phone;
                    pane.find('#config_customer_uniqueName')[0].checked = item.unique_name;
                    pane.find('#config_customer_callPop')[0].checked = item.call_popup;
                    pane.find('#config_customer_allSource')[0].checked = item.allSource;
                    pane.find('#config_customer_showOwner')[0].checked = item.showOwner;
                    if (item.followPlan == undefined) {
                        pane.find('#config_customer_followPlan')[0].checked = true;
                    } else {
                        pane.find('#config_customer_followPlan')[0].checked = item.followPlan;

                    }
                    handler.config.customer.showCUstTmplSource(pane, item);
                    //handler.config.customer.refreshCustomField(item);
                });
            },
            showCUstTmplSource: function (parent, item) {
                var pane = parent.find('.sourceListDiv');
                var sources = item.source || [];
                var html1 = '<ul>';
                var html2 = '';
                for (var i = 0; i < sources.length; i++) {
                    var sourc = sources[i];
                    html1 += '<li onclick="handler.menuListClik(this)" flag="source" sign=\"' + sourc.key + '\"><label >' + sourc.name + '</label></li>';
                    html2 += "<ul style='display: none;' class=\"" + sourc.key + "_menuEdit" + "\">";
                    if (sourc.options && sourc.options.length != 0) {
                        for (var j = 0; j < sourc.options.length; j++) {
                            var child1 = sourc.options[j];
                            html2 += '<li sign=\"' + child1.key + '\"><label >' + child1.name + '</label></li>';
                        }
                    }
                    html2 += '</ul>';
                }
                html1 += '</ul>';
                $('.sourceList1', pane).html(html1);
                $('.sourceList2', pane).html(html2);
                resize();
                $('.sourceList1 ul li', pane).first().click();
                //console.dir(s);
                //s.click();
            },
            showEditStatus: function (data, target) {
                var item = getCache('custTmpls', data);
                var str = item.call_type == 'in' ? 'in' : 'out';
                getBufferedView('config/customer/config_status_' + str, function (view) {
                    var pane = $('#modal_public_pane');
                    pane.empty();
                    var html = view;
                    for (var i = 0; i < 10; i++) {
                        if (item.status['status' + i]) {
                            html = html.replace(RegExp('__status' + i, 'g'), item.status['status' + i])
                                .replace(RegExp('__id', 'g'), item._id);
                        } else {
                            html = html.replace(RegExp('__status' + i, 'g'), '')
                                .replace(RegExp('__id', 'g'), item._id);
                        }
                    }
                    pane.html(html);
                    $("#showEditStatusTemplateModal").modal();
                });
            },
            updateCustomerName: function (data, target) {
                var item = getCache('custTmpls', data);
                getBufferedView('config/customer/config_updateName_customer_template', function (view) {
                    var pane = $('#modal_public_pane');
                    pane.empty();
                    var html = view;
                    html = html.replace(RegExp('__name', 'g'), item.name).replace(RegExp('__id', 'g'), item._id);
                    pane.html(html);
                    $("#showEditNameTemplateModal").modal();
                });
            },
            showEditSource: function (data, src) {
                var item = getCache('custTmpls', data);
                getBufferedView('config/customer/config_source_modal', function (view) {
                    var pane = $('#modal_public_pane');
                    pane.empty();
                    view = view.replace(RegExp('__id', 'g'), item._id);
                    pane.html(view);
                    if (item.source && item.source.length != 0) {
                        var sources = item.source;
                        var html1 = "<ul >";
                        var html2 = '';
                        var dicD1 = pane.find('.dicDiv' + 1);
                        var dicD2 = pane.find('.dicDiv' + 2);
                        dicD1.empty();
                        dicD2.empty();

                        for (var i = 0; i < sources.length; i++) {
                            var options1 = sources[i];

                            html1 += "<div appdata='sign" + i + "' class='action' appaction='config.dic.addNextDic'>" +
                                "<input name='dic[]' key='" + options1.key + "' type='text' placeholder='字段名' value='" + options1.name + "' style='width:100px;'/></div>";
                            /*DIv2*/
                            var dicOp1 = options1.options || [];
                            if (dicOp1.length != 0) html2 += "<ul  class='sign" + i + "'>";

                            for (var j = 0; j < dicOp1.length; j++) {
                                var options2 = dicOp1[j];

                                html2 += "<div appdata='sign" + i + '_' + j + "' class='action' appaction='config.dic.addNextDic'>" +
                                    "<input name='dic[]' key='" + options2.key + "' type='text' placeholder='字段名' value='" + options2.name + "' style='width:100px;'/></div>";

                            }

                            if (dicOp1.length != 0) {
                                html2 += '</ul>';
                            }
                            /*div2结束*/
                        }

                        html1 += '</ul>';
                        dicD1.html(html1);
                        dicD2.html(html2);
                        dicD1.find('ul').addClass('pressed');
                        dicD1.find('ul div:first').click();
                    }
                    $("#showEditSourceTemplateModal").modal()

                });
            },
            updateNameCustomerTemplate: function (data, src) {
                if (!data) {
                    alert('不能为空！');
                    return false;
                }
                var id = src.attr('template-id');
                var parent = src.closest('.right_container');
                data._id = id;
                var action = {
                    action: 'manager.customer.editName',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        alert('修改成功！');
                        syncDicCache('custTmpls', id, 'name', data.name)
                        var html = "<i class='icon-chevron-right'></i>" + data.name;
                        parent.find('ul#config_customer_nav_pane li.active a').html(html);
                        clientState.set(session.user.accountId, getCache('custTmpls'));
                        $('#showEditNameTemplateModal').modal('hide');
                    }
                });
            },
            stopCustomer: function (data, src) {
                var conf = confirm('确定要停用该客户数据库吗？');
                if (!conf) {
                    return;
                }
                var parent = src.closest('#config_customer_template_pane');
                var action = {
                    action: 'manager.customer.stopCustomer',
                    data: {'_id': data, 'active': false}
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        alert('停用成功!请手动重启浏览器才能正确进行后续操作');
                        syncDicCache('custTmpls', data, 'active', false);
                        if (clientState.get(session.user.accountId)) {
                            var ct = clientState.set(session.user.accountId, getCache('custTmpls'));

                        }
                        getBufferedView('config/customer/config_customer_active', function (view) {
                            view = view.replace(RegExp('__id', 'g'), data);
                            parent.html(view);
                        });
                    }
                });
            },
            startCustomerTemplate: function (data, src) {
                var conf = confirm('确定要启用该客户数据库吗？');
                if (!conf) {
                    return;
                }
                var pane = src.closest('#config_customer_template_pane');
                var action = {
                    action: 'manager.customer.startCustomer',
                    data: {'_id': data, 'active': true}
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        alert('启用成功！请手动重启浏览器才能正确进行后续操作！');
                        syncDicCache('custTmpls', data, 'active', true);
                        if (clientState.get(session.user.accountId)) {
                            var ct = clientState.set(session.user.accountId, getCache('custTmpls'));

                        }
//                        addCache('custTmpls', response.data);
                        var activeLi = pane.siblings('.row-fluid').find('ul li.active a');
                        activeLi.attr('active', 'true');
                        handler.config.customer.showCustomerConfigMain(data, activeLi);
                    }
                });
            },
            editSource: function (data, src) {
                var parent = src.closest('form').find('.sourceModalPane');
                var optionsNode = [];
                var divFlag = 'dicDiv' + 1;
                var inputs1 = parent.find('.' + divFlag + ' input');
                for (var i = 1; i <= 2; i++) {
                    var dicDiv = parent.find('.dicDiv' + i);
                    var divInputs = dicDiv.find('input');
                    var divLength = divInputs.length;
                    for (var j = 0; j < divLength; j++) {
                        var eleDiv1 = $(divInputs[j]);
                        for (var k = j + 1; k < divLength; k++) {
                            var eleDiv2 = $(divInputs[k]);
                            if (eleDiv1.val() && eleDiv1.val() == eleDiv2.val()) {
                                alert("\"" + eleDiv1.val() + '\" 重复！');
                                return;
                            }
                        }
                    }
                }

                if (inputs1 && inputs1.length != 0) {

                    for (var j = 0; j < inputs1.length; j++) {
                        var ele = $(inputs1[j]);
                        if (!ele.val()) {
                            continue;
                        }
                        var field = {'name': $(inputs1[j]).val(), 'options': []};
                        if (ele.attr('key')) {
                            field.key = ele.attr('key');
                        } else {
                            field.key = uuid.v1();
                        }

                        var ele1 = $(inputs1[j]);
                        var docMenu = [];
                        var field2 = {};

                        var inputs2 = parent.find('.' + 'dicDiv2 ' + '.' + ele1.parent().attr('appdata') + ' input');
                        if (inputs2 && inputs2.length != 0) {

                            for (var k = 0; k < inputs2.length; k++) {
                                var ele2 = $(inputs2[k]);
                                if (!ele2.val()) {
                                    continue;
                                }
                                field2 = {'name': ele2.val()};
                                if (ele2.attr('key')) {
                                    field2.key = ele2.attr('key');
                                } else {
                                    field2.key = uuid.v1();
                                }
                                docMenu.push(field2);
                            }
                        }

                        field.options = docMenu;
                        optionsNode.push(field);
                    }
                }
                var action = {
                    action: 'manager.customer.editSource',
                    data: {'_id': data, 'source': optionsNode}
                };
                $('#showEditSourceTemplateModal').modal('hide');
                sendAction(action, function (response) {
                    if (response.success) {
                        syncDicCache('custTmpls', data, 'source', optionsNode);
                        handler.config.customer.showCustomerTemplate(data);
                    }

                });

            },
            editStatus: function (data, target) {
                var status = {};
                for (var i in data) {
                    var item = data[i];
                    if ($.trim(item) != "") {
                        for (var j in data) {
                            var itt = data[j];
                            if (i != j && $.trim(itt) != "") {
                                if (itt == item) {
                                    alert("'" + itt + "'重复！");
                                    return false;
                                }
                            }
                        }
                        status[i] = item;
                    } else {
                        item = '';
                    }
                }
                var action = {
                    action: 'manager.customer.editStatus',
                    data: {
                        status: status,
                        id: target.attr('template-id')
                    }
                }
                $('#showEditStatusTemplateModal').modal('hide');
                sendAction(action, function (response) {
                    if (response.success) {
                        syncDicCache('custTmpls', response.id, 'status', status);
                        handler.config.customer.showCustomerTemplate(response.id);
                    }
                });
            },
            showEditFields: function (data) {
                var item = getCache('custTmpls', data);
                getBufferedView('config/customer/fields', function (view) {
                    var pane = $('#modal_public_pane');
                    pane.empty();
                    var html = view;
                    for (var i in item.stable_fields) {
                        html = html.replace(RegExp('__' + i, 'g'), item.stable_fields[i]);
                    }
                    html = html.replace(RegExp('__id', 'g'), item._id)
                    html = html.replace(RegExp('__[a-zA-Z]+', 'g'), "");
                    pane.html(html);
                    $("#showEditFieldsTemplateModal").modal();
                });
            },
            editFields: function (data, target) {
                var fields = {};
                for (var i in data) {
                    var item = data[i];
                    if (item != "") {
                        fields[i] = item;
                    }
                }
                var action = {
                    action: 'manager.customer.editFields',
                    data: {
                        fields: fields,
                        id: target.attr('template-id')
                    }
                }
                $('#showEditFieldsTemplateModal').modal('hide');
                sendAction(action, function (response) {
                    if (response.success) {
                        syncDicCache('custTmpls', response.id, 'stable_fields', fields);
                        handler.config.customer.showCustomerTemplate(response.id);
                    }
                });
            },
            uniqueName: function (data, target) {
                var item = getCache('custTmpls', data);
                var action = {
                    action: 'manager.customer.uniqueField',
                    data: {
                        id: data,
                        unique: !item.unique_name,
                        field: 'unique_name'
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        syncDicCache('custTmpls', data, 'unique_name', !item.unique_name);
                        target[0].checked = !item.unique_name;
                    }
                });
            },
            uniqueNum: function (data, target) {
                var item = getCache('custTmpls', data);
                var action = {
                    action: 'manager.customer.uniqueField',
                    data: {
                        id: data,
                        unique: !item.unique_phone,
                        field: 'unique_phone'
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        syncDicCache('custTmpls', data, 'unique_phone', !item.unique_phone);
                        target[0].checked = !item.unique_phone;
                    }
                });
            },
            allSource: function (data, src) {
                var item = getCache('custTmpls', data);
                var action = {
                    action: 'manager.customer.uniqueField',
                    data: {
                        id: data,
                        unique: !item.allSource,
                        field: 'allSource'
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        src[0].checked = !item.allSource;
                        var itt = getCache('custTmpls');
                        for (var i = 0; i < itt.length; i++) {
                            if (itt[i]._id == data) {
                                itt[i].allSource = !item.allSource;
                            }

                        }
                        //item.allSource = !item.allSource;
                    }
                });
            },
            followPlan: function (data, src) {
                var item = getCache('custTmpls', data);
                var action = {
                    action: 'manager.customer.uniqueField',
                    data: {
                        id: data,
                        unique: !item.followPlan,
                        field: 'followPlan'
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        src[0].checked = !item.followPlan;
                        var itt = getCache('custTmpls');
                        for (var i = 0; i < itt.length; i++) {
                            if (itt[i]._id == data) {
                                itt[i].followPlan = !item.followPlan;
                            }

                        }

                    }
                });
            },
            showOwner: function (data, src) {
                var item = getCache('custTmpls', data);
                var action = {
                    action: 'manager.customer.uniqueField',
                    data: {
                        id: data,
                        unique: !item.showOwner,
                        field: 'showOwner'
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        src[0].checked = !item.showOwner;
                        var itt = getCache('custTmpls');
                        for (var i = 0; i < itt.length; i++) {
                            if (itt[i]._id == data) {
                                itt[i].showOwner = !item.showOwner;
                            }

                        }

                    }
                });
            },
            callPop: function (data, target) {
                var item = getCache('custTmpls', data);
                var action = {
                    action: 'manager.customer.callPop',
                    data: {
                        id: data,
                        call_popup: !item.call_popup
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        syncDicCache('custTmpls', data, 'call_popup', !item.call_popup);
                        target[0].checked = !item.call_popup;
                    }
                });
            },
            showAddCustomField: function (data, target) {
                getBufferedView('config/customer/custom_field_add', function (view) {
                    var pane = target.parent();
                    pane.empty();
                    var html = view.replace(new RegExp('__id', 'g'), data);
                    pane.html(html);
                });
            },
            closeAddCustomField: function (data, target) {
                var pane = $("#add_custom_field_pane");
                pane.empty();
                pane.html('<span class="add-custom-field enabled action" ' +
                    'appaction="config.customer.showAddCustomField" ' +
                    'appdata="' + data + '">Add Custom field</span>');
            },
            plusCustomField: function (data, target) {
                var pane = target.closest("#field_attr_pane");
                var str = '<div class="row-select-box" style="position: relative;">' +
                    '<a class="reduce action" appaction="config.customer.reduceCustomField" appdata=""></a>' +
                    '<input class="select-box" type="text" name="choices[]" maxlength="60" style="height: 17px;">' +
                    '</div>';
                pane.append(str);
            },
            reduceCustomField: function (data, target) {
                target.closest('.row-select-box').remove();
            },
            addCustomField: function (data, target) {
                var template = getCache('custTmpls', data.template);
                data.required = data.required == 'yes';
                var action = {
                    action: 'manager.customer.addCustomField',
                    data: data
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        data._id = response._id;
                        template.custom_fields.push(data);
                        handler.config.customer.refreshCustomField(template);
                        handler.config.customer.closeAddCustomField(template._id);
                    }
                });
            },
            refreshCustomField: function (template) {
                var pane = $('#custom_fields_pane');
                pane.empty();

                getBufferedView('config/customer/custom_field_item', function (view) {
                    var html = '';
                    for (var i = 0; i < template.custom_fields.length; i++) {
                        var field = template.custom_fields[i];
                        html += view.replace(new RegExp('__name', 'g'), field.name).replace(new RegExp('__type', 'g'), field.type)
                            .replace(new RegExp('__template', 'g'), template._id).replace(new RegExp('__id', 'g'), field._id);
                    }
                    pane.html(html);
                });
            },
            deleteCustomField: function (data, target) {
                var action = {
                    action: 'manager.customer.deleteCustomField',
                    data: data
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        var template = getCache('custTmpls', data.template_id);
                        var fields = [];
                        var index = 0;
                        for (var i = 0; i < template.custom_fields.length; i++) {
                            var field = template.custom_fields[i];
                            if (data.field_id == field._id) {
                                continue;
                            } else {
                                fields[index++] = field;
                            }
                        }
                        template.custom_fields = fields;
                        target.closest('form#' + data.field_id).remove();
                    }
                });
            },
            showEditCustomField: function (data, target) {
                var template = getCache('custTmpls', data.template_id);
                var fields = template.custom_fields;
                var field = null;
                for (var i = 0; i < fields.length; i++) {
                    var a = fields[i];
                    if (a._id == data.field_id) {
                        field = a;
                        break;
                    }
                }
                if (field == null)
                    return;
                getBufferedView('config/customer/custom_field_edit', function (view) {
                    var pane = $('#add_custom_field_pane');
                    pane.empty();
                    var html = view.replace(new RegExp('__id', 'g'), data.template_id)
                        .replace(new RegExp('__field', 'g'), data.field_id);
                    pane.html(html);
                    pane.find('#field-name').val(field.name);
                    if (field.required) {
                        pane.find('#required')[0].checked = true;
                        pane.find('#un_required')[0].checked = false;
                    } else {
                        pane.find('#required')[0].checked = false;
                        pane.find('#un_required')[0].checked = true;
                    }
                    pane.find('#choose_custom_field_type').val(field.type);
                    if (field.choices) {
                        var choice = field.choices[0];
                        var pane1 = $("#field_attr_pane");
                        var str = '<div class="row-select-box" style="position: relative;">' +
                            '<a class="plus action" appaction="config.customer.plusCustomField" appdata=""></a>' +
                            '<input class="select-box" type="text" name="choices[]" maxlength="60" value="' + choice + '"' +
                            'style="height: 17px;">' +
                            '</div>';
                        for (var i = 1; i < field.choices.length; i++) {
                            choice = field.choices[i];
                            str += '<div class="row-select-box" style="position: relative;">' +
                                '<a class="reduce action" appaction="config.customer.reduceCustomField" appdata=""></a>' +
                                '<input class="select-box" type="text" name="choices[]" maxlength="60" value="' + choice + '"' +
                                'style="height: 17px;">' +
                                '</div>';
                        }
                        pane1.html(str);
                    }
                });
            },
            editCustomField: function (data, target) {
                var template = getCache('custTmpls', data.template_id);
                var fields = template.custom_fields;
                data.required = data.required == 'yes';
                var action = {
                    action: 'manager.customer.editCustomField',
                    data: data
                }
                var index = 0;
                for (var i = 0; i < fields.length; i++) {
                    var a = fields[i];
                    if (a._id == data._id) {
                        index = i;
                        break;
                    }
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        fields[index] = data;
                        handler.config.customer.refreshCustomField(template);
                        handler.config.customer.closeAddCustomField(template._id);
                    }
                });
            },
            moveCustomFieldUp: function (data, target) {
                if (target.hasClass('inactive'))
                    return;
                data.moveUp = true;
                var action = {
                    action: 'manager.customer.moveCustomField',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        var template = getCache('custTmpls', data.template_id);
                        var fields = template.custom_fields;
                        var index = 0;
                        for (var i = 0; i < fields.length; i++) {
                            var field = fields[i];
                            if (field._id == data.field_id) {
                                index = i;
                                break;
                            }
                        }
                        var temp = fields[index - 1];
                        fields[index - 1] = fields[index];
                        fields[index] = temp;
                        handler.config.customer.refreshCustomField(template);
                    }
                });
            },
            moveCustomFieldDown: function (data, target) {
                if (target.hasClass('inactive'))
                    return;
                data.moveUp = false;
                var action = {
                    action: 'manager.customer.moveCustomField',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        var template = getCache('custTmpls', data.template_id);
                        var fields = template.custom_fields;
                        var index = 0;
                        for (var i = 0; i < fields.length; i++) {
                            var field = fields[i];
                            if (field._id == data.field_id) {
                                index = i;
                                break;
                            }
                        }
                        var temp = fields[index + 1];
                        fields[index + 1] = fields[index];
                        fields[index] = temp;
                        handler.config.customer.refreshCustomField(template);
                    }
                });
            },
            config_customer_sync: function (data) {
                var action = {
                    action: 'manager.customer.queryCustomSync',
                    data: {accountId: session.account._id}
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        //这个过滤器，要移到 过滤器文件里
                        jc.filters.formElem = function (value) {
                            if (~value.indexOf("dropdown") || value === 'radio') {
                                return true;
                            }
                            return false;
                        }
                        var custTmpls = getCache("custTmpls");
                        var agents = getCache("minAgents");
                        var dicOptions = getCache('options');

                        var custom_fields = null;
                        var statusArr = null;
                        if (response.data.dbType == "") {
                            if (custTmpls.length > 0) {
                                custom_fields = custTmpls[0].custom_fields;
                                statusArr = jc.Array.objToArr(custTmpls[0].status);
                            } else {
                                alert('你还未添加客户数据，不能进行同步配置！');
                                return;
                            }
                        } else {
                            for (var i = 0; i < custTmpls.length; i++) {
                                if (response.data.dbType == custTmpls[i]._id) {
                                    custom_fields = custTmpls[i].custom_fields;
                                    statusArr = jc.Array.objToArr(custTmpls[i].status);
                                    break;
                                }
                            }
                        }

                        var data = {a: true, custTmpls: custTmpls, agents: agents, config: response.data,
                            selectData: response.data.dbType, custom_fields: custom_fields, dicOptions: dicOptions, statusArr: statusArr};
                        jc.render(data, "config/customer/config_customer_sync_detail", $('#config_customer_sync_pane'), function (th) {
                        });
                    } else {
                        utils.showError('获取客户同步配置失败！');
                    }
                });
            },
            change_sync_cust_tmpl_select: function (tmplId) {
                if (tmplId == '' || !tmplId) {
                    $("#config_customer_sync_cust_field_reuse_config").empty();
                    return;
                }
                var custTmpls = getCache("custTmpls");
                var custom_fields = null;
                for (var i = 0; i < custTmpls.length; i++) {
                    if (tmplId == custTmpls[i]._id) {
                        custom_fields = custTmpls[i].custom_fields;
                        break;
                    }
                }
                var oriData = jc.th($("#config_customer_sync_pane")).data();
                var reuseData = null;
                if (tmplId == oriData.config.dbType) {
                    reuseData = jc.mix(true, {}, oriData);
                    reuseData.custom_fields = custom_fields;
                } else {
                    reuseData = jc.mix(true, {}, jc.th($("#config_customer_sync_pane")).data());
                    reuseData.custom_fields = custom_fields;
                    delete reuseData.config;
                }

                jc.th($("#config_customer_sync_pane")).reRender("reuse1", reuseData);
            },
            save_config_customer_sync: function (data) {
                if (!data.enable) {
                    data.enable = true;
                }
                data.accountId = session.account._id;
                var action = {
                    action: 'manager.customer.saveCustomSync',
                    data: data
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        utils.showSucc('保存客户同步配置成功！');
                        handler.config.customer.config_customer_sync();
                    } else {
                        utils.showError('保存客户同步配置失败！');
                    }
                });
            },
            start_customer_sync: function (data) {
                var action = {
                    action: 'manager.customer.startCustomSync',
                    data: {accountId: session.account._id}
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        utils.showSucc('开始同步客户资料成功！');
                        handler.config.customer.config_customer_sync();
                    } else {
                        if (response.code) {
                            response.code == '499';
                            utils.showError('请先保存配置，再开始同步客户资料！');
                        } else {
                            utils.showError('开始同步客户资料失败！');
                        }
                    }
                });
            },
            stop_customer_sync: function (data) {
                var action = {
                    action: 'manager.customer.stopCustomSync',
                    data: {accountId: session.account._id}
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        utils.showSucc('停止同步客户资料成功！');
                        handler.config.customer.config_customer_sync();
                    } else {
                        if (response.code) {
                            response.code == '499';
                            utils.showError('请先保存配置，再停止同步客户资料！');
                        } else {
                            utils.showError('停止同步客户资料失败！');
                        }
                    }
                });

            }
        },
        role: {
            privalgeAlias: function (role) {
                if (!role) return "";
                var menu = role.menu || [];
                var funcs = role.func || [];
                if (menu.length == 0 && funcs.length == 0) {
                    return '';
                }
//            var keys=role.split(",");
                var rstr = '', dic = getCache('allmenu');
                for (var i = 0; i < menu.length; i++) {
                    var t = dic['' + menu[i]];
                    if (t) {
                        rstr += t + ',';
                    }
                }
                for (var i = 0; i < funcs.length; i++) {
                    if (funcs[i] == 'knowledge') {
                        rstr += '知识库,';
                    }
                }
                if (rstr && rstr.lastIndexOf(",") != -1) {
                    rstr = rstr.substring(0, rstr.length - 1);


                }
                return rstr;
            },
            config_authority: function (data) {
                var self = this;
                getBufferedView('config/role/config_role_item', function (html) {
                    var action = {
                        action: 'manager.queryRole',
                        data: {accountId: session.user.accountId}
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var roles = response.list;
                            var itemHtml = '';


                            for (var i = 0; i < roles.length; i++) {
                                var role = roles[i];
                                role.menu = handler.config.role.privalgeAlias(role);
                                itemHtml += render.renderConfigRole(role, html);
                            }
                            $('#role_list_pane').html(itemHtml);
                            var searchDiv = $('#role_list_pane').closest('.left-column').find('.contacts_caption .input-append');
                            searchDiv.find('input').keydown(function (event) {
                                if (event.keyCode == 13) {
                                    event.preventDefault();
                                    event.stopImmediatePropagation();
                                    searchDiv.find('.do_action').click();
                                }
                            });
                            $(".contact_list span.result_count").text(response.count);
                            var list = $(".contact_list .role_list_page li");
                            updatePagination(list, response.count, 10, 1);
                            resize();
                        }
                    });
                });
//                });
            },

            checkRoleused: function (data) {
                var user = getCache("minAgents");
                var cc = [];

                for (var m = 0; m < user.length; m++) {

                    for (var k = 0; k < user[m].role.length; k++) {
                        var n = user[m].role[k];
                        cc.push(n);
                    }
                }
                for (var c = 0; c < cc.length; c++) {
                    if (data === cc[c]) {
                        return true;
                    }
                }
                return false;
            },

            delRoleView: function (data) {

                var con = confirm("确定要删除该角色吗？");
                if (!con) {
                    return false;
                }
                var cc = handler.config.role.checkRoleused(data._id);

                if (cc == false) {
                    var action = {
                        //action是页面选择跳转
                        action: 'manager.delRole',
                        data: {_id: data._id, accountId: session.user.accountId}
                    };
                } else {
                    alert("权限被应用，不能被删除！");
                    return false;
                }
                sendAction(action, function (response) {
                    if (response.success) {
                        alert('删除成功！！');
                        handler.config.role.config_authority(data);
                    } else {
                        alert('删除失败！！');
                    }
                });
            },

            queryRoleList: function (data, obj) {
                var parent = $('#view_config_authority');
                var pane = $("#role_detail_pane");
                var page = 1;
                if (obj && !obj.hasClass("do_action"))page = obj.val();
                getBufferedView('config/role/config_role_item', function (html) {
                    var action = {
                        action: 'manager.queryRole',
                        data: {accountId: session.user.accountId, display_name: data.displayName, page: page}
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var roles = response.list;
                            var itemHtml = '';
                            for (var i = 0; i < roles.length; i++) {
                                var role = roles[i];
                                role.menu = handler.config.role.privalgeAlias(role);
                                itemHtml += render.renderConfigRole(role, html);
                            }
                            $('#role_list_pane', parent).html(itemHtml);
                            $(".config_role_count span.result_count", parent).text(response.count);
                            var list = $(".config_role_count .role_list_page li", parent);

                            updatePagination(list, response.count, 10, page);
                            resize();
                        }
                    });
                });
            },
            showRoleAdd: function (data) {
                getBufferedView('config/role/config_role_add', function (view) {
                    var pane = $("#role_detail_pane");
                    pane.empty();
                    pane.html(view);
                    var action = {
                        action: 'manager.showRoleAdd',
                        data: {}
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var menus = response.data;
                            var html1 = '<ul>';
                            var html2 = '';
                            var html3 = '';
                            var html4 = '';
                            for (var i = 0; i < menus.length; i++) {
                                var menu = menus[i];
                                if (menu.type == 'node') {
                                    html1 += '<li onclick="handler.menuListClik(this)" sign=\"' + menu.id + '\"><label class="checkbox">' + menu.name + '</label></li>';
                                    html2 += "<ul style='display: none;' class=\"" + menu.id + "_menuEdit" + "\">";
                                    for (var j = 0; j < menu.children.length; j++) {
                                        var child1 = menu.children[j];
                                        if (child1.type == 'node') {
//                                            if(child1.id=='config')continue;
                                            html2 += '<li onclick="handler.menuListClik(this)" sign=\"' + child1.id + '\"><label class="checkbox">' + child1.name + '</label></li>';
                                            html3 += "<ul style='display: none;' class=\"" + child1.id + "_menuEdit" + "\">";
                                            for (var k = 0; k < child1.children.length; k++) {
                                                var child2 = child1.children[k];
                                                if (child1.id == 'config') {
                                                    var showMenu = ["config_user", "config_department", "config_ivr"];
                                                    if ($.inArray(child2.id, showMenu) == -1) {
                                                        continue;
                                                    }
                                                }
                                                if (child2.type == 'node') {
                                                    html3 += '<li onclick="handler.menuListClik(this)" sign=\"' + child2.id + '\"><label class="checkbox">' + child2.name + '</label></li>';
                                                    html4 += "<ul style='display: none;' class=\"" + child2.id + "_menuEdit" + "\">";
                                                    for (var l = 0; l < child2.children.length; l++) {
                                                        var child3 = child2.children[l];
                                                        html4 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + child3.id + '"/>' + child3.name + '</label></li>';

                                                    }
                                                    html4 += '</ul>';
                                                } else {
                                                    html3 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + child2.id + '"/>' + child2.name + '</label></li>';
                                                }
                                            }
                                            html3 += "</ul>";
                                        } else {
                                            html2 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + child1.id + '"/>' + child1.name + '</label></li>';
                                        }
                                    }
                                    html2 += '</ul>';
                                } else {
                                    html1 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + menu.id + '"/>' + menu.name + '</label></li>';
                                }
                            }
                            html1 += '</ul>';
                            $('.menuAcceList1', pane).html(html1);
                            $('.menuAcceList2', pane).html(html2);
                            $('.menuAcceList3', pane).html(html3);
                            $('.menuAcceList4', pane).html(html4);

                            /*功能权限*/
                            var funcs = role.func || [];
                            var funcLength = funcs.length;
                            var funcPane = pane.find('#func_fun_list');
                            for (var i = 0; i < funcLength; i++) {
                                funcPane.find("input:checkbox[value=" + funcs[i] + "]").attr('checked', 'true');
                            }

                            resize();
                        }

                    });
                });
            },
            saveRole: function (data) {
                if (!data.menu)data.menu = [];
                data.accountId = session.user.accountId;
                var action = {
                    action: "manager.addRole",
                    data: data
                };
                sendAction(action, function (rep) {
                    if (rep.success) {
                        alert('增加角色成功！');
                        addCache('roles', rep.data);
                        $("#role_detail_pane").empty();
                        handler.config.role.config_authority();
                    } else {
                        alert(rep.message);
                    }
                })
            },
            updateRole: function (data) {
                if (!data.menu) data.menu = [];
                if (!data.func) data.func = [];
                data.accountId = session.user.accountId;

                var action = {
                    action: "manager.updateRole",
                    data: data
                };
                sendAction(action, function (rep) {
                    if (rep.success) {
                        alert('修改角色成功！');
                        updateCache('roles', data._id, data);
                        $("#role_detail_pane").empty();
                        handler.config.role.config_authority();
                    }
                })
            },
            showRoleView: function (data, src) {
                getBufferedView('config/role/config_role_edit', function (view) {
                    var pane = $("#role_detail_pane");
                    pane.empty();
                    pane.html(view);
                    var action = {
                        action: 'manager.showRoleEdit',
                        data: {_id: data._id}
                    };
                    sendAction(action, function (response) {
                        if (response.success) {
                            var role = response.role;
                            $("#frm_role_edit").find("input[name=display_name]").val(role.display_name);
                            $("#frm_role_edit").find("input[name=_id]").val(data._id);
                            var menus = response.data;
                            var html1 = '<ul>';
                            var html2 = '';
                            var html3 = '';
                            var html4 = '';
                            for (var i = 0; i < menus.length; i++) {
                                var menu = menus[i];
                                if (menu.type == 'node') {
                                    html1 += '<li onclick="handler.menuListClik(this)" sign=\"' + menu.id + '\"><label class="checkbox">' + menu.name + '</label></li>';
                                    html2 += "<ul style='display: none;' class=\"" + menu.id + "_menuEdit" + "\">";
                                    for (var j = 0; j < menu.children.length; j++) {
                                        var child1 = menu.children[j];
                                        if (child1.type == 'node') {
//                                            if(child1.id=='config')continue;
                                            html2 += '<li onclick="handler.menuListClik(this)" sign=\"' + child1.id + '\"><label class="checkbox">' + child1.name + '</label></li>';
                                            html3 += "<ul style='display: none;' class=\"" + child1.id + "_menuEdit" + "\">";
                                            for (var k = 0; k < child1.children.length; k++) {
                                                var child2 = child1.children[k];
                                                if (child1.id == 'config') {
                                                    var showMenu = ["config_user", "config_department", "config_ivr"];
                                                    if ($.inArray(child2.id, showMenu) == -1) {
                                                        continue;
                                                    }
                                                }
                                                if (child2.type == 'node') {
                                                    html3 += '<li onclick="handler.menuListClik(this)" sign=\"' + child2.id + '\"><label class="checkbox">' + child2.name + '</label></li>';
                                                    html4 += "<ul style='display: none;' class=\"" + child2.id + "_menuEdit" + "\">";
                                                    for (var l = 0; l < child2.children.length; l++) {
                                                        var child3 = child2.children[l];
                                                        if (role.menu && $.inArray(child3.id, role.menu) != -1) {
                                                            html4 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" checked name="menu[]" value="' + child3.id + '"/>' + child3.name + '</label></li>';
                                                        } else {
                                                            html4 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + child3.id + '"/>' + child3.name + '</label></li>';
                                                        }
                                                    }
                                                    html4 += '</ul>';
                                                } else {
                                                    if (role.menu && $.inArray(child2.id, role.menu) != -1) {
                                                        html3 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" checked name="menu[]" value="' + child2.id + '"/>' + child2.name + '</label></li>';
                                                    } else {
                                                        html3 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + child2.id + '"/>' + child2.name + '</label></li>';
                                                    }
                                                }

                                            }
                                            html3 += "</ul>";
                                        } else {
                                            if (role.menu && $.inArray(child1.id, role.menu) != -1) {
                                                html2 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" checked name="menu[]" value="' + child1.id + '"/>' + child1.name + '</label></li>';
                                            } else {
                                                html2 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + child1.id + '"/>' + child1.name + '</label></li>';
                                            }
                                        }
                                    }
                                    html2 += '</ul>';
                                } else {
                                    if (role.menu && $.inArray(menu.id, role.menu) != -1) {
                                        html1 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" checked name="menu[]" value="' + menu.id + '"/>' + menu.name + '</label></li>';
                                    } else {
                                        html1 += '<li><label class="checkbox"><input fieldgroup="1" type="checkbox" name="menu[]" value="' + menu.id + '"/>' + menu.name + '</label></li>';
                                    }
                                }
                            }
                            html1 += '</ul>';


                            $('.menuAcceList1').html(html1);
                            $('.menuAcceList2').html(html2);
                            $('.menuAcceList3').html(html3);
                            $('.menuAcceList4').html(html4);
                            /*功能权限*/
                            var funcs = role.func || [];
                            var funcLength = funcs.length;
                            var funcPane = pane.find('#func_fun_list');
                            for (var i = 0; i < funcLength; i++) {
                                funcPane.find("input:checkbox[value=" + funcs[i] + "]").attr('checked', 'true');
                            }

                            resize();
                        }
                    });
                });
            }
        },
        interfaceUrl: {
//            config_interface: function (id) {
//                handler.config.interfaceUrl.refreshInterfaceField();
//                handler.config.call.refreshField();
//                handler.config.call.refreshCallInter();
//            },
//            showAddInferface: function () {
//                getBufferedView("config/interfaceUrl/add_config_interface", function (view) {
//                    var pane = $("#config_interface_container");
//                    pane.empty();
//                    pane.html(view);
//                });
//            },
//            saveInterfaceFields: function (data, src) {
//                var action = {
//                    action: "config.interfaceUrl.addInterfaceFields",
//                    data: data
//                };
//                sendAction(action, function (response) {
//                    if (response.success) {
//                        $("#config_interface_container").empty();
//                        handler.config.interfaceUrl.refreshInterfaceField();
//                    }
//                });
//            },
//            cancelInterfaceFields: function () {
//                $("#config_interface_container").empty();
//            },
//            refreshInterfaceField: function () {
//                var pane = $('#config_interface_pane');
//                pane.empty();
//                getBufferedView('config/interfaceUrl/config_interface_item', function (view) {
//                    var action = {
//                        action: 'config.interfaceUrl.queryInterfaceFields'
//                    };
//                    sendAction(action, function (response) {
//                        if (response.success) {
//                            var list = response.data;
//                            session.interfaceUrls = {};
//                            var html = "";
//                            for (var i = 0; i < list.length; i++) {
//                                var item = list[i];
//                                session.interfaceUrls[item._id] = item;
//                                html += render.replaceDataByObject(list[i], view);
//                            }
//                            $("#config_interface_pane").empty();
//                            $("#config_interface_pane").html(html);
//                        }
//                    })
//                });
//            },
//            delInterfaceFields: function (data, src) {
//                if (confirm("确认删除？")) {
//                    var action = {
//                        action: 'config.interfaceUrl.delInterfaceFields',
//                        data: {"_id": data}
//                    };
//                    sendAction(action, function (response) {
//                        if (response.success) {
//                            delete session.interfaceUrls[data];
//                            src.closest('tr#' + data).remove();
//                        }
//                    })
//                }
//            },
//            showEditInterfaceFields: function (data, src) {
//                var item = session.interfaceUrls[data];
//                if (!item) {
//                    alert('该行内容已经被删除!');
//                    return;
//                }
//                getBufferedView('config/interfaceUrl/edit_config_interface', function (view) {
//                    view = render.replaceDataByObject(item, view);
//                    var pane = $("#config_interface_container");
//                    pane.empty();
//                    pane.html(view);
//                })
//            },
//            editInterfaceFields: function (data, src) {
//                var action = {
//                    action: "config.interfaceUrl.editInterfaceFields",
//                    data: data
//                };
//                sendAction(action, function (response) {
//                    if (response.success) {
//                        $("#config_interface_container").empty();
//                        handler.config.interfaceUrl.refreshInterfaceField();
//                    } else {
//                        alert('更新失败!');
//                    }
//                });
//            },
//            moveInterfaceFieldUp: function (data) {
//                var action = {
//                    action: 'config.interfaceUrl.moveInterfaceField',
//                    data: {"moveup": true, "_id": data}
//                };
//                sendAction(action, function (response) {
//                    if (response.success) {
//                        handler.config.interfaceUrl.refreshInterfaceField();
//                    }
//                });
//            },
//            moveInterfaceFieldDown: function (data) {
//                var action = {
//                    action: 'config.interfaceUrl.moveInterfaceField',
//                    data: {"moveup": false, "_id": data}
//                };
//                sendAction(action, function (response) {
//                    if (response.success) {
//                        handler.config.interfaceUrl.refreshInterfaceField();
//                    }
//                });
//            }
        },
        cdr: {
            currentConfigs: null,
            getQualityCheckConfigs: function () {
                var configs = getCache('qualityCheckConfig');
                configs = configs.sort(function (a, b) {
                    if (parseInt(b.WEIGHT) != parseInt(a.WEIGHT)) {
                        return parseInt(b.WEIGHT) - parseInt(a.WEIGHT);
                    } else {
                        return parseInt(b.ORDER) - parseInt(a.ORDER);
                    }
                });
                return configs;
            },
            config_quality_check: function (data) {
                var action = {
                    action: 'config.cdr.queryQualityCheckConfig',
                    data: {
                        ACCOUNT: session.user.accountId
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        var configs = response.list;
                        handler.config.cdr.currentConfigs = configs;
                        if (configs.length > 0) {
                            getBufferedView("config/cdr/quality_check_config_item", function (view) {
                                var config = null;
                                var html = [];
                                for (var i = 0, len = configs.length; i < len; i++) {
                                    config = configs[i];
                                    html.push(render.renderMethodView(view, config));
                                }
                                var pane = $("#config_quality_check_pane");
                                pane.empty();
                                pane.html(html.join(''));
                            });
                        } else {
                            $("#config_quality_check_pane").html('');
                        }
                    } else {
                        $("#config_quality_check_pane").html('');
                    }
                });
            },
            showAddQualityCheckConfig: function (data) {
                getBufferedView("config/cdr/add_quality_check_config", function (view) {
                    var pane = $("#config_quality_check_container");
                    pane.empty();
                    pane.html(view);
                });
            },
            saveQualityCheckConfig: function (data) {
                var weight = data.WEIGHT;
                if (!/^\d+$/.test(weight) || weight == '0' || /^0/.test(weight)) {
                    alert('请正确填写权重：1至100之间的整数');
                    return false;
                }
                var configs = handler.config.cdr.currentConfigs;
                var weightAmount = 0;
                var config = null;
                for (var ind in configs) {
                    config = configs[ind];
                    if (config._id != data._id) {
                        weightAmount += parseInt(config.WEIGHT);
                    }
                }
                weightAmount += parseInt(weight);

                if (weightAmount > 100) {
                    alert('所有质检项权重之和已大于100，请先调整已有的权重');
                    return false;
                }

                var action = {
                    action: 'config.cdr.saveQualityCheckConfig',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        handler.config.cdr.config_quality_check();
                        $("#config_quality_check_container").html('');
                    } else {
                        alert('保存失败，请重新保存');
                    }
                });
            },
            confirmDelQualityConfig: function (data) {
                getBufferedView('config/cdr/confirm_delete_quality_config', function (view) {
                    var panel = $('#confirm_del_quality_config_pane');
                    panel.html('');
                    view = view.replace(/__doDeleteButton/g, "<a class='btn btn-danger action' appaction='config.cdr.deleteQualityCheckConfig' appdata='" + data + "'>确认删除</a>");

                    panel.append(view);
                    $('#confirm_del_quality_config_Modal').modal();
                });
            },
            deleteQualityCheckConfig: function (data) {
                var action = {
                    action: 'config.cdr.deleteQualityCheckConfig',
                    data: {
                        _id: data
                    }
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        handler.config.cdr.config_quality_check();
                        alert('删除质检项成功！');
                    } else {
                        alert('删除失败，请重试');
                    }
                });
            },
            cancelQualityCheckConfig: function () {
                $("#config_quality_check_container").html('');
            },
            showEditQualityCheckConfig: function (data) {
                var configs = handler.config.cdr.currentConfigs;
                var config = null;
                for (var ind in configs) {
                    config = configs[ind];
                    if (config._id == data) {
                        break;
                    }
                }
                if (config) {
                    getBufferedView("config/cdr/add_quality_check_config", function (view) {
                        var pane = $("#config_quality_check_container");
                        pane.empty();
                        pane.html(view);
                        objectToForm($('#config_quality_config_update_form'), config);
                    });
                } else {
                    alert('此配置项已无效');
                    handler.config.cdr.config_quality_check();
                }
            }
        },
        call: {
//            refreshField: function () {
//                var pane = $('#config_callUrl_pane');
//                pane.empty();
//                getBufferedView('config/call/config_callUrl_item', function (view) {
//                    var action = {
//
//
//                        action: 'config.callUrl.queryCallUrlFields'
//                    };
//                    sendAction(action, function (response) {
//                        if (response.success) {
//                            var list = response.data;
//                            session.callUrls = {};
//                            var html = "";
//                            for (var i = 0; i < list.length; i++) {
//                                var item = list[i];
//                                if (item) {
//                                    item.name = (item.name ? item.name : "");
//                                    session.callUrls[item._id] = item;
//                                    html += render.call.renderList(view, item);
//                                }
//                            }
//                            pane.html(html);
//                        }
//                    })
//                });
//            },
//            showAddcallUrl: function () {
//                getBufferedView("config/call/add_config_url", function (view) {
//                    var pane = $("#config_callUrl_container");
//                    pane.empty();
//                    pane.html(view);
//                    $("#field_type").html(render.call.renderSelectOption());
//                });
//            },
//            saveCallUrlFields: function (data, src) {
//                var action = {
//                    action: "config.callUrl.addCallUrlFields",
//                    data: data
//                };
//                sendAction(action, function (response) {
//                    if (response.success) {
//                        $("#config_callUrl_container").empty();
//                        handler.config.call.refreshField();
//                    }
//                });
//            },
//            showEditFields: function (data, src) {
//                var item = session.callUrls[data];
//                if (!item) {
//                    alert('该行内容已经被删除!');
//                    return;
//                }
//                getBufferedView('config/call/edit_config_url', function (view) {
//                    view = render.replaceDataByObject(item, view);
//                    var pane = $("#config_callUrl_container");
//                    pane.empty();
//                    pane.html(view);
//                    $("#field_type").html(render.call.renderSelectOption());
//                    $("#field_type").val(item.type);
//                });
//            },
//            delFields: function (data, src) {
//                if (confirm("确认删除？")) {
//                    var action = {
//                        action: 'config.callUrl.delCallUrlFields',
//                        data: {"_id": data}
//                    };
//                    sendAction(action, function (response) {
//                        if (response.success) {
//                            handler.config.call.refreshField();
//                        }
//                    })
//                }
//            },
//            cancelFields: function () {
//                $("#config_callUrl_container").empty();
//            },
//            editCallUrlFields: function (data, src) {
//                var action = {
//                    action: "config.callUrl.editCallUrlFields",
//                    data: data
//                };
//                sendAction(action, function (response) {
//                    if (response.success) {
//                        $("#config_callUrl_container").empty();
//                        handler.config.call.refreshField();
//                    } else {
//                        alert('更新失败!');
//                    }
//                });
//            },
//            //---------add by qiaoqian---------
//            showAddCallInter: function () {
//                getBufferedView("config/call/add_call_inter", function (view) {
//                    var pane = $("#config_call_inter_container");
//                    pane.empty();
//                    pane.html(view);
//                })
//            },
//            saveAddCallInter: function (data) {
//                var callInterList = getCache("callInters");
//                for (var i = 0; i < callInterList.length; i++) {
//                    if (callInterList[i].callInterName == data.callInterName) {
//                        utils.showError("已存在描述" + data.callInterName + ",请修改!");
//                        return;
//                    }
//                }
//                handler.config.call.saveCallInter(data, function (response) {
//                    $("#config_call_inter_container").empty();
//                    handler.config.call.refreshCallInter();
//                });
//            },
//            saveCallInter: function (data, callback) {
//                var action = {
//                    action: "config.callInter.addOrEditCallInter",
//                    data: data
//                }
//                sendAction(action, function (response) {
//                    if (!response.success) {
//                        utils.showError(response.message);
//                        return;
//                    }
//                    callback(response);
//                })
//            },
//            showEditCallInter: function (data) {
//                var action = {
//                    data: {_id: data},
//                    action: "config.callInter.queryCallInter"
//                }
//                sendAction(action, function (queryData) {
//                    if (!queryData.success) {
//                        utils.showError("获取对接数据失败!");
//                        return;
//                    }
//                    var callInterData = queryData.listData[0];
//                    if (callInterData) {
//                        getBufferedView("config/call/edit_call_inter", function (view) {
//                            var editPane = $("#config_call_inter_container");
//                            editPane.empty();
//                            view = render.call.renderEditCallInter(view, callInterData);
//                            editPane.html(view);
//                        })
//                    } else {
//                        utils.showError("获取缓存失败!");
//                        return;
//                    }
//                })
//            },
//            saveEditCallInter: function (data) {
//                var callInterId = data._id
//                handler.config.call.saveCallInter(data, function (response) {
//                    $("#config_call_inter_container").empty();
//                    handler.config.call.refreshCallInter();
//                    var paneHtml = $("#edit_call_inter_item_body").html();
//                    var appHtml = render.call.renderCallInterTable(paneHtml, response.itemName, response.itemUrl, response.itemId);
//                    $("#edit_call_inter_item_body").html(appHtml);
//                });
//            },
//            removeCallInter: function (data) {
//                if (confirm("确认删除？")) {
//                    var action = {
//                        action: 'config.callInter.delCallInter',
//                        data: {"_id": data}
//                    };
//                    sendAction(action, function (response) {
//                        if (!response.success) {
//                            utils.showError("删除失败!");
//                            return;
//                        }
//                        $("#config_call_inter_container").empty();
//                        handler.config.call.refreshCallInter();
//                    })
//                }
//            },
//            cancelDoCallInter: function () {
//                $("#config_call_inter_container").empty();
//            },
//            refreshCallInter: function () {
//                var pane = $('#config_call_inter_pane');
//                pane.empty();
//                var queryData = {
//                    accountId: session.user.accountId
//                }
//                getBufferedView('config/call/config_call_inter', function (view) {
//                    var action = {
//                        data: queryData,
//                        action: 'config.callInter.queryCallInter'
//                    };
//                    sendAction(action, function (response) {
//                        if (response.success) {
//                            var listData = response.listData;
//                            if (listData && listData.length > 0) {
//                                var html = "";
//                                for (var i = 0; i < listData.length; i++) {
//                                    var item = listData[i];
//                                    html += render.call.renderCallInterList(view, item);
//                                }
//                                pane.html(html);
//                            }
//                        }
//                    })
//                });
//            },
            getCallInterItem: function (data, callback) {
                var action = {
                    data: {_id: data},
                    action: "config.callInter.queryCallInter"
                }
                sendAction(action, function (queryRes) {
                    if (!queryRes.success) {
                        utils.showError("查询弹屏对接历史失败!");
                        return;
                    }
                    callback(queryRes);
                })
            }
            //-----------end by qiaoqian-------------
        },
        //新媒体客服 write by B9
        newMedia: {},
        report: {},
    },
    menuListClik: function (event) {
        var target = $(event);

        var parent = target.closest('.menuAcceListDiv');
        if (target.attr('flag') == 'source') {
            parent = target.closest('.sourceListDiv');
        }
        var sgid = target.attr("sign") + '_menuEdit';
        var lindiv = target.closest("div").next();
        target.closest("div").find("li").css("background-color", "white");
        target.css("background-color", "#ffecec");
        lindiv.find("ul").css("display", "none");
        lindiv.nextAll().find("ul").css("display", "none");
        parent.find("." + sgid).css('display', 'block');

    },
    sms: {
        showAddSmsTemplate: function (data) {
            getBufferedView('sms/sms_add_template', function (view) {
                view = view.replace(/__number/g, data);
                var pane = $('#sms_add');
                pane.empty();
                pane.html(view);
                $("#sms_number").val(data);
            });
        },
        addSmsTemplate: function (data, target) {
            data.accountId = session.user.accountId;
            data.userId = session.user._id;
            var action = {
                action: 'app.sms.addSmsTemplate',
                data: data
            }
            sendAction(action, function (rep) {
                if (rep.success) {
                    $('#sms_add').modal('hide');
                    utils.showSucc("发送成功!");
                    handler.sms_record(null);
                } else {
                    $('#sms_add').modal('hide');
                    utils.showError("发送失败!");
                }
            })
        },
        splitSms: function (txId, showNumId) {
            var content = $("#" + txId).val();
            $("#" + showNumId).text(content.length);
        },
        smsRecordQueryData: function (data, src) {
            data.accountId = session.user.accountId;
            data.page = src.val() || 1;
            data.pageSize = 5;
            var pane = $('#sms_record_list_pane');
            pane.empty();
            getBufferedView('sms/sms_record_list_item', function (userListView) {
                var action = {
                    action: 'app.sms.smsRecordQuery',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        var smsList = response.list;
                        var itemHtml = '';
                        for (var i = 0; i < smsList.length; i++) {
                            var sms = smsList[i];
                            itemHtml += render.renderSmsRecordListItem(sms, userListView).replace(/__no/g, (i + 1));
                        }
                        $('#sms_record_list_pane').html(itemHtml);
                        $(".class_list span.result_count").text(response.count);
                        var list = $(".class_list #sms_record_list_index li");
                        updatePagination(list, response.count, 5, data.page);
                        $("#sms_record_list_page").val(data.page);
                        resize();
                    }
                });
            });
        },
        showAddGroupSmsTemplate: function (data) {
            getBufferedView('sms/group_sms_add', function (view) {
                view = view.replace(/__number/g, data);
                var pane = $('#group_sms_add');
                pane.empty();
                pane.html(view);
            });
        },
        uploaded: function (evt) {
            var res = $.parseJSON(evt.target.responseText);
            if (res.filePath) {
                var data = {};
                data.path = res.filePath;
                data.account = session.user.accountId;
                var action = {
                    action: 'app.sms.groupSmsUpload',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        var uploadMess = $("#group_sms_uploadMess");
                        uploadMess.text('文件已上传');
                        uploadMess.css("display", "block");

                        var allowSendNum = response.allowSendNum;
                        var failNum = response.failNum;

                        $("#group_sms_uploadNumber").html(allowSendNum);
                        $("#group_sms_failNumber").html(failNum);
                        $("#group_sms_path").val(response.path);
                        $("#group_sms_number").css("display", "block");
                    } else {
                        var uploadMess = $("#group_sms_uploadMess");
                        uploadMess.text('上传失败');

                        $("#group_sms_number").css("display", "none");
                    }
                });
            } else {
                handler.sms.uploadError();
            }
        },
        uploadError: function () {
            console.dir("uploadError");
        },
        uploadProgressing: function (evt) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            console.info(percentComplete);
        },
        groupSmsAdd: function (data, target) {
            data.accountId = session.user.accountId;
            data.userId = session.user._id;
            var action = {
                action: 'app.sms.groupSmsAdd',
                data: data
            }
            if ($("#group_sms_path").val() == "") {
                alert("请上传号码文件!");
                return;
            }
            if ($("#group_sms_uploadNumber").html() == "0") {
                alert("请上传正确格式的号码文件!");
                return;
            }
            sendAction(action, function (rep) {
                if (rep.success) {
                    $('#group_sms_add').modal('hide');
                    utils.showSucc("发送成功!");
                    handler.group_sms_page(null);
                } else {
                    $('#group_sms_add').modal('hide');
                    utils.showError("发送失败!");
                }
            })
        },
        groupSmsRecordQueryData: function (data, src) {
            data.accountId = session.user.accountId;
            data.page = src.val() || 1;
            data.pageSize = 5;
            var pane = $('#group_sms_list_pane');
            pane.empty();
            getBufferedView('sms/group_sms_list_item', function (userListView) {
                var action = {
                    action: 'app.sms.groupSmsRecordQuery',
                    data: data
                };
                sendAction(action, function (response) {
                    if (response.success) {
                        var groupSmsList = response.list;
                        var itemHtml = '';
                        for (var i = 0; i < groupSmsList.length; i++) {
                            var groupSms = groupSmsList[i];
                            itemHtml += render.renderGroupSmsRecordListItem(groupSms, userListView);
                        }
                        $('#group_sms_list_pane').html(itemHtml);
                        $(".class_list span.result_count").text(response.count);
                        var list = $(".class_list #group_sms_record_list_index li");
                        updatePagination(list, response.count, 5, data.page);
                        $("#group_sms_record_list_page").val(data.page);
                        resize();
                    }
                });
            });
        },
        showGroupSmsErrorList: function (data, src) {
            var actionData = {};
            actionData.path = data;
            var action = {
                action: 'app.sms.showGroupSmsErrorList',
                data: actionData
            };
            sendAction(action, function (response) {
                if (response.success) {
                    var uploadError = response.uploadError;
                    var sendError = response.sendError;
                    if (uploadError.length > 0) {
                        var str = "";
                        for (var i = 0; i < uploadError.length; i++) {
                            str += (uploadError[i] + "<br/>");
                        }
                        $("#group_sms_error_upload").css("display", "block");
                        $("#group_sms_error_upload_list").html(str);
                    }
                    if (sendError.length > 0) {
                        var str = "";
                        for (var i = 0; i < sendError.length; i++) {
                            str += (sendError[i] + "<br/>");
                        }
                        $("#group_sms_error_send").css("display", "block");
                        $("#group_sms_error_send_list").html(str);
                    }
                }
                $('#group_sms_error_list').modal('show');
            });
        }
    },
    call: {
//        calls: [],
//        limit: 19,
//        curCallId: "",
//        incoming_call: function (id) {
//            //softphonebar_test('10019');
//        },
//        incomingCall: function (callObject) {
//            var business = {id: "", callType: "normal", url: ""};
//            var callId = callObject.callSheetId;
//            var callNo = callObject.originCallNo;
//            var self = handler.call;
//            if (utils.contains(self.calls, callId))
//                return;
//            handler.call.loadUrlAndType(callObject.queue, business);
//            var length = self.calls.length;
//            var call_left = $("#call_list_pane");
//            var call_right = $("#call_detail_pane");
//            var paneId = callId + "_popup";
//            self.calls.push(callId);
//            var isFirst = false;
//            if (length < 1) {
//                isFirst = true;
//                call_left.empty();
//                call_right.empty();
//            }
//            getBufferedView("contact_item", function (view) {
//                console.log(callObject);
//                view = render.renderCallListPaneItem(callObject, view);
//                if (!$("#" + paneId)[0]) {
//                    var div = "<div id=\"" + paneId + "\" submit=\"false\" style=\"display:none\"></div>";
//                    call_right.append(div);
//                }
//                call_left.html(view + call_left.html());
//                $("#" + callId).css("display", "block");
//                call_left.find(".accordion-heading").click(function (e) {
//                    var target = $(e.currentTarget);
//                    var left_ele = call_left.find("#" + target.attr("detailId") + " .content_item_head");
//                    left_ele.removeClass("item_bg_up");
//                    left_ele.addClass("item_bg_down");
//                    call_left.find(".accordion-heading").removeClass("item_active");
//                    left_ele.addClass("item_active");
//                    self.onClickItem(target.attr("detailId"));
//                    var call = target.attr("detailId");
//                    var action = {
//                        action: 'app.business.getBusinessByCallId',
//                        data: call
//                    }
//                    sendAction(action, function (busRes) {
//                        if (!busRes.data) {
//                            $(".location_customer").css("display", "block");
//                        } else {
//                            $(".location_customer").css("display", "none");
//
//                        }
//
//                    })
//                });
//                if (length > self.limit) {
//                    var element = self.calls.shift();
//                    call_left.find("#" + element).remove();
//                    call_right.find("#" + element + "_popup").remove();
//                    if ($("#popup_pane_" + element).length > 0) {
//                        var popPane = $("#popup_pane_" + element);
//                        popPane.find("#custpopModal").modal('hide');
//                        popPane.remove();
//                    }
//                    self.showContactItem(self.calls[0]);
//                }
//                if (isFirst) {
//                    handler.call.curCallId = callId;
//                    self.showContactItem(callId);
//                } else {
//                    $("#" + callId).find(".accordion-heading").click();
//                }
//                var callBack = function (obj, error) {
//                    if (error) {
//                        var pane = $("#" + callId + "_body .recentCall");
//                        pane.empty();
//                        pane.html("<div style='text-align: center;width: 100%;font-size: 13px;padding-top: 10px;padding-bottom: 10px;'>网络出错,未定位到通话纪录</div>");
//
//                        var pane1 = $("#" + callId + "_body .recentBusiness");
//                        pane1.empty();
//                        pane1.html("<div style='text-align: center;width: 100%;font-size: 13px;padding-top: 10px;padding-bottom: 10px;'>网络出错,未定位到业务纪录</div>");
//
//                        var pane2 = $("#" + callId + "");
//                        pane2.find(".customer_name").empty();
//
//                    } else {
//                        handler.call.getCustomerHistoryCdr(obj._id, callId, callNo);
//                        handler.call.getCustomerLastBusiness(obj._id, callId);
//                        handler.call.getCustomerNameInItem(obj.name, callId);
//                    }
//                }
//                if (business.callType == 'callUrlIn') {
//                    handler.customer.showCallUrlInPopupCust(callId, callNo, callBack, business.url, callObject);
//                } else if (business.callType == 'callUrlOut') {
//                    handler.customer.showCallUrlOutPopupCust(callId, callNo, callBack, business.url, callObject);
//                } else {
//                    handler.customer.showPopupCust(callId, callNo, callBack, business.id, callObject);
//                }
//            });
//        },
//        loadUrlAndType: function (queue, business) {
//            var ququeId = queue;
//            var queues = getCache('AllPbxQueues');
//            var businessType = "business";
//            for (var i = 0; i < queues.length; i++) {
//                if (queues[i].Exten == ququeId) {
//                    if (queues[i].BussinessTypeId != "") {
//                        if (queues[i].BussinessTypeId.indexOf("callUrls_") != -1) {
//                            businessType = "callUrls";
//                        }
//                        business.id = queues[i].BussinessTypeId.substr(businessType.length + 1, queues[i].BussinessTypeId.length);
//                    }
//                }
//            }
//            //console.dir(businessType + "====" + bussinessTypeId);
//            //console.dir(getCache('AllPbxQueues'));
//            if (businessType == "callUrls") {
//                var callUrl = getCache('callUrls', business.id);
//                if (callUrl != null) {
//                    if (callUrl.type == '1') {
//                        business.callType = "callUrlIn";
//                    } else if (callUrl.type == '2') {
//                        business.callType = "callUrlOut";
//                    }
//                    business.url = callUrl.url;
//                }
//                if (business.callType == 'callUrlIn') {
//                    var right = $("#view_incoming_call .right-column-save-pane");
//                    right.empty();
//                    right.css("overflow-y", "hidden");
//                    right.html("<div style='background-color: #fff;width: 100%;height:100%' id=\"call_detail_pane\"></div>");
//                }
//            }
//        },
//        loadMediaUrlAndType: function (data, business) {
//            var toUserName = data.ToUserName;
//            var mediaInterface = getCache('allMediaInterface');
//            if (mediaInterface.length) {
//                mediaInterface = mediaInterface[0].weChat
//                for (var i = 0; i < mediaInterface.length; i++) {
//                    if (toUserName == mediaInterface[i].weChatId) {
//                        if (mediaInterface[i].weChatPopUrl) {
//                            business.mediaUrl = "weChatPopUrl"
//                            business.url = mediaInterface[i].weChatPopUrl;
//                            business.weChatPopName = mediaInterface[i].weChatPopName;
//
//                        }
//                    }
//                }
//            }
//
//        },
//        loadbusiness: function (pane, fId) {
//            var business = "<form class='business-info'></form>";
//            var busInfo = pane.find(".business-info");
//            if (busInfo.length == 0) {
//                pane.append(business);
//            }
//            handler.business.showPopubBusiness(pane.find(".business-info"), null, fId, function () {
//            });
//        },

//        getCustomerHistoryCdr: function (customerId, callId, callNo) {
//            var pane = $("#" + callId + "_body .recentCall");
//            var noresult = function () {
//                getBufferedView("contact/contact_item_noresult", function (view) {
//                    var show = "通话";
//                    pane.empty();
//                    view = view.replace(/__title/g, show);
//                    pane.html(view);
//                });
//            }
//            handler.cdr.getLastHistoryCdr(callId, customerId, callNo, function (err, data) {
//                if (err) {
//                    pane.empty();
//                } else {
//                    if (data.length == 0) {
//                        var callId = pane.find("[hasCall='true']");
//                        if (callId.length == 0)
//                            noresult();
//                    } else {
//                        getBufferedView("contact/contact_item_recentcall", function (view) {
//                            pane.empty();
//                            view = render.renderContaceItemRecentCall(data[0], view);
//                            pane.html(view);
//                        });
//                    }
//                }
//            });
//        },
//        getCustomerLastBusiness: function (customerId, callId) {
//            var pane = $("#" + callId + "_body .recentBusiness");
//            var noresult = function () {
//                getBufferedView("contact/contact_item_noresult", function (view) {
//                    var show = "业务";
//                    pane.empty();
//                    view = view.replace(/__title/g, show);
//                    pane.html(view);
//                });
//            }
//            if (customerId == undefined) {
//                noresult();
//            } else {
//                handler.business.getCustomerLastBusiness(customerId, function (err, business) {
//                    if (err) {
//                        pane.empty();
//                    } else {
//                        if (!business) {
//                            noresult();
//                        } else {
//                            getBufferedView("contact/contact_item_recentbusiness", function (view) {
//                                pane.empty();
//                                view = render.renderContaceItemRecentBusiness(business, view);
//                                pane.html(view);
//                            });
//                        }
//                    }
//                });
//            }
//        },
//        updateCdr: function (callId, customerId) {
//            var data = { CALL_SHEET_ID: callId, customerId: customerId};
//            var action = {
//                action: 'app.cdr.cdrLocationCustomer',
//                data: data
//            };
//            sendAction(action, function (rep) {
//            });
//        },
//        customerUpdate: function (data) {
//            data.callId = handler.call.curCallId;
//            var phone = "";
//            var phones = data.phone;
//            if (phones.length != 0) {
//                phone = phones[0].tel;
//            }
//            data.phone = phone;
//            handler.call.callRefreshCustomer(data);
//        },

        <!--123 -->
        //外呼弹屏star.
//        dialout_pop: {
//            //入口
//
//        }
        //外呼弹屏end
    },
    showTipInfo: function (id) {
        if ($("#main-panel .showTipInfo").length < 1) {
            var tipInfoHtml = "<div class=\"showTipInfo\">" +
                "<div class=\"retract\"><a href=\"javascript:handler.showTipInfo();\" style=\"font-weight: bold;font-size: 13px;color: #000\">收起</a></div>" +
                "<div class=\"clear5\">&nbsp;</div>" +
                "<div class=\"topline\">&nbsp;</div>" +
                '<div id="km_container"></div></div>';
            $("#main-panel").append(tipInfoHtml);
            var pane = $("#km_container");
            getBufferedView('./km/km_index', function (view) {
                pane.empty();
                pane.html(view);
                var height = $(window).height() - 150;
                $("#main-panel .showTipInfo").find("#knowledge_right_div").css({height: height + "px", overflow: "auto"});
                pane.find("#knowledge_tree").css({height: (height - 70) + "px"});
            });
        }
        if ($("#main-panel .showTipInfo").css("display") == "none") {
            $("#main-panel .showTipInfo").css("display", "block");
            $("#main-panel .showTipInfo").css("left", $("#" + id).position().left + 30 + "px");
            $("#main-panel .showTipInfo").animate({height: ($(window).height() - 100) + "px", width: ($(window).width() - 150) + "px"});
            $("#main-panel .showTipInfo").find("#knowledge_right_div").css({height: ($(window).height() - 150) + "px", overflow: "auto"});

        } else {
            $("#main-panel .showTipInfo").animate({height: "10px", width: "0px"}, function () {
                $("#main-panel .showTipInfo").css("display", "none");
            });
        }
    },
    showHelpInfo: function (id) {
        if ($("#main-panel .showHelpInfo").length < 1) {
            var problemHtml = "<div class=\"showHelpInfo\">" +
                "<div class=\"retract\"><a href=\"javascript:handler.showHelpInfo();\" style=\"font-weight: bold;font-size: 13px;color: #000\">收起</a></div>" +
                "<div class=\"clear5\">&nbsp;</div>" +
                "<div class=\"topline\">&nbsp;</div>" +
                '<div id="problemHtml_container" style="height: 90%;width: 100%"></div></div>';
            $("#main-panel").append(problemHtml);
            //jc.render({},"problemHelp/query_help_info_type",pane,function(){});
        }
        if ($("#main-panel .showHelpInfo").css("display") == "none") {
            $("#main-panel .showHelpInfo").css("display", "block");
            $("#main-panel .showHelpInfo").css("left", $("#" + id).position().left + 30 + "px");
            $("#main-panel .showHelpInfo").animate({height: ($(window).height() - 100) + "px", width: ($(window).width() - 150) + "px"});
            handler.problemHelp.problem_help_type();
        } else {
            $("#main-panel .showHelpInfo").animate({height: "10px", width: "0px"}, function () {
                $("#main-panel .showHelpInfo").css("display", "none");
            });
        }
    },
    getDefaultDisplayValue: function (value) {
        if (value.substring(0, 2) == "__") {
            return "";
        }
        return value;
    },
    transformGeneralCache: function (type, value) {
        cache = getGeneralCache(type, value);
        if (cache) {
            return cache.code_name;
        } else {
            return value;
        }
    },
    contact: {
        advanced_customer: function (id) {
            handler.contact.customer_list(id);
        },
        _loadCustSearchBox: function (custtmplId, pane, menuId) {
            //var custtmplId = $('#my_customer').find('.customer_db_title').attr('id');
            var custTemp = getCache("custTmpls", custtmplId);
            var sources = custTemp.source || [];
            var statuss = custTemp.status;
//            var users = getCache('agents');
            var html1 = '';
            var source2Flag = false;
            var key;
            /*点击id 的sign标记*/
            $("#customer_list_id").attr("sign", menuId);
            html1 = '';
            for (var i = 0; i < sources.length; i++) {
                html1 += "<option value='" + sources[i].key + "'>" + sources[i].name + "</option>";
                if (!source2Flag) {
                    var options = sources[i].options;
                    if (options && options.length > 0) {
                        source2Flag = true;
                    }
                }
            }
            $('.cust_source1 .highSource1', pane).append(html1);
            html1 = '';
            for (var i in statuss) {
                html1 += "<option value='" + i + "' class='" + i + "'> " + statuss[i] + "</option>";
            }
            $('.highStatus', pane).append(html1);

            if (source2Flag) {
                $('.cust_source1 .highSource1', pane).change(function () {
                    var html2 = "<option value selected>--请选择--</option>";
                    key = $('.cust_source1 .highSource1', pane).val() || '';


                    for (var i = 0; i < sources.length; i++) {
                        if (sources[i].key == key) {

                            var options = sources[i].options;
                            if (options.length > 0) {
                                $('.cust_source2', pane).css('display', 'block');
                                for (var j = 0; j < options.length; j++) {
                                    html2 += "<option value='" + options[j].key + "'>" + options[j].name + "</option>";
                                }
                            }

                            break;
                        }
                    }
                    $('.cust_source2 .highSource2', pane).empty().append(html2);
                });


            }
            var custFields = custTemp.custom_fields;
            if (custFields && custFields.length) {
                //$(".custField").css('display','block');
                var fieldsPane = $('.cust_high_query_form').find(".customer_fields");
                fieldsPane.empty();
                handler.customer.createCustomQueryFieldsView(custFields, fieldsPane);
            }

            /*触发点击事件*/
            handler.customer.showActionContacts(pane);
        },
        customer_import: function (id) {
            handler.customer.showImport();
        }
    },
    showKm: function (pane) {
        getBufferedView('km/knowledge_main2', function (view) {
            pane.empty();
            pane.html(view);
        });
    },
    webChat: {

    }

}
