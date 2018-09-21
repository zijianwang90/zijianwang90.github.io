/**
 * init Bridge
 */
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function() {
                callback(WebViewJavascriptBridge);
            },
            false
        );
    }
}

/**
 * connect with app
 */
var fm = {
    _browser: {
        versions: (function() {
            var u = navigator.userAgent;
            // var app = navigator.appVersion;
            return {
                //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1,
                //IE内核
                presto: u.indexOf('Presto') > -1,
                //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1,
                //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1,
                //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    _encode: function(key, value) {
        if (typeof value != 'undefined') {
            if (key == '&rfTag') {
                return key + '=' + encodeURIComponent(value) + '&rf_tag=' + encodeURIComponent(value);
            }
            return key + '=' + encodeURIComponent(value);
        }
        return '';
    },
    mobile: function() {
        return fm._browser.versions.mobile;
    },
    ios: function() {
        return fm._browser.versions.ios;
    },
    android: function() {
        return fm._browser.versions.android;
    },
    _bridgeHandlers: {},
    _bridge: function(msg) {
        if (msg.act) {
            var handler = this._bridgeHandlers[msg.act];
            handler && handler(msg.data);
        }
    },
    on: function(act, handler) {
        this._bridgeHandlers[act] = handler;
    },
    _addFrame: function() {
        var frame = document.createElement('iframe');
        frame.style.display = 'none';
        frame.src = '';
        frame.id = 'BridgeIframe';
        document.body.appendChild(frame);
        fm._frame = frame;
    },
    _getViewName: function() {
        var referer = $('body').data('view-name');
        if (!referer) {
            //pageview overhide the view-name
            referer = $('body').data('pageview');
        }
        return referer || '';
    },
    _activeScheme: function(url) {
        url += '&referer=' + fm._getViewName();
        fm._frame.src = url;
    },
    _init: function() {
        fm._addFrame();
        var _self = this;
        connectWebViewJavascriptBridge(function(bridge) {
            bridge.init(function(message, responseCallback) {
                var data = {
                    code: '1'
                };
                if (typeof message == 'object') {
                    _self._bridge(message);
                } else {
                    _self._bridge(JSON.parse(message));
                }
                responseCallback(data);
            });
        });
    },
    _browserReload: function() {
        window.open(fm._frame.src);
    },
    /**
     * the interfaces of call native
     * @param catId
     * @param title
    */

    openSearch: function(catId, title, rootId) {
        if (fm.android()) {
            if (Android) {
                var str = {
                    rootId: rootId,
                    catId: catId,
                    title: title,
                    rfTag: ''
                };
                Android.searchCategory(JSON.stringify(str));
            }
        } else if (fm.ios()) {
            var url = 'fivemiles://search-category?cat=' + catId + '&title=' + encodeURIComponent(title) + '&rootId=' + rootId;
            fm._frame.src = url;
        }
    },
    openItem: function(item) {
        var version = $('#serviceListContainer').data('version');
        if (this.versionCompare(version, '3.4') > 0) {
            if (fm.android()) {
                if (Android) {
                    var obj = JSON.parse(decodeURIComponent(item));
                    var str = {
                        id: obj.id,
                        rfTag: obj.rfTag
                    };
                    Android.openItem(JSON.stringify(str));
                }
            } else if (fm.ios()) {
                var url = 'fivemiles://item?item=' + item;
                fm._frame.src = url;
            }
        } else {
            var obj = JSON.parse(decodeURIComponent(item));
            fm.openNewItem(obj);
        }
    },
    openPerson: function(item) {
        var ext = fm._encode('id', item.id) + fm._encode('&rfTag', item.rfTag);
        var url = 'fivemiles://person?' + ext;
        fm._activeScheme(url);
    },
    openNewItem: function(item) {
        var ext = fm._encode('id', item.id) + fm._encode('&rfTag', item.rfTag);
        var url = 'fivemiles://item?' + ext;
        fm._activeScheme(url);
    },
    openItemCloseSelf: function(item) {//ios
        var ext = fm._encode('id', item.id) + fm._encode('&rfTag', item.rfTag) + fm._encode('&closeSelf', 1);
        var url = 'fivemiles://item?' + ext;
        fm._activeScheme(url);
    },
    openReview: function(id) {
        var url = 'fivemiles://review?' + (id ? fm._encode('id', id) : '');
        fm._activeScheme(url);
    },
    leaveReview: function(id, requiredBy) {
        var ext = fm._encode('id', id) + (requiredBy ? fm._encode('&requiredBy', requiredBy) : '');
        var url = 'fivemiles://leaveReview?' + ext;
        fm._activeScheme(url);
    },
    openChat: function(itemId, userId) {
        var ext = fm._encode('itemId', itemId) + fm._encode('&userId', userId);
        var url = 'fivemiles://chat?' + ext;
        fm._activeScheme(url);
    },
    openPop: function(title) {
        var ext = fm._encode('title', title);
        var url = 'fivemiles://pop?' + ext;
        fm._frame.src = url;
    },
    openPopMark: function() {
        var ext = '';
        var url = 'fivemiles://pop?type=mark' + ext;
        fm._frame.src = url;
    },
    openWin: function(obj) {
        var title = obj.title ? fm._encode('&title', obj.title) : '';
        var current = obj.current ? fm._encode('&current', obj.current) : '';
        var closable = obj.closable == true ? fm._encode('&closable', 1) : '';
        var refreshable = obj.refreshable == true ? fm._encode('&refreshable', 1) : '';
        var info = '';
        if(obj.info) {
            for (key in obj.info) {
                info += fm._encode('&' + key, obj.info[key]);
            }
        }

        if (obj.url.indexOf('http') !== 0) {
            obj.url = window.location.origin + obj.url;
        }
        var ext = fm._encode('type', obj.type) + fm._encode('&url', obj.url) + title + current + closable + refreshable + info;
        var url = 'fivemiles://redirect?' + ext;
        fm._activeScheme(url);
    },
    openSearchKey: function(key) {
        var ext = fm._encode('keyword', key);
        var url = 'fivemiles://search?' + ext;
        fm._frame.src = url;
    },
    openSearchCategory: function(obj) {
        var ext = fm._encode('category', obj.id) + fm._encode('&title', obj.title);
        var url = 'fivemiles://search?' + ext;
        fm._frame.src = url;
    },
    openCategory: function(obj) {
        var ext = fm._encode('id', obj.id) + fm._encode('&rfTag', obj.rfTag);
        var url = 'fivemiles://category?' + ext;
        fm._frame.src = url;
    },
    openTab: function(type) {
        var ext = fm._encode('type', type);
        var url = 'fivemiles://tab?' + ext;
        fm._frame.src = url;
    },
    openPublish: function() {
        var ext = '';
        var url = 'fivemiles://publish?' + ext;
        fm._frame.src = url;
    },
    openSelectMark: function(obj) {
        var ext = 'type=mark' + fm._encode('&id', obj.id) + fm._encode('&name', obj.name) + fm._encode('&itemId', obj.itemId);
        var url = 'fivemiles://select?' + ext;
        fm._frame.src = url;
    },
    openProfile: function() {
        var ext = '';
        var url = 'fivemiles://profile?' + ext;
        fm._activeScheme(url);
    },
    openInviteCodePage: function () {
        var ext = '';
        var url = 'fivemiles://invite_code/' + ext;
        fm._frame.src = url;
    },
    selfRedirect: function(url) {
        this.openWin({
            type: 'self',
            url: url
        });
    },
    selfRedirectClosable: function(url) {
        this.openWin({
            type: 'self',
            url: url,
            closable: true
        });
    },
    openWinApp: function(url, info) {
        // info: obj参数可选
        this.openWin({
            type: 'app',
            url: url,
            info: info
        });
    },
    openWinAppOlderClose: function(url) {
        this.openWin({
            type: 'app',
            url: url,
            current: 'close'
        });
    },
    addRightMenu: function(obj) {
        if (fm.android() && obj) {
            var obj = {data: obj};
            var str = JSON.stringify(obj);
            FMAndroidBridge.send('addRightMenu', str);
        } else if (fm.ios() && obj) {
            connectWebViewJavascriptBridge(function(bridge) {
                var data = {
                    act: 'addRightMenu',
                    data: obj
                };
                bridge.send(data, function() {
                    // console.log(responseData);
                });
            });
        }
    },
    sendMsg: function(act, obj) {
        if (fm.android() && act) {
            var obj = {
                data: obj
            };
            var str = JSON.stringify(obj);
            FMAndroidBridge.send(act, str);
        } else if (fm.ios() && act) {
            connectWebViewJavascriptBridge(function(bridge) {
                var data = {
                    act: act,
                    data: obj
                };
                bridge.send(data, function() {
                    // console.log(responseData);
                });
            });
        }
    },
    send: function(act, obj, callback) {
        connectWebViewJavascriptBridge(function(bridge) {
            if (act != 'sign') {
                if (obj) {
                    if (!Array.isArray(obj)) {
                        obj['referer'] = fm._getViewName();
                    }
                } else {
                    obj = {
                        referer: fm._getViewName()
                    };
                }
            }
            var data = {
                act: act,
                data: obj
            };
            bridge.send(data, function(responseData) {
                if (typeof responseData == 'string') {
                    callback && callback(JSON.parse(responseData));
                } else {
                    callback && callback(responseData);
                }
            });
        });
    },
    payment: function(obj) {
        var url =
            'fivemiles://payment?product_id=' +
            obj.product_id +
            fm._encode('&order_number', obj.order_number) +
            fm._encode('&charge_action', obj.charge_action) +
            fm._encode('&success', obj.success) +
            fm._encode('&fail', obj.fail);
        fm._frame.src = url;
    },
    openAppointment: function() {
        var ext = fm._encode('id', '71') + fm._encode('&offerLineId', '45') + fm._encode('&rfTag', 'XXX');
        var url = 'fivemiles://appointment?' + ext;
        fm._frame.src = url;
    },
    openPhoto: function(callBack) {
        var ext = fm._encode('callBack', callBack);
        var url = 'fivemiles://photo?' + ext;
        fm._frame.src = url;
    },
    openEmailEdit: function() {
        var url = 'fivemiles://emailEdit?';
        fm._frame.src = url;
    },
    closeWin: function() {
        var ext = fm._encode('type', 'view');
        var url = 'fivemiles://close?' + ext;
        fm._frame.src = url;
    },
    feedback: function(itemId) {
        var ext = fm._encode('item_id', itemId);
        var url = 'fivemiles://feedback?' + ext;
        fm._activeScheme(url);
    },
    /**
     * signature
     * @param method
     * @param url
     * @param params
     * @param callback
    */
    sign: function(method, url, params, callback) {
        var base = window.location.origin + url;
        var object = {};
        if (method == 'get') {
            if (url.substring(url.length - 1) != '/') {
                base += '/';
            }
            object = {
                method: 'GET',
                base: base,
                params: params
            };
        } else if (method == 'post') {
            object = {
                method: 'POST',
                base: base,
                params: {
                    body: encodeURIComponent(JSON.stringify(params))
                }
            };
        }
        fm.send('sign', object, callback);
    },
    /**
     * signature from app
     * @param url
     * @param params
     * @param successCallBack
     * @param errorCallBack
    */

    post: function(url, params, successCallBack, errorCallBack) {
        var local_params = {};
        $.extend(true, local_params, params);
        local_params['timestamp'] = '' + new Date().valueOf();
        for (var key in local_params) {
            if (local_params[key] == null) {
                delete local_params[key];
            } else if (!isNaN(local_params[key])) {
                local_params[key] = local_params[key].toString();
            }
        }
        fm.sign('post', url, local_params, function(backData) {
            if (backData && backData.state == 0) {
                local_params['_sign'] = backData.data.sign;
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: local_params,
                    dataType: 'json',
                    timeout: 15000,
                    success: successCallBack,
                    error: errorCallBack
                });
            } else {
                fm.send('toast', 'An unexpected error occurred. Please try again later. Error Code: 1009');
                console.error('sign error!!');
            }
        });
    },
    /**
     * signature form app
     * @param url
     * @param params
     * @param successCallBack
     * @param errorCallBack
    */

    get: function(url, params, successCallBack, errorCallBack) {
        var local_params = {};
        $.extend(true, local_params, params);
        local_params['timestamp'] = '' + new Date().valueOf();

        fm.sign('get', url, local_params, function(backData) {
            if (backData.state == 0) {
                var extend = '/?';
                if (url.substring(url.length - 1) == '/') {
                    extend = '?';
                }
                extend += '_sign=' + backData.data.sign;
                for (var key in local_params) {
                    extend += '&' + key + '=' + local_params[key];
                }
                url += extend;
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'json',
                    timeout: 15000,
                    success: successCallBack,
                    error: errorCallBack
                });
            } else {
                fm.send('toast', 'An unexpected error occurred. Please try again later. Error Code: 1009');
                console.error('sign error!!');
            }
        });
    },
    errorContent: function(xhr, errorType, error) {
        var content = 'An unexpected error occurred. Please try again later...';
        if (xhr && xhr.responseText) {
            content = xhr.responseText;
        } else if (error) {
            content = error;
        } else if (errorType) {
            content = errorType;
        }
        return content;
    },
    /**
     * app version comparision
     * if b is newer than a, return a positive number; otherwise, return a negative number
     * a should not be equals to b
    */

    versionCompare: function(a, b) {
        a += '';
        b += '';
        var as = a.split('.');
        var bs = b.split('.');
        if (isNaN(parseInt(as[0]))) {
            return 1;
        }
        if (isNaN(parseInt(bs[0]))) {
            return -1;
        }
        for (var i = 0; true; i++) {
            var ai = parseInt(as[i]);
            var bi = parseInt(bs[i]);
            if (bi == ai) {
                continue;
            }
            if (typeof ai == 'undefined' || isNaN(ai)) {
                return 1;
            }
            if (typeof bi == 'undefined' || isNaN(bi)) {
                return -1;
            }
            return bi - ai;
        }
    },

    /* get $(window).height() according to different platform
    because there is a bug in Safari-iphone */

    getWinHeight: function() {
        // First check to see if the platform is IOS
        // If is mobile Safari set window height +60
        if (navigator.platform == 'iPhone' || navigator.platform == 'iPad' || navigator.platform == 'iPod') {
            // Height + 60px
            return $(window).height() + 60;
        } // Else use the default window height
        return $(window).height();
    },
    winLoadCallbacks: [],
    winLoad: function(cb) {
        if (typeof cb == 'function') {
            this.winLoadCallbacks.push(cb);
        }
    },

    /**
     * Async 异步
     * 0-新建 1-提交未确认 2-完成 3-取消 4-失败 5-退款
     * addCard 要特殊处理返回1, 就表示添卡成功了。转化成state == 2处理
    */
    Async: function(url, url_asyn, params, successCallBack, errorCallBack) {
        var getResult = false;
        var isAddCard = url_asyn.indexOf('_addNewCard') !== -1;
        // if(!isAddCard){successCallBack({"status":200,"data":{}});return;}
        // if(!isAddCard){errorCallBack({"status":200,"data":{"state":4,"state_name":"Failed","description":"Your card was declined.Please try with another card."}}, null, "Your card was declined.Please try with another card.");return;}
        // if(!isAddCard){errorCallBack({"status":400,"data":{"err_msg":"Please use a credit or debit card to continue the subscription.","err_code":12005}}, null, "Please use a credit or debit card to continue the subscription.");return;}

        this.post(
            url,
            params,
            function(result) {
                if (getResult) return;

                if (result && result.data && result.status && parseInt(result.status / 100) == 2) {
                    var data = result.data;
                    var order_number = data.order_number;
                    var state = data.state;
                    if (isAddCard && state === 1) state = 2;

                    if (state === 0 || state === 1) {
                        var date = new Date();
                        var timeStart = date.getTime();

                        //setInterval
                        var timer = setInterval(
                            function() {
                                if (getResult) {
                                    clearInterval(timer);
                                    return;
                                }

                                //checkout state
                                this.get(
                                    url_asyn,
                                    {order_number: order_number},
                                    function(result) {
                                        if (getResult) return;

                                        if (result && result.data && result.status && parseInt(result.status / 100) == 2) {
                                            var state = result.data.state;
                                            var date = new Date();
                                            var timeEnd = date.getTime();
                                            if (isAddCard && state === 1) state = 2;

                                            //超时 20s && 状态未确定时 === 继续轮询
                                            if (timeEnd - timeStart > 20000) {
                                                getResult = true;
                                                clearInterval(timer);
                                                result.status = 408;
                                                errorCallBack(result, null, '[timeout] An unexpected error occurred. Please try again later.');
                                            } else if (state === 2) {
                                                //success or error
                                                getResult = true;
                                                clearInterval(timer);

                                                if (result.data && result.data.err_msg) {
                                                    errorCallBack(result, null, result.data && result.data.err_msg);
                                                } else {
                                                    successCallBack(result);
                                                }
                                            } else if (state !== 0 && state !== 1) {
                                                //not equal 0 1 2
                                                getResult = true;
                                                clearInterval(timer);
                                                errorCallBack(result, null, result.data && result.data.err_msg || result.data.description);
                                            }

                                            //0 or 1 return interval..
                                        } else {
                                            getResult = true;
                                            clearInterval(timer);
                                            errorCallBack(result, null, result.data && result.data.err_msg);
                                        }
                                    },
                                    function() {
                                        // status not equal 2xx
                                        if (getResult) return;

                                        getResult = true;
                                        clearInterval(timer);
                                        errorCallBack(result);
                                    }
                                );
                            }.bind(this),
                            800
                        );
                    } else if (state === 2) {
                        //error or success
                        if (result.data && result.data.err_msg) {
                            errorCallBack(result, null, result.data && result.data.err_msg);
                        } else {
                            successCallBack(result);
                        }
                    } else {
                        //stata不存在或者其他状态
                        errorCallBack(result, null, result.data && result.data.err_msg || result.data.description);
                    }
                } else {
                    //data invaild or status not equal 2xx
                    errorCallBack(result, null, result.data && result.data.err_msg || result.msg);
                }
            }.bind(this),
            function(result) {
                if (getResult) return;
                //post error
                errorCallBack(result);
            }
        );
    },

    /**
     * 浮点数乘法
     * 科学计数法计算还是有误差的 0.0000001
     */
    accMul: function(arg1, arg2) {
        var m = 0;
        var s1 = arg1.toString();
        var s2 = arg2.toString();
        try {m += s1.split(".")[1].length;} catch (e) {}
        try {m += s2.split(".")[1].length;} catch (e) {}

        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },

    /**
     * 格式化BlockChain 
     * 保留2到len位
     */
    formatBlockChain: function(amount, len) {
        if(!amount) return '0.00';
        var amountStr = String(amount);
        var amountArr = String(amount).split('.');
        var hasE = amountStr.indexOf('e') > 0;
        if(!hasE && amountStr && amountArr[0] && !amountArr[1]) return amount.toFixed(2);
        if(!hasE && amountStr && amountArr[1] && amountArr[1].length < 2) return amount.toFixed(2);
        if(!hasE && amountStr && amountArr[1] && amountArr[1].length < len) return amountStr;
        var scale = Math.pow(10, len);
        var result = (Math.floor(this.accMul(parseFloat(amount), scale))/scale).toFixed(len);
        return result == 0 ? '0.00' : result;
    }
};

/**
 * public tools
*/

var fmt = {
    send: function(source, action, target, attrMap) {
        var info = $('.dataInfo').data('info');
        var times = new Date().getTime();
        var obj = [
            {
                source: source,
                action: action,
                target: target,
                attrMap: attrMap,
                timestamp: times
            }
        ];
        var postObj = {EVENT_ADS_ACTION_LOG: obj};
        if (info) {
            postObj['id'] = info.id;
            postObj['token'] = info.token;
        }
        $.post('/track/send', postObj, function(response) {
            if (response) {
            }
        });
    },
    _lang: null,
    lang: function() {
        if (fmt._lang) {
            return fmt._lang;
        }
        var lan = navigator.language;
        lan = lan.toLowerCase();
        if (lan.indexOf('es') === 0) {
            fmt._lang = 'es';
        } else if (lan.indexOf('ko') === 0){
            fmt._lang = 'ko'; 
        } else if (lan.indexOf('vi') === 0){
            fmt._lang = 'vi'; 
        }else {
            fmt._lang = 'en';
        }

        return fmt._lang;
    },
    setHeadTitle: function(title) {
        document.title = title;
    },
    _userAgentData: {},
    _userData: {},
    //_getUser from native and save as object
    getUser: function(callBack) {
        fm.send('getUser', {}, function(data) {
            if (data.state == 0) {
                fmt._userData = data.data;
                var agent_list = data.data.user_agent.split(',');
                for (var i = 0; i < agent_list.length; i++) {
                    var pair = agent_list[i].split(':');
                    fmt._userAgentData[pair[0]] = pair[1] || '';
                }
                if (callBack) {
                    //callback
                    callBack(fmt._userData);
                }
            }
        });
    }, //return _userdata which is an object
    getUserValue: function(key) {
        return fmt._userData[key];
    },
    getUserAgentValue: function(key) {
        if (key == 'app_version') {
            var app_version_str = null;
            if (fmt._userAgentData['app_version']) {
                app_version_str = fmt._userAgentData['app_version'];
            } else if ($('body').data('user')) {
                var user = $('body').data('user');
                var obj = JSON.parse(decodeURIComponent(user));
                if (obj.userAgent) {
                    var userAgentJson = {};
                    var agent_list = obj.userAgent.split(',');
                    for (var i = 0; i < agent_list.length; i++) {
                        var pair = agent_list[i].split(':');
                        userAgentJson[pair[0]] = pair[1] || '';
                    }
                    app_version_str = userAgentJson['app_version'];
                }
            }
            if (app_version_str) {
                var app_version_parts = app_version_str.split('-');
                var valueStr = app_version_parts[0];
                var returnValue = valueStr.split('(')[0];
                return returnValue;
            }
            return null;
        }
        return fmt._userAgentData[key];
    },
    /**
     * open the helpcenter web page
     * @param obj {"title":"xxx","url":"xxx"}
    */

    openHelpCenterUrl: function(obj) {
        var url = obj.url || '';
        fm.send('getUser', {}, function(res) {
            if (res.state == 0) {
                var data = res.data;
                var name = data.user_name;
                var email = data.user_email;
                var userId = data.user_id;
                var origin =
                    'https://www.5miles.com/mobile/helpCenterRedirect/?redirect=' +
                    encodeURIComponent(url) +
                    '&email=' +
                    encodeURIComponent(email) +
                    '&name=' +
                    encodeURIComponent(name) +
                    '&loc=en&uid=' +
                    userId;
                var openObj = {
                    type: 'app',
                    url: origin,
                    title: obj.title || ''
                };
                console.log('openHelpCenterUrl: ', openObj);
                fm.openWin(openObj);
            } else {
                console.log('open error, because getUser res.state != 0');
                obj['type'] = 'app';
                fm.openWin(obj);
            }
        });
    },
    getURLParam: function(url) {
        var theRequest = new Object();
        if (url.indexOf('?') != -1) {
            var url_parts = url.split('?');
            var strs = url_parts[1].split('&');
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
            }
        }
        return theRequest;
    },
    /**
     * images url filter
     */
    imagesFilter: function(str, size, mode) {
        if (str && str.indexOf('/deleted/') > 0) {
            return str;
        }
        if (str) {
            var type = mode ? mode : 'i';
            if (size) {
                if (type == 'a') {
                    if (str.indexOf('facebook') > 0) {
                        str = str.replace(/\/facebook/, '/facebook/f_auto,t_' + type + size);
                    } else if (str.indexOf('gplus') > 0) {
                        str = str.replace(/\/gplus/, '/facebook/f_auto,t_' + type + size);
                    }
                }
                str = str.replace(/upload/, 'upload/f_auto,t_' + type + size);
            }
            str = str.replace(/http:/, 'https:').replace(/res.5milesapp.com/, 'fivemiles-res.cloudinary.com');
            return str;
        }
        return str;

    },
    _init: function() {
        var bodyuser = document.body.getAttribute('data-user');
        fmt.getUser(function(data) {
            if (!bodyuser) document.body.setAttribute('data-user', encodeURIComponent(JSON.stringify(data)));
        });
    }
};
/**
 * servive init
*/

fm._init();
window.fm = fm;
//onload list
for (var i = 0; i < fm.winLoadCallbacks.length; i++) {
    fm.winLoadCallbacks[i]();
}
//fmt init
fmt._init();
window.fmt = fmt;

// 添加日志
try {
    if(window.location.pathname.indexOf('/order/selling') > -1) {
        $(function(){
            $.ajax({
                type: 'GET',
                url: '/log/myListing_assets_end',
                dataType: 'json',
            });
        });

        $.ajax({
            type: 'GET',
            url: '/log/myListing_script_start',
            dataType: 'json',
        });
    }
} catch(e) {}
