function talkingDataEvent(id, moduleName) {
    var data = {'_td_menu_name':moduleName}

    TDAPP.onEvent(moduleName, '',null)
}

(function () {

    var requestUrl;
    var TALKINGDATA_CONFIG_URL = '';
    var TALKINGDATA_APP_ID;
    switch (window.location.hostname) {

        case "faquapp.cpic.com.cn":
            requestUrl = 'https://td.cpic.com.cn/g/w';
            TALKINGDATA_CONFIG_URL = 'https://td.cpic.com.cn/conf';
            TALKINGDATA_APP_ID = 'B97ECB1780AB47B6849D8BD95C693BC4';
            break;
        default:
            requestUrl = 'https://td-sit.cpic.com.cn/g/w';
            TALKINGDATA_CONFIG_URL = 'https://td-sit.cpic.com.cn/conf';
            TALKINGDATA_APP_ID = '92D21BBCE234445BBACAD987CFEECC9C';
            break;

    }




    //SDK run params ...
    var TD_SDK_CONFIG = {
        APPKEY: TALKINGDATA_APP_ID,  //APPKEY
        REQUEST_ASYN: true, // 配置参数REQUEST_ASYN为true时为异步上报数据，未配置或者为false时候为同步上报数据。单页面前端系统，建议使用异步上报数据方式。
        REQUEST_URL: requestUrl, // receive data server url
        REQUEST_CONF: TALKINGDATA_CONFIG_URL,//可视化采数拉取配置的服务url
        AUTO_SEND_EVENT: true, 	// true or false, The custom event trigger automatically sent data
        LOOP_SEND_DATA: false, 	// false or number(60) ,according to the time of you to set the cycle to send data, the unit is seconds, not less than 60 seconds
        TDID_POLICY: 'UUID', 	// UUID or FINGER, TDID generation strategy, It is recommended to use UUID
        SDK_VERSION: 'H5+APP+v5.0.10', // Do not modify
        PAGE_TITLE: true,//是否自动采集页面title
        HYBRID_PAGE_NAME: '',//混合模式页面是采集url还是title,默认采集url。如果参数配置是title，混合模式只采集页面title。
        EVENT_BY_ELEMENT: false, //是否允许通过元素属性td-event进行事件埋点
        WEB_VIEW_FLAG_UA: '',//用于验证是否webview环境
        USER_CLICK_MAP: false, //是否采集用户点击图数据,
        USER_CLICK_MAP_REQURL: "http://dev.dmp.tdsh.com/sdk/userClickMap",  //获取配置热力图页面URL
        MODE: "Hybird"
    };
    /*在页面加载完成时增加延时埋点事件*/
    window['TDAPP'] = window['TDAPP'] || {};

    function delaySetTDAPPEvent(eventId, eventLabel, eventParams) {
        eventId = eventId || "";
        eventLabel = eventLabel || "";
        eventParams = eventParams || {};
        var checkTDAPP = setInterval(function () {
            if (typeof(TDAPP) != "undefined" && TDAPP.onEvent) {
                clearInterval(checkTDAPP);
                TDAPP.onEvent(eventId, eventLabel, eventParams);
            }
        }, 100);
    }

    window['TDAPP'].onEvent = delaySetTDAPPEvent;
    window['TDAPP'].send = window['TDAPP'].send || function () {
    };
    window['TDAPP'].onCustomPage = window['TDAPP'].onCustomPage || function () {
    };
    window['TDAPP'].getDeviceId = window['TDAPP'].getDeviceId || function () {
    };
    window['TDAPP'].onEventWithLabel = window['TDAPP'].onEventWithLabel || function () {
    };
    window['TDAPP'].onEventWithParameters = window['TDAPP'].onEventWithParameters || function () {
    };
    window['TDAPP'].setLocation = window['TDAPP'].setLocation || function () {
    };
    /*在页面加载完成时增加延时埋点事件*/
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            return
        }
        else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
            return
        }
    }

    function setWebViewFlag() {
        TDIsWebviewFlag = !0
    }

    function pageLogout(e) {
        if (window.location.href.indexOf("tdTimecc") != -1) return !1;
        if (!DTGlobal.appkey) return !1;
        if (!eventState) return;
        var t = (new Date).getTime();
        TDBASE.lealSet(t), SDKPage.onPageEnd(), eventState = !1
    }

    function trim(e) {
        return e
    }

    function UrlRequest() {
        this.url = TD_SDK_CONFIG.REQUEST_URL, this.opts = {}, this.requestArray = new Array
    }

    (function () {
        "use strict";
        window.neumedias = window.neumedias || {}, neumedias.platform = function () {
            var e = window.navigator.userAgent, t = window.navigator.platform, n = {};
            return t.match(/win32/gi) ? (n.os = "windows", e.match(/windows\s+nt\s+5\.1/gi) ? (n.type = "desktop", n.code = "xp") : e.match(/windows\s+nt\s+6\.0/gi) ? (n.type = "desktop", n.code = "vista") : e.match(/windows\s+nt\s+6\.1/gi) ? (n.type = "desktop", n.code = "7") : e.match(/windows\s+nt\s+6\.2/gi) ? (n.type = "desktop", n.code = "8") : e.match(/windows\s+nt\s+6\.3/gi) ? (n.type = "desktop", n.code = "8.1") : e.match(/windows\s+phone\s+7/gi) ? (n.type = "phone", n.code = "7") : e.match(/windows\s+phone\s+8/gi) && (n.type = "phone", n.code = "8")) : t.match(/macintel/gi) ? n.os = "macosx" : t.match(/iphone/gi) ? (n.os = "ios", n.type = "phone", n.code = "8") : t.match(/ipad/gi) ? (n.os = "ios", n.type = "tablet", n.code = "8") : t.match(/linux/gi) && (e.match(/android/gi) ? (n.os = "android", n.type = "mobile") : e.match(/cros/gi) ? (n.os = "chromeos", n.type = "desktop") : e.match(/ubuntu/gi) ? (n.os = "ubuntu", n.type = "desktop") : (n.os = "linux", n.type = "desktop")), n
        }, neumedias.isIOS = function () {
            return neumedias.platform().os == "ios"
        }, neumedias.isAndroid = function () {
            return neumedias.platform().os == "android"
        }, neumedias.isMobile = function () {
            var e = neumedias.platform();
            return console.log(), e.type == "mobile" || e.type == "phone" || e.type == "tablet"
        }
    })(), window.TDJSON = {}, function () {
        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function this_value() {
            return this.valueOf()
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap, u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function", typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case"string":
                    return quote(a);
                case"number":
                    return isFinite(a) ? String(a) : "null";
                case"boolean":
                case"null":
                    return String(a);
                case"object":
                    if (!a) return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }

        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
        var cx, escapable, gap, indent, meta, rep;
        typeof TDJSON.stringify != "function" && (escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, TDJSON.stringify = function (e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " "; else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {"": e});
            throw new Error("TDJSON.stringify")
        }), typeof TDJSON.parse != "function" && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, TDJSON.parse = function (text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }

            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
            throw new SyntaxError("TDJSON.parse")
        })
    }();
    var $$ = function (window) {
        function triggerAndReturn(e, t, n) {
            return !0
        }

        function triggerGlobal(e, t, n, r) {
            if (e.global) return triggerAndReturn(t || document, n, r)
        }

        function ajaxStart(e) {
            e.global && ajax.active++ === 0 && triggerGlobal(e, null, "ajaxStart")
        }

        function ajaxStop(e) {
            e.global && !--ajax.active && triggerGlobal(e, null, "ajaxStop")
        }

        function ajaxBeforeSend(e, t) {
            var n = t.context;
            if (t.beforeSend.call(n, e, t) === !1 || triggerGlobal(t, n, "ajaxBeforeSend", [e, t]) === !1) return !1;
            triggerGlobal(t, n, "ajaxSend", [e, t])
        }

        function ajaxSuccess(e, t, n) {
            var r = n.context, i = "success";
            n.success.call(r, e, i, t), triggerGlobal(n, r, "ajaxSuccess", [t, n, e]), ajaxComplete(i, t, n)
        }

        function ajaxError(e, t, n, r) {
            var i = r.context;
            r.error.call(i, n, t, e), triggerGlobal(r, i, "ajaxError", [n, r, e]), ajaxComplete(t, n, r)
        }

        function ajaxComplete(e, t, n) {
            var r = n.context;
            n.complete.call(r, t, e), triggerGlobal(n, r, "ajaxComplete", [t, n]), ajaxStop(n)
        }

        function empty() {
        }

        function mimeToDataType(e) {
            return e && (e == htmlType ? "html" : e == jsonType ? "json" : scriptTypeRE.test(e) ? "script" : xmlTypeRE.test(e) && "xml") || "text"
        }

        function appendQuery(e, t) {
            return (e + "&" + t).replace(/[&?]{1,2}/, "?")
        }

        function serializeData(e) {
            typeof e.data == "object" && (e.data = param(e.data)), e.data && (!e.type || e.type.toUpperCase() == "GET") && (e.url = appendQuery(e.url, e.data))
        }

        function serialize(e, t, n, r) {
            var i = typeof t == "array";
            for (var s in t) {
                var o = t[s];
                r && (s = n ? r : r + "[" + (i ? "" : s) + "]"), !r && i ? e.add(o.name, o.value) : (n ? typeof o == "array" : typeof o == "object") ? serialize(e, o, n, s) : e.add(s, o)
            }
        }

        function param(e, t) {
            var n = [];
            return n.add = function (e, t) {
                this.push(escape(e) + "=" + escape(t))
            }, serialize(n, e, t), n.join("&").replace("%20", "+")
        }

        function extend(e) {
            var t = Array.prototype.slice, n = t.call(arguments, 1);
            for (var r = 0; r < n.length; r++) for (key in n[r]) n[r][key] !== undefined && (e[key] = n[r][key]);
            return e
        }

        var jsonpID = 0, document = window.document, key, name,
            rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i,
            jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/, ajax = function (options) {
                var settings = extend({}, options || {});
                for (key in ajax.settings) settings[key] === undefined && (settings[key] = ajax.settings[key]);
                ajaxStart(settings), settings.crossDomain || (settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host);
                var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url);
                if (dataType == "jsonp" || hasPlaceholder) return hasPlaceholder || (settings.url = appendQuery(settings.url, "callback=?")), ajax.JSONP(settings);
                settings.url || (settings.url = window.location.toString()), serializeData(settings);
                var mime = settings.accepts[dataType], baseHeaders = {},
                    protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
                    xhr = ajax.settings.xhr(), abortTimeout;
                settings.crossDomain || (baseHeaders["X-Requested-With"] = "XMLHttpRequest"), mime && (baseHeaders.Accept = mime, mime.indexOf(",") > -1 && (mime = mime.split(",", 2)[0]), xhr.overrideMimeType && xhr.overrideMimeType(mime));
                if (settings.contentType || settings.data && settings.type.toUpperCase() != "GET") baseHeaders["Content-Type"] = settings.contentType || "application/x-www-form-urlencoded";
                settings.headers = extend(baseHeaders, settings.headers || {}), xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        clearTimeout(abortTimeout);
                        var result, error = !1;
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == "file:") {
                            dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type")), result = xhr.responseText;
                            try {
                                dataType == "script" ? (1, eval)(result) : dataType == "xml" ? result = xhr.responseXML : dataType == "json" && (result = blankRE.test(result) ? null : TDJSON.parse(result))
                            } catch (e) {
                                error = e
                            }
                            error ? ajaxError(error, "parsererror", xhr, settings) : ajaxSuccess(result, xhr, settings)
                        } else ajaxError(null, "error", xhr, settings)
                    }
                };
                var async = "async" in settings ? settings.async : !0;
                xhr.open(settings.type, settings.url, async);
                for (name in settings.headers) xhr.setRequestHeader(name, settings.headers[name]);
                return ajaxBeforeSend(xhr, settings) === !1 ? (xhr.abort(), !1) : (settings.timeout > 0 && (abortTimeout = setTimeout(function () {
                    xhr.onreadystatechange = empty, xhr.abort(), ajaxError(null, "timeout", xhr, settings)
                }, settings.timeout)), xhr.send(settings.data ? settings.data : null), xhr)
            };
        ajax.active = 0, ajax.JSONP = function (e) {
            if ("type" in e) {
                var t = "jsonp" + ++jsonpID, n = document.createElement("script"), r = function () {
                    t in window && (window[t] = empty), ajaxComplete("abort", i, e)
                }, i = {abort: r}, s, o = document.getElementsByTagName("head")[0] || document.documentElement;
                return e.error && (n.onerror = function () {
                    i.abort(), e.error()
                }), window[t] = function (n) {
                    clearTimeout(s), delete window[t], ajaxSuccess(n, i, e)
                }, serializeData(e), n.src = e.url.replace(/=\?/, "=" + t), o.insertBefore(n, o.firstChild), e.timeout > 0 && (s = setTimeout(function () {
                    i.abort(), ajaxComplete("timeout", i, e)
                }, e.timeout)), i
            }
            return ajax(e)
        }, ajax.settings = {
            type: "GET",
            beforeSend: empty,
            success: empty,
            error: empty,
            complete: empty,
            context: null,
            global: !0,
            xhr: function () {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript",
                json: jsonType,
                xml: "application/xml, text/xml",
                html: htmlType,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0
        }, ajax.get = function (e, t) {
            return ajax({url: e, success: t})
        }, ajax.post = function (e, t, n, r) {
            return typeof t == "function" && (r = r || n, n = t, t = null), ajax({
                type: "POST",
                url: e,
                data: t,
                success: n,
                dataType: r
            })
        }, ajax.getJSON = function (e, t) {
            return ajax({url: e, success: t, dataType: "json"})
        };
        var escape = encodeURIComponent;
        return {ajax: ajax}
    }(window), TDIsWebviewFlag = !1;
    TD_SDK_CONFIG.SDK_VERSION.indexOf("H5+APP+") > -1 || TD_SDK_CONFIG.SDK_VERSION.indexOf("WEB+APP+") > -1 || (neumedias.isMobile() ? TD_SDK_CONFIG.SDK_VERSION = "H5+APP+" + TD_SDK_CONFIG.SDK_VERSION : TD_SDK_CONFIG.SDK_VERSION = "WEB+APP+" + TD_SDK_CONFIG.SDK_VERSION);
    var DTGlobal = {
        deviceId: "",
        appkey: "",
        appProfile: {
            versionName: "",
            versionCode: "",
            initTime: "",
            sdkVersion: TD_SDK_CONFIG.SDK_VERSION,
            partner: ""
        },
        deviceProfile: {pixel: "", language: navigator.language, timezone: (new Date).getTimezoneOffset() / 60 * -1},
        msgs: []
    };
    (function () {
        function e() {
            var e = !1, t = [], n = TD_SDK_CONFIG.WEB_VIEW_FLAG_UA;
            if (n) {
                t.push(n);
                var r = navigator.userAgent;
                for (var i = 0; i < t.length; i++) if (r && r.indexOf(t[i]) != -1) {
                    e = !0;
                    break
                }
                TD_SDK_CONFIG.HYBIRD_TYPE == "bridge" && e && (__TDIsIos__ == undefined || __TDIosWebkit__ || __TDIsAndroid__ ? e = !0 : e = !1)
            }
            if (!e) {
                var s = window.location.search.substring(1).split("&");
                for (var o = 0, u = s.length; o < u; o++) if (s[o] === "tdhybridflag=1") {
                    e = !0;
                    break
                }
            }
            return e
        }

        function t() {
            return document.getElementsByTagName("script")
        }

        function n(e, t) {
            if (e) {
                var n;
                for (n = 0; n < e.length; n += 1) if (e[n] && t(e[n], n, e)) break
            }
        }

        function r(e) {
            DTGlobal.appkey = TD_SDK_CONFIG.APPKEY, DTGlobal.appProfile.versionName = "", DTGlobal.appProfile.versionCode = "";
            if (e) {
                DTGlobal.appkey = e.getAttribute("td-appid") || DTGlobal.appkey;
                var t = e.getAttribute("post-url"), n = e.getAttribute("td-loop");
                t && (TD_SDK_CONFIG.REQUEST_URL = t), n && (TD_SDK_CONFIG.LOOP_SEND_DATA = n), TD_SDK_CONFIG.SDK_VERSION.indexOf("H5+APP+") > -1 || TD_SDK_CONFIG.SDK_VERSION.indexOf("WEB+APP+") > -1 || (neumedias.isMobile() ? TD_SDK_CONFIG.SDK_VERSION = "H5+APP+" + TD_SDK_CONFIG.SDK_VERSION : TD_SDK_CONFIG.SDK_VERSION = "WEB+APP+" + TD_SDK_CONFIG.SDK_VERSION), DTGlobal.appProfile.sdkVersion = TD_SDK_CONFIG.SDK_VERSION
            }
        }

        function i() {
            TDIsWebviewFlag = !0, window.TD_SDK_CONFIG = window.TD_SDK_CONFIG || {}, TD_SDK_CONFIG.AUTO_SEND_EVENT = !0
        }

        function s() {
            var e = null;
            n(t(), function (t) {
                if (t.getAttribute("td-appid") || t.getAttribute("td-hybrid-flag")) return e = t, !0
            }), e && e.getAttribute("td-hybrid-flag") || TDIsWebviewFlag ? i() : r(e)
        }

        TDIsWebviewFlag = e(), s()
    })(), function (e) {
        function t() {
            return document.getElementsByTagName("script")
        }

        function n(e, t) {
            if (e) {
                var n;
                for (n = 0; n < e.length; n += 1) if (e[n] && t(e[n], n, e)) break
            }
        }

        function r() {
            var e = null, r = null;
            n(t(), function (t) {
                if (t.getAttribute("td-appid")) return r = t.getAttribute("td-appid"), e = t, !0
            }), r = r != null ? r : TD_SDK_CONFIG.APPKEY, DTGlobal.appkey = r, DTGlobal.appProfile.versionName = "", DTGlobal.appProfile.versionCode = "";
            if (e) {
                var i = e.getAttribute("post-url"), s = e.getAttribute("td-loop");
                i && (TD_SDK_CONFIG.REQUEST_URL = i), s && (TD_SDK_CONFIG.LOOP_SEND_DATA = s)
            }
        }

        r();
        var i = {
            extend: function () {
                var e = {};
                for (var t = 0, n = arguments.length; t < n; t++) {
                    var r = arguments[t];
                    if (Object.prototype.toString.call(r) != "[object Object]") continue;
                    for (var i in r) e[i] = r[i]
                }
                return e
            }, getAjax: function (e) {
                $$.ajax({
                    url: TD_SDK_CONFIG.REQUEST_URL,
                    data: TDJSON.stringify(e),
                    type: "post",
                    dataType: "text",
                    success: function (e) {
                        console.log(e)
                    }
                })
            }, getParam: function () {
                var e = TDJSON.parse(TDJSON.stringify(DTGlobal)), t = {
                    appkey: localStorage.__TD_appkey || "",
                    deviceId: localStorage.__TD_deviceId || "",
                    deviceProfile: {
                        pixel: function () {
                            var e = [window.screen.width, window.screen.height];
                            return window.devicePixelRatio && e.push(window.devicePixelRatio), e.join("*")
                        }()
                    },
                    msgs: function () {
                        var e = localStorage.__TD_sessionMsg;
                        if (!e) return [];
                        var e = TDJSON.parse(e).msg, t = sessionStorage.getItem("__TD_SessionStart");
                        if (!t && localStorage.__TD_lastSession) {
                            var n = TDJSON.parse(localStorage.__TD_lastSession);
                            t = n.start
                        }
                        var r = sessionStorage.getItem("__TD_sessionId"), i = (new Date).getTime(), s = 0;
                        t && (s = parseInt((i - parseInt(t)) / 1e3));
                        var o = {type: 2, data: {id: r, start: t, status: 3, duration: s, pages: [], events: []}};
                        return e[e.length] = o, e
                    }()
                };
                return this.extend(e, t)
            }, del: function () {
                var e = window.localStorage;
                if (e && e.__TD_appkey && DTGlobal.appkey !== e.__TD_appkey) {
                    var t = this.getParam();
                    this.getAjax(t);
                    for (var n in e) n.indexOf("__TD_") > -1 && n != "__TD_deviceId" && delete window.localStorage[n];
                    window.sessionStorage.removeItem("__TD_SessionStart"), window.sessionStorage.removeItem("__TD_sessionId")
                }
            }
        };
        try {
            i.del()
        } catch (s) {
        }
    }(window);
    var AppSession = {type: 2, data: {id: "", start: 0, duration: 0}}, appPages = [], appEvents = [], TalkingData = {},
        WebappStart = (new Date).getTime(), eventState = !0, H5Event = {
            addEventListener: function (e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
            }, getIeVersion: function () {
                var e = !1;
                if (navigator.userAgent.indexOf("MSIE") != -1) {
                    var t = navigator.appVersion;
                    e = t.split(";"), e.length > 1 && (e = parseInt(e[1].replace(/[ ]/g, "").replace(/MSIE/g, "")))
                }
                return e
            }, getUrlParam: function (e) {
                var t = window.location.search;
                if (t.indexOf(e) != -1) {
                    var n = t.indexOf(e) + e.length, r = t.indexOf("&", n) == -1 ? t.length : t.indexOf("&", n);
                    return t.substring(n, r)
                }
                return ""
            }
        };
    TDIsWebviewFlag || (H5Event.addEventListener(window, "pagehide", pageLogout), H5Event.addEventListener(window, "beforeunload", pageLogout)), function (e, t, n) {
        typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define("fingerprint", n) : t[e] = n()
    }("Fingerprint", TalkingData, function () {
        var e = function (e) {
            var t, n;
            t = Array.prototype.forEach, n = Array.prototype.map, this.each = function (e, n, r) {
                if (e === null) return;
                if (t && e.forEach === t) e.forEach(n, r); else if (e.length === +e.length) {
                    for (var i = 0, s = e.length; i < s; i++) if (n.call(r, e[i], i, e) === {}) return
                } else for (var o in e) if (e.hasOwnProperty(o) && n.call(r, e[o], o, e) === {}) return
            }, this.map = function (e, t, r) {
                var i = [];
                return e == null ? i : n && e.map === n ? e.map(t, r) : (this.each(e, function (e, n, s) {
                    i[i.length] = t.call(r, e, n, s)
                }), i)
            }, typeof e == "object" ? (this.hasher = e.hasher, this.screen_resolution = e.screen_resolution, this.screen_orientation = e.screen_orientation, this.canvas = e.canvas, this.ie_activex = e.ie_activex) : typeof e == "function" && (this.hasher = e)
        };
        return e.prototype = {
            get: function () {
                var e = [];
                e.push(navigator.userAgent), e.push(navigator.language), e.push(screen.colorDepth);
                if (this.screen_resolution) {
                    var t = this.getScreenResolution();
                    typeof t != "undefined" && e.push(this.getScreenResolution().join("x"))
                }
                return e.push((new Date).getTimezoneOffset()), e.push(this.hasSessionStorage()), e.push(this.hasLocalStorage()), e.push(!!window.indexedDB), document.body ? e.push(typeof document.body.addBehavior) : e.push(typeof undefined), e.push(typeof window.openDatabase), e.push(navigator.cpuClass), e.push(navigator.platform), e.push(navigator.doNotTrack), e.push(this.getPluginsString()), this.canvas && this.isCanvasSupported() && e.push(this.getCanvasFingerprint()), this.hasher ? this.hasher(e.join("###"), 31) : this.murmurhash3_32_gc(e.join("###"), 31)
            }, murmurhash3_32_gc: function (e, t) {
                var n, r, i, s, o, u, a, f;
                n = e.length & 3, r = e.length - n, i = t, o = 3432918353, u = 461845907, f = 0;
                while (f < r) a = e.charCodeAt(f) & 255 | (e.charCodeAt(++f) & 255) << 8 | (e.charCodeAt(++f) & 255) << 16 | (e.charCodeAt(++f) & 255) << 24, ++f, a = (a & 65535) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = (a & 65535) * u + (((a >>> 16) * u & 65535) << 16) & 4294967295, i ^= a, i = i << 13 | i >>> 19, s = (i & 65535) * 5 + (((i >>> 16) * 5 & 65535) << 16) & 4294967295, i = (s & 65535) + 27492 + (((s >>> 16) + 58964 & 65535) << 16);
                a = 0;
                switch (n) {
                    case 3:
                        a ^= (e.charCodeAt(f + 2) & 255) << 16;
                    case 2:
                        a ^= (e.charCodeAt(f + 1) & 255) << 8;
                    case 1:
                        a ^= e.charCodeAt(f) & 255, a = (a & 65535) * o + (((a >>> 16) * o & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = (a & 65535) * u + (((a >>> 16) * u & 65535) << 16) & 4294967295, i ^= a
                }
                return i ^= e.length, i ^= i >>> 16, i = (i & 65535) * 2246822507 + (((i >>> 16) * 2246822507 & 65535) << 16) & 4294967295, i ^= i >>> 13, i = (i & 65535) * 3266489909 + (((i >>> 16) * 3266489909 & 65535) << 16) & 4294967295, i ^= i >>> 16, i >>> 0
            }, hasLocalStorage: function () {
                try {
                    return !!window.localStorage
                } catch (e) {
                    return !0
                }
            }, hasSessionStorage: function () {
                try {
                    return !!window.sessionStorage
                } catch (e) {
                    return !0
                }
            }, isCanvasSupported: function () {
                var e = document.createElement("canvas");
                return !!e.getContext && !!e.getContext("2d")
            }, isIE: function () {
                return navigator.appName === "Microsoft Internet Explorer" ? !0 : navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent) ? !0 : !1
            }, getPluginsString: function () {
                return this.isIE() && this.ie_activex ? this.getIEPluginsString() : this.getRegularPluginsString()
            }, getRegularPluginsString: function () {
                return this.map(navigator.plugins, function (e) {
                    var t = this.map(e, function (e) {
                        return [e.type, e.suffixes].join("~")
                    }).join(",");
                    return [e.name, e.description, t].join("::")
                }, this).join(";")
            }, getIEPluginsString: function () {
                if (window.ActiveXObject) {
                    var e = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"];
                    return this.map(e, function (e) {
                        try {
                            return new ActiveXObject(e), e
                        } catch (t) {
                            return null
                        }
                    }).join(";")
                }
                return ""
            }, getScreenResolution: function () {
                var e;
                return this.screen_orientation ? e = screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : e = [screen.height, screen.width], e
            }, getCanvasFingerprint: function () {
                var e = document.createElement("canvas"), t = e.getContext("2d"), n = "https://www.talkingdata.com";
                return t.textBaseline = "top", t.font = "14px 'Arial'", t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(125, 1, 62, 20), t.fillStyle = "#069", t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.7)", t.fillText(n, 4, 17), e.toDataURL()
            }
        }, e
    });
    var cookie = function (e, t, n) {
        if (typeof t == "undefined") {
            var a = null;
            if (document.cookie && document.cookie != "") {
                var f = document.cookie.split(";");
                for (var l = 0; l < f.length; l++) {
                    var c = trim(f[l]);
                    if (c.substring(0, e.length + 1) == e + "=") {
                        a = decodeURIComponent(c.substring(e.length + 1));
                        break
                    }
                }
            }
            return a
        }
        n = n || {}, t === null && (t = "", n.expires = -1);
        var r = "";
        if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
            var i;
            typeof n.expires == "number" ? (i = new Date, i.setTime(i.getTime() + n.expires * 24 * 60 * 60 * 1e3)) : i = n.expires, r = "; expires=" + i.toUTCString()
        }
        var s = n.path ? "; path=" + n.path : "", o = n.domain ? "; domain=" + n.domain : "",
            u = n.secure ? "; secure" : "";
        document.cookie = [e, "=", encodeURIComponent(t), r, s, o, u].join("")
    };
    TalkingData.localStorage = {
        add: function (e, t) {
            this.addLocalStorage(e, t), e != "sessionId" && this.addCookie(e, t)
        }, get: function (e) {
            var t = this.getLocalStorage(e);
            return t ? t : this._getCookie(e)
        }, create: function () {
            if (!!cookie("__TD_LOCAL")) return;
            this._addCookie("");
            if (!window.localStorage) return
        }, addCookie: function (e, t) {
            if (window.localStorage) return;
            this.create();
            var n = this.cookieList();
            n[e] = t;
            var r = [];
            for (var i in n) r.push(i + "=" + n[i]);
            this._addCookie(r.join(";"))
        }, _setCookie: function () {
            var e = this.cookieList();
            cookie("__TD_LOCAL", "", {expires: 1095, path: "/", domain: location.hostname})
        }, _addCookie: function (e) {
            cookie("__TD_LOCAL", e, {expires: 1095, path: "/", domain: location.hostname})
        }, _getCookie: function (e) {
            var t = this.cookieList();
            if (t && t[e]) return t[e]
        }, delCookie: function (e) {
        }, cookieList: function () {
            var e = cookie("__TD_LOCAL");
            return this.format(e)
        }, addLocalStorage: function (e, t) {
            if (!window.localStorage) return;
            e == "sessionId" && window.sessionStorage ? sessionStorage.setItem("__TD_" + e, t) : localStorage["__TD_" + e] = t
        }, delLocalStorage: function (e) {
            if (!window.localStorage) return;
            localStorage.removeItem("__TD_" + e)
        }, getLocalStorage: function (e) {
            if (!window.localStorage) return;
            return e == "sessionId" && window.sessionStorage ? sessionStorage.getItem("__TD_" + e) : localStorage["__TD_" + e]
        }, format: function (e) {
            var t = {};
            if (!e) return t;
            var n = e.split(";"), r = n.length;
            for (var i = 0; i < r; i++) {
                var s = n[i].split("=");
                if (s.length != 2) continue;
                t[s[0]] = s[1]
            }
            return t
        }
    }, TalkingData.sessionStorage = {
        add: function (e, t) {
            if (!window.sessionStorage) return;
            sessionStorage.setItem("__TD_" + e, t)
        }, get: function (e) {
            return sessionStorage.getItem("__TD_" + e)
        }, remove: function (e) {
            sessionStorage.removeItem("__TD_" + e)
        }
    };
    var TDXHR, TDONOFF = !0, HEATMAP_TDXHR, SMART_TDXHR;
    TDNUMBER = !1, UrlRequest.prototype = {
        getAjax: function (e, t, n, r, i, s) {
            if (TDIsWebviewFlag) return;
            var o = this, u = {
                invoke: function (u) {
                    if (navigator.userAgent.indexOf("MSIE") > 0) {
                        var a = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
                        if (a == "MSIE6.0" || a == "MSIE7.0") return;
                        if (window.XDomainRequest) {
                            var f = new XDomainRequest;
                            f && (u.error && typeof u.error == "function" && (f.onerror = function () {
                                u.error()
                            }), u.timeout && typeof u.timeout == "function" && (f.ontimeout = function () {
                                u.timeout()
                            }), u.success && typeof u.success == "function" && (f.onload = function () {
                                u.dataType ? u.dataType.toLowerCase() == "json" && u.success(TDJSON.parse(f.responseText)) : u.success(f.responseText)
                            }), f.open(u.type, t), f.send(u.param))
                        }
                    } else s == "HEATMAP" ? o.sendHeatMapMsg(e, t, n, r, i) : s == "SMART" ? o.sendSmartMsg(e, t, n, r, i) : o.sendMsg(e, t, n, r, i)
                }
            };
            u.invoke({url: t, type: e, param: TDJSON.stringify(n), success: r})
        }, set: function (e, t, n, r, i, s) {
            this.opts = e, this.send(t, n, r, i, s)
        }, send: function (e, t, n, r, i) {
            n = n || this.url, r = r || "post", this.getAjax(r, n, this.opts, e, t, i)
        }, sendHeatMapMsg: function (e, t, n, r, i) {
            if (HEATMAP_TDXHR) return !1;
            var s = "json";
            if (e == "post" || e == "POST") n = TDJSON.stringify(n), s = "text";
            HEATMAP_TDXHR = $$.ajax({
                type: e,
                url: t,
                data: n,
                dataType: s,
                success: r,
                error: i,
                complete: function () {
                    HEATMAP_TDXHR = undefined
                }
            })
        }, sendSmartMsg: function (e, t, n, r, i) {
            if (SMART_TDXHR) return !1;
            var s = "json";
            if (e == "post" || e == "POST") n = TDJSON.stringify(n), s = "text";
            SMART_TDXHR = $$.ajax({
                type: e, url: t, data: n, dataType: s, success: r, error: i, complete: function () {
                    SMART_TDXHR = undefined
                }
            })
        }, sendMsg: function (e, t, n, r, i) {
            TDONOFF = !1;
            var s = "json";
            if (e == "post" || e == "POST") n = TDJSON.stringify(n), s = "text";
            if (localData.get("td-sending-data")) return setTimeout(function () {
                localData.delLocalStorage("td-sending-data")
            }, 3e3), !1;
            localData.add("td-sending-data", "true");
            var o = !1;
            TD_SDK_CONFIG && TD_SDK_CONFIG.REQUEST_ASYN && (o = TD_SDK_CONFIG.REQUEST_ASYN), TDXHR = $$.ajax({
                type: e,
                url: t,
                data: n,
                dataType: s,
                success: r,
                error: i,
                async: o,
                timeout: 3e3,
                complete: function () {
                    TDXHR = undefined, TDONOFF = !0, TDNUMBER && (DTMgr.getAjax(), TDNUMBER = !1), localData.delLocalStorage("td-sending-data"), localData.delLocalStorage("td-unique")
                }
            })
        }
    }, function (e) {
        e.TDBASE = e.TDBASE || {};
        if (TDIsWebviewFlag) return;
        TDBASE.cacheName = "cacheList", TDBASE.unique = function (e) {
            e.sort();
            var t = [e[0]];
            for (var n = 1; n < e.length; n++) e[n] !== t[t.length - 1] && t.push(e[n]);
            return t
        }, TDBASE.getArgs = function () {
            var t = new Object, n = e.location.search.substring(1);
            if (!n) {
                var r = e.location.href, i = r.indexOf("?");
                n = r.substring(i + 1), n.indexOf("#") > 0 && (n = n.substring(0, n.indexOf("#")))
            }
            var s = n.split("&");
            for (var o = 0; o < s.length; o++) {
                var u = s[o].indexOf("=");
                if (u == -1) continue;
                var a = s[o].substring(0, u), f = s[o].substring(u + 1);
                f = decodeURIComponent(f), t[a] = f
            }
            return t
        }, TDBASE.getCommon = function (e) {
            var t;
            localData.get("appkey") ? t = localData.get("appkey") : t = DTGlobal.appkey;
            var n = e.msg, r = {
                deviceId: DTGlobal.deviceId,
                appkey: t,
                appProfile: DTGlobal.appProfile,
                deviceProfile: DTGlobal.deviceProfile,
                msgs: n
            };
            return r
        }, TDBASE.getCommonMsg = function (e, t, n, r, i) {
            var s = {type: 2, data: {id: e, start: t, status: n, duration: r || 0, pages: [], events: i || []}};
            return s
        }, TDBASE.addSessionStart = function (e, t) {
            var n;
            localData.add("lastSession", TDJSON.stringify({
                id: AppSession.data.id,
                start: AppSession.data.start
            })), n = localData.get("td-hold-event"), n && (n = TDJSON.parse(n));
            var r = TDBASE.getCommonMsg(AppSession.data.id, AppSession.data.start, t, e, n);
            TDBASE.addMsg(r), localData.delLocalStorage("td-hold-event")
        }, TDBASE.equal = function (e, t) {
            if (typeof e != typeof t) return !1;
            if (typeof e.length != typeof t.length) return !1;
            var n = !0, r = [], i = [];
            for (var s in e) s !== "count" && s !== "start" && r.push(s);
            for (var s in t) s !== "count" && s !== "start" && i.push(s);
            if (r.length != i.length) return !1;
            for (var s = 0, o = i.length; s < o; s++) r.push(i[s]);
            var u = TDBASE.unique(r);
            for (var s = 0, o = u.length; s < o; s++) {
                if (!(u[s] in e && u[s] in t)) return !1;
                if (typeof e[u[s]] == "object" && typeof t[u[s]] == "object") n = TDBASE.equal(e[u[s]], t[u[s]]); else if (e[u[s]] !== t[u[s]]) return !1
            }
            return n
        }, TDBASE.checkIsNeedCollectData = function (e) {
            var t = !0;
            if (TD_SDK_CONFIG.LIMIT_DATA_MAX_SIZE) {
                var n = parseFloat(TD_SDK_CONFIG.LIMIT_DATA_MAX_SIZE), r = localData.get("sessionMsg");
                if (r && e) {
                    var i = r.replace(/[^\x00-\xff]/g, "xx").length / 1024,
                        s = e.replace(/[^\x00-\xff]/g, "xx").length / 1024, o = (i + s).toFixed(2);
                    parseFloat(o) > n && (t = !1, i > n && (t = !0, localData.delLocalStorage("lastSession"), DTMgr.addlastSession()))
                }
            }
            return t
        }, TDBASE.addGenre = function (e, t, n, r, i, s) {
            if (!!localData.get("sessionMsg")) {
                if (!TDBASE.checkIsNeedCollectData(TDJSON.stringify(e))) return !1;
                n && n(e);
                var o = TDJSON.parse(localData.get("sessionMsg")), u = o.msg[o.msg.length - 1].data[t];
                if (t === "events") {
                    if (u.length != 0) {
                        var a = !1;
                        for (var f = 0; f < u.length; f++) if (TDBASE.equal(u[f], e)) {
                            a = !0, u[f].count += 1, u[f].start = e.start;
                            break
                        }
                        a || u.push(e)
                    } else u.push(e);
                    localData.add("sessionMsg", TDJSON.stringify(o));
                    return
                }
                if (t === "pages") if (r) {
                    var l = localData.get("lastPage");
                    if (l) {
                        l = TDJSON.parse(l);
                        var c = TDJSON.parse(TDJSON.stringify(l)), h = c.start;
                        c.duration = TDBASE.getDurationSecond(h, e.start), u.push(c), e.refer = c.name
                    }
                    i || (u.push(e), localData.add("lastPage", TDJSON.stringify(e))), localData.add("sessionMsg", TDJSON.stringify(o)), s || TDAPP.send()
                } else u.push(e), localData.add("lastPage", TDJSON.stringify(e)), localData.add("sessionMsg", TDJSON.stringify(o)); else u.push(e), localData.add("sessionMsg", TDJSON.stringify(o))
            }
        }, TDBASE.getDurationSecond = function (e, t) {
            var n = 0;
            if (e && t) {
                var r = t - e;
                n = Math.round(r / 1e3)
            }
            return n
        }, TDBASE.lealSet = function (e) {
            localData.add("leavetime", e);
            var t = sessionStorage.getItem("__TD_SessionStart");
            if (!t && localStorage.__TD_lastSession) {
                var n = TDJSON.parse(localStorage.__TD_lastSession);
                t = n.start
            }
            var r = 0;
            t && (r = parseInt((e - t) / 1e3)), localData.add("leaveSession", r)
        }, TDBASE.addMsg = function (e) {
            if (!localData.get("sessionMsg")) localData.add("sessionMsg", TDJSON.stringify({msg: [e]})); else {
                var t = TDJSON.parse(localData.get("sessionMsg"));
                t.msg.push(e), localData.add("sessionMsg", TDJSON.stringify(t))
            }
        }
    }(window), function () {
        if (!DTGlobal.appkey) return console.log("请配置APPKEY"), !1;
        if (TDIsWebviewFlag) return;
        window.localData = TalkingData.localStorage;
        var e = TalkingData.sessionStorage, t = 60,
            n = TD_SDK_CONFIG.LOOP_SEND_DATA ? TD_SDK_CONFIG.LOOP_SEND_DATA >= t ? TD_SDK_CONFIG.LOOP_SEND_DATA : t : undefined,
            r = {
                timedif: undefined, state: 1, deviceId: 0, sessionId: 0, local: [], set: function () {
                    var e = this;
                    try {
                        this.setDeviceId(), this.setSession(), this.setSessionTime(), this.setInitTime(), this.setPartner(), this.setResolution(), this.setLanguage(), this.addlastSession(), this.setPageInfo();

                        function t() {
                            n && setInterval(function () {
                                e.getAjax()
                            }, n * 1e3)
                        }

                        t()
                    } catch (r) {
                    }
                    try {
                        localStorage.__TD_sessionMsg || TDBASE.addSessionStart(0, 2);
                        var i = TDJSON.parse(localData.get("sessionMsg")), s = TDBASE.getCommon(i);
                        this.getAjax()
                    } catch (r) {
                        console.log(r)
                    }
                }, setPageInfo: function () {
                    TD_SDK_CONFIG.PAGE_TITLE ? TDBASE.addGenre({
                        name: window.location.href,
                        title: window.document.title,
                        start: WebappStart,
                        duration: 0,
                        refer: document.referrer ? document.referrer : ""
                    }, "pages") : TDBASE.addGenre({
                        name: window.location.href,
                        start: WebappStart,
                        duration: 0,
                        refer: document.referrer ? document.referrer : ""
                    }, "pages")
                }, setDeviceId: function () {
                    if (localData.get("deviceId")) this.deviceId = localData.get("deviceId"); else {
                        if (TD_SDK_CONFIG.TDID_POLICY == "FINGER") {
                            var e = new TalkingData.Fingerprint,
                                t = new TalkingData.Fingerprint({screen_resolution: !0}), n = e.get() + "" + t.get();
                            parseInt(n) == NaN ? this.deviceId = n : this.deviceId = parseInt(n).toString(16), this.deviceId = this.deviceId.replace(/\.|\+|\(|\)/g, "")
                        } else this.deviceId = this.uuid(16, 32);
                        localData.add("deviceId", this.deviceId)
                    }
                    DTGlobal.deviceId = this.deviceId
                }, uuid: function (e, t) {
                    var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), r = [], i;
                    t = t || n.length;
                    if (e) for (i = 0; i < e; i++) r[i] = n[0 | Math.random() * t]; else {
                        var s;
                        r[8] = r[13] = r[18] = r[23] = "-", r[14] = "4";
                        for (i = 0; i < 36; i++) r[i] || (s = 0 | Math.random() * 16, r[i] = n[i == 19 ? s & 3 | 8 : s])
                    }
                    return r.join("")
                }, setSession: function () {
                    var t, n = this.deviceId, r = parseInt(n, 16), i = (new Date).getTime();
                    if (this.deviceId.indexOf("-") > -1) {
                        var s = this.deviceId.split("-");
                        t = s[0] + i
                    } else t = this.deviceId + i;
                    if (32 - t.length > 0) for (var o = 0, u = 32 - t.length; o < u; o++) t += "0";
                    32 - t.length < 0 && (t = t.substring(0, 32)), e.get("sessionId") ? t = e.get("sessionId") : e.add("sessionId", t), AppSession.data.id = this.sessionId = t
                }, setSessionTime: function () {
                    var t;
                    t = (new Date).getTime(), e.get("SessionStart") ? t = e.get("SessionStart") : e.add("SessionStart", t), AppSession.data.start = parseInt(t)
                }, setInitTime: function () {
                    localData.get("initTime") ? DTGlobal.appProfile.initTime = parseInt(localData.get("initTime")) : (DTGlobal.appProfile.initTime = WebappStart, localData.add("initTime", WebappStart))
                }, setPartner: function () {
                    var e = TDBASE.getArgs().td_channelid;
                    e != undefined && (DTGlobal.appProfile.partner = e)
                }, setResolution: function () {
                    var e = [window.screen.width, window.screen.height];
                    DTGlobal.deviceProfile.pixel = e.join("*")
                }, setLanguage: function () {
                    DTGlobal.deviceProfile.language || navigator.userLanguage && (DTGlobal.deviceProfile.language = navigator.userLanguage)
                }, addlastSession: function () {
                    var e = localData.get("lastSession");
                    e === undefined && (localData.delLocalStorage("sessionMsg"), localData.delLocalStorage("lastSession"));
                    if (!e) TDBASE.addSessionStart(0, 1); else {
                        var t = TDJSON.parse(e);
                        if (t.id != AppSession.data["id"]) {
                            var n = TDBASE.getCommonMsg(t.id, t.start, 3, parseInt(localData.get("leaveSession")));
                            TDBASE.addMsg(n), this.timedif = parseInt(((new Date).getTime() - localData.get("leavetime")) / 1e3), localData.add("T-%%%-T", "{" + (new Date(parseInt(localData.get("leavetime")))).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") + "," + (new Date(parseInt(AppSession.data.start))).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ") + "}"), localData.get("appkey") ? localData.get("appkey") == DTGlobal.appkey && TDBASE.addSessionStart(this.timedif, 1) : TDBASE.addSessionStart(this.timedif, 1);
                            return
                        }
                    }
                }, _checkItemIsIn: function (e, t, n) {
                    var r = !1;
                    if (n && e && t && t.length > 0) for (var i = 0; i < t.length; i++) {
                        var s = t[i], o = s.data[n];
                        if (o && o.length > 0) for (var u = 0; u < o.length; u++) {
                            var a = o[u];
                            if (n == "events") {
                                if (e.id == a.id && e.start == a.start && e.count == a.count) {
                                    r = !0;
                                    break
                                }
                            } else if (n == "pages" && e.name == a.name && e.start == a.start && e.duration == a.duration) {
                                r = !0;
                                break
                            }
                        }
                    }
                    return r
                }, _buildNewList: function (e, t, n) {
                    var i = [];
                    if (e && e.length > 0) for (var s = 0; s < e.length; s++) {
                        var o = e[s], u = r._checkItemIsIn(o, t, n);
                        u || i.push(o)
                    }
                    return i
                }, removeUploadData: function (e) {
                    var t = e.msgs, n = [];
                    if (t && t.length > 0 && localData.get("sessionMsg") && TDJSON.parse(localData.get("sessionMsg")).msg) {
                        var i = TDJSON.parse(localData.get("sessionMsg")).msg;
                        if (i && i.length > 0) for (var s = 0; s < i.length; s++) {
                            var o = i[s], u = o.data.events, a = o.data.pages, f = r._buildNewList(u, t, "events"),
                                l = r._buildNewList(a, t, "pages");
                            o.data.events = f, o.data.pages = l, (f.length > 0 || l.length > 0) && n.push(o)
                        }
                    }
                    var c = {msg: n};
                    localData.add("sessionMsg", TDJSON.stringify(c))
                }, getAjax: function () {
                    var e = this, t = new UrlRequest;
                    localStorage.__TD_sessionMsg || TDBASE.addSessionStart(0, 2);
                    var n = TDJSON.parse(localData.get("sessionMsg")), i = TDBASE.getCommon(n),
                        s = localStorage["__TD_td-init-event"];
                    if (s) {
                        var o = i.msgs[i.msgs.length - 1];
                        if (o) {
                            var u = o.data.events;
                            o.data.events = u.concat(TDJSON.parse(s))
                        }
                    }
                    localData.delLocalStorage("td-init-event"), localData.get("appkey") ? localData.get("appkey") != DTGlobal.appkey ? t.set(i, function (t) {
                        r.removeUploadData(i), localData.delLocalStorage("td-hold-event"), TDBASE.addSessionStart(0, 1), e.getAjax()
                    }, function (e) {
                        console.log(e)
                    }) : t.set(i, function (e) {
                        r.removeUploadData(i), localData.delLocalStorage("td-hold-event"), TDBASE.addSessionStart(0, 2)
                    }, function (e) {
                        console.log(e)
                    }) : t.set(i, function (e) {
                        r.removeUploadData(i), localData.delLocalStorage("td-hold-event"), TDBASE.addSessionStart(0, 2)
                    }, function (e) {
                        console.log(e)
                    }), localData.add("appkey", DTGlobal.appkey)
                }
            };
        window.DTMgr = r, window.location.href.indexOf("tdTimecc") == -1 && r.set()
    }(), function () {
        function t() {
            var e = window.location.href;
            TD_SDK_CONFIG.HYBRID_PAGE_NAME == "title" && (e = window.document.title), hybridEvent.send("onPage", [e])
        }

        window.hybridEvent = window.hybridEvent || {};
        if (!TDIsWebviewFlag) return;
        var e = {
            loadURL: function (e) {
                var t;
                t = document.createElement("iframe"), t.setAttribute("src", e), t.setAttribute("style", "display:none;"), t.setAttribute("height", "0px"), t.setAttribute("width", "0px"), t.setAttribute("frameborder", "0"), document.body && document.body.appendChild(t), document.body && t.parentNode.removeChild(t), t = null
            }, exec: function (t, n) {
                var r = {functionName: t, arguments: n}, i = TDJSON.stringify(r), s = "talkingdata:" + i;
                TD_SDK_CONFIG.HYBIRD_TYPE == "bridge" ? __TDIosWebkit__ && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.TDHybridBridge && window.webkit.messageHandlers.TDHybridBridge.postMessage ? window.webkit.messageHandlers.TDHybridBridge.postMessage(s) : __TDIsIos__ == undefined && __TDBridgeLoader__ && __TDBridgeLoader__.loadUrl ? __TDBridgeLoader__.loadUrl(s) : __TDIsAndroid__ && window.TDHybridBridge && window.TDHybridBridge.execute ? window.TDHybridBridge.execute(s) : TDAPP.send() : e.loadURL(s)
            }
        };
        window.hybridEvent.send = e.exec, setTimeout(function () {
            t()
        }, 100)
    }();
    var SDKEvent = {
        set: function (e, t, n) {
            if (arguments.length > 0) try {
                var r = {count: 1, start: (new Date).getTime()};
                e != undefined && (r.id = typeof e != "string" ? TDJSON.stringify(e) : e), t != undefined ? r.label = typeof t != "string" ? TDJSON.stringify(t) : t : r.label = "";
                if (n != undefined) {
                    var i = function (e) {
                        var t = typeof e == "object" && Object.prototype.toString.call(e).toLowerCase() == "[object object]" && !e.length;
                        return t
                    };
                    i(n) ? r.params = n : r.params = {params: ""}
                }
                TDIsWebviewFlag ? SDKEvent.hybridEventUpload(r) : SDKEvent.webUpload(r)
            } catch (s) {
            }
        }, webUpload: function (e) {
            TDXHR ? TDBASE.addGenre(e, "events", function (e) {
                var t = localData.get("td-hold-event"), n = [];
                n.push(e);
                if (!t) {
                    localData.add("td-hold-event", TDJSON.stringify(n));
                    return
                }
                t = TDJSON.parse(t);
                var r = !1;
                for (var i = 0; i < t.length; i++) if (TDBASE.equal(t[i], e)) {
                    t[i].count += 1, t[i].start = e.start, r = !0;
                    break
                }
                r || t.push(e), localData.add("td-hold-event", TDJSON.stringify(t))
            }) : TDBASE.addGenre(e, "events"), TD_SDK_CONFIG.AUTO_SEND_EVENT && DTMgr.getAjax()
        }, hybridEventUpload: function (e) {
            if (!hybridEvent.send) return;
            if (!TDIsWebviewFlag) return;
            var t = "", n = [];
            e.id && (n = [e.id], t = "onEvent", e.label && (n.push(e.label), t = "onEventWithLabel", e.params && (n.push(e.params), t = "onEventWithParameters"))), hybridEvent.send(t, n)
        }, hybridGetDeviceId: function (e) {
            hybridEvent.send("getDeviceId", [e.name])
        }, hybridSetLocation: function (e, t) {
            hybridEvent.send("setLocation", [e, t])
        }, req: function () {
            try {
                DTMgr.getAjax()
            } catch (e) {
            }
        }
    };
    window.TDAPP = window.TDAPP || {}, window.TDAPP.send = SDKEvent.req, window.TDAPP.onEvent = SDKEvent.set, TDIsWebviewFlag ? (TDAPP.getDeviceId = SDKEvent.hybridGetDeviceId, TDAPP.onEventWithLabel = SDKEvent.set, TDAPP.onEventWithParameters = SDKEvent.set, TDAPP.setLocation = SDKEvent.hybridSetLocation) : (TDAPP.onEventWithLabel = function () {
    }, TDAPP.onEventWithParameters = function () {
    }, TDAPP.getDeviceId = function () {
    }, TDAPP.setLocation = function () {
    });
    if (!TDIsWebviewFlag) {
        var SDKPage = {
            onPageStart: function (e, t, n, r, i) {
                if (arguments.length > 0) try {
                    TD_SDK_CONFIG.PAGE_TITLE || (t = "");
                    var s = e || window.location.href;
                    TD_SDK_CONFIG.PAGE_URL_REPLACE_QUESTION_MARK && s.indexOf("?") != -1 && (s = s.replace("?", "!"));
                    var o = {
                        name: s,
                        title: t || "",
                        start: (new Date).getTime(),
                        duration: 0,
                        refer: n || document.referrer || ""
                    }, u = !0;
                    TDBASE.addGenre(o, "pages", null, u, r, i)
                } catch (a) {
                }
            }, onPageEnd: function (e) {
                var t = localData.get("lastPage");
                t && (t = TDJSON.parse(t), SDKPage.onPageStart(t.name, t.title, t.refer, !0, e), localData.delLocalStorage("lastPage"))
            }
        };
        window.TDAPP = window.TDAPP || {}, window.TDAPP.onCustomPage = SDKPage.onPageStart
    }
    (function (e, t, n) {
        typeof module != "undefined" && module.exports ? module.exports = n() : typeof define == "function" && define.amd ? define("heatmap", n) : t[e] = n()
    })("TdHeatMap", this, function () {
        var e = {
            defaultRadius: 40,
            defaultRenderer: "canvas2d",
            defaultGradient: {.25: "rgb(0,0,255)", .55: "rgb(0,255,0)", .85: "yellow", "1.0": "rgb(255,0,0)"},
            defaultMaxOpacity: 1,
            defaultMinOpacity: 0,
            defaultBlur: .85,
            defaultXField: "x",
            defaultYField: "y",
            defaultValueField: "value",
            plugins: {}
        }, t = function () {
            var n = function (t) {
                this._coordinator = {}, this._data = [], this._radi = [], this._min = 10, this._max = 1, this._xField = t.xField || t.defaultXField, this._yField = t.yField || t.defaultYField, this._valueField = t.valueField || t.defaultValueField, t.radius && (this._cfgRadius = t.radius)
            }, r = e.defaultRadius;
            return n.prototype = {
                _organiseData: function (e, t) {
                    var n = e[this._xField], i = e[this._yField], s = this._radi, o = this._data, u = this._max,
                        a = this._min, f = e[this._valueField] || 1, l = e.radius || this._cfgRadius || r;
                    o[n] || (o[n] = [], s[n] = []), o[n][i] ? o[n][i] += f : (o[n][i] = f, s[n][i] = l);
                    var c = o[n][i];
                    return c > u ? (t ? this.setDataMax(c) : this._max = c, !1) : c < a ? (t ? this.setDataMin(c) : this._min = c, !1) : {
                        x: n,
                        y: i,
                        value: f,
                        radius: l,
                        min: a,
                        max: u
                    }
                }, _unOrganizeData: function () {
                    var e = [], t = this._data, n = this._radi;
                    for (var r in t) for (var i in t[r]) e.push({x: r, y: i, radius: n[r][i], value: t[r][i]});
                    return {min: this._min, max: this._max, data: e}
                }, _onExtremaChange: function () {
                    this._coordinator.emit("extremachange", {min: this._min, max: this._max})
                }, addData: function () {
                    if (arguments[0].length > 0) {
                        var e = arguments[0], t = e.length;
                        while (t--) this.addData.call(this, e[t])
                    } else {
                        var n = this._organiseData(arguments[0], !0);
                        n && (this._data.length === 0 && (this._min = this._max = n.value), this._coordinator.emit("renderpartial", {
                            min: this._min,
                            max: this._max,
                            data: [n]
                        }))
                    }
                    return this
                }, setData: function (e) {
                    var t = e.data, n = t.length;
                    this._data = [], this._radi = [];
                    for (var r = 0; r < n; r++) this._organiseData(t[r], !1);
                    return this._max = e.max, this._min = e.min || 0, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this
                }, removeData: function () {
                }, setDataMax: function (e) {
                    return this._max = e, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this
                }, setDataMin: function (e) {
                    return this._min = e, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this
                }, setCoordinator: function (e) {
                    this._coordinator = e
                }, _getInternalData: function () {
                    return {max: this._max, min: this._min, data: this._data, radi: this._radi}
                }, getData: function () {
                    return this._unOrganizeData()
                }
            }, n
        }(), n = function () {
            function s(e) {
                var n = e.container, r = this.shadowCanvas = document.createElement("canvas"),
                    i = this.canvas = e.canvas || document.createElement("canvas"),
                    s = this._renderBoundaries = [1e4, 1e4, 0, 0], o = getComputedStyle(e.container) || {};
                i.className = "heatmap-canvas", this._width = i.width = r.width = e.width || +o.width.replace(/px/, ""), this._height = i.height = r.height = e.height || +o.height.replace(/px/, ""), this.shadowCtx = r.getContext("2d"), this.ctx = i.getContext("2d"), i.style.cssText = r.style.cssText = "position:absolute;left:0;top:0;", n.style.position = "relative", n.appendChild(i), this._palette = t(e), this._templates = {}, this._setStyles(e)
            }

            var t = function (e) {
                var t = e.gradient || e.defaultGradient, n = document.createElement("canvas"), r = n.getContext("2d");
                n.width = 256, n.height = 1;
                var i = r.createLinearGradient(0, 0, 256, 1);
                for (var s in t) i.addColorStop(s, t[s]);
                return r.fillStyle = i, r.fillRect(0, 0, 256, 1), r.getImageData(0, 0, 256, 1).data
            }, n = function (e, t) {
                var n = document.createElement("canvas"), r = n.getContext("2d"), i = e, s = e;
                n.width = n.height = e * 2;
                if (t == 1) r.beginPath(), r.arc(i, s, e, 0, 2 * Math.PI, !1), r.fillStyle = "rgba(0,0,0,1)", r.fill(); else {
                    var o = r.createRadialGradient(i, s, e * t, i, s, e);
                    o.addColorStop(0, "rgba(0,0,0,1)"), o.addColorStop(1, "rgba(0,0,0,0)"), r.fillStyle = o, r.fillRect(0, 0, 2 * e, 2 * e)
                }
                return n
            }, r = function (e) {
                var t = [];
                if (e && e.length > 0) for (var n in e) isNaN(n) || t.push(n);
                return t
            }, i = function (e) {
                var t = [], n = e.min, i = e.max, s = e.radi, e = e.data, o = r(e), u = o.length;
                while (u--) {
                    var a = o[u], f = r(e[a]), l = f.length;
                    while (l--) {
                        var c = f[l], h = e[a][c], p = s[a][c];
                        t.push({x: a, y: c, value: h, radius: p})
                    }
                }
                return {min: n, max: i, data: t}
            };
            return s.prototype = {
                renderPartial: function (e) {
                    e.data.length > 0 && (this._drawAlpha(e), this._colorize())
                }, renderAll: function (e) {
                    this._clear(), e.data.length > 0 && (this._drawAlpha(i(e)), this._colorize())
                }, _updateGradient: function (e) {
                    this._palette = t(e)
                }, updateConfig: function (e) {
                    e.gradient && this._updateGradient(e), this._setStyles(e)
                }, setDimensions: function (e, t) {
                    this._width = e, this._height = t, this.canvas.width = this.shadowCanvas.width = e, this.canvas.height = this.shadowCanvas.height = t
                }, _clear: function () {
                    this.shadowCtx.clearRect(0, 0, this._width, this._height), this.ctx.clearRect(0, 0, this._width, this._height)
                }, _setStyles: function (e) {
                    this._blur = e.blur == 0 ? 0 : e.blur || e.defaultBlur, e.backgroundColor && (this.canvas.style.backgroundColor = e.backgroundColor), this._width = this.canvas.width = this.shadowCanvas.width = e.width || this._width, this._height = this.canvas.height = this.shadowCanvas.height = e.height || this._height, this._opacity = (e.opacity || 0) * 255, this._maxOpacity = (e.maxOpacity || e.defaultMaxOpacity) * 255, this._minOpacity = (e.minOpacity || e.defaultMinOpacity) * 255, this._useGradientOpacity = !!e.useGradientOpacity
                }, _drawAlpha: function (e) {
                    var t = this._min = e.min, r = this._max = e.max, e = e.data || [], i = e.length,
                        s = 1 - this._blur;
                    while (i--) {
                        var o = e[i], u = o.x, a = o.y, f = o.radius, l = Math.min(o.value, r), c = u - f, h = a - f,
                            p = this.shadowCtx, d;
                        this._templates[f] ? d = this._templates[f] : this._templates[f] = d = n(f, s);
                        var v = (l - t) / (r - t);
                        p.globalAlpha = v < .01 ? .01 : v, p.drawImage(d, c, h), c < this._renderBoundaries[0] && (this._renderBoundaries[0] = c), h < this._renderBoundaries[1] && (this._renderBoundaries[1] = h), c + 2 * f > this._renderBoundaries[2] && (this._renderBoundaries[2] = c + 2 * f), h + 2 * f > this._renderBoundaries[3] && (this._renderBoundaries[3] = h + 2 * f)
                    }
                }, _colorize: function () {
                    var e = this._renderBoundaries[0], t = this._renderBoundaries[1], n = this._renderBoundaries[2] - e,
                        r = this._renderBoundaries[3] - t, i = this._width, s = this._height, o = this._opacity,
                        u = this._maxOpacity, a = this._minOpacity, f = this._useGradientOpacity;
                    e < 0 && (e = 0), t < 0 && (t = 0), e + n > i && (n = i - e), t + r > s && (r = s - t);
                    var l = this.shadowCtx.getImageData(e, t, n, r), c = l.data, h = c.length, p = this._palette;
                    for (var d = 3; d < h; d += 4) {
                        var v = c[d], m = v * 4;
                        if (!m) continue;
                        var g;
                        o > 0 ? g = o : v < u ? v < a ? g = a : g = v : g = u, c[d - 3] = p[m], c[d - 2] = p[m + 1], c[d - 1] = p[m + 2], c[d] = f ? p[m + 3] : g
                    }
                    l.data = c, this.ctx.putImageData(l, e, t), this._renderBoundaries = [1e3, 1e3, 0, 0]
                }, getValueAt: function (e) {
                    var t, n = this.shadowCtx, r = n.getImageData(e.x, e.y, 1, 1), i = r.data[3], s = this._max,
                        o = this._min;
                    return t = Math.abs(s - o) * (i / 255) >> 0, t
                }, getDataURL: function () {
                    return this.canvas.toDataURL()
                }
            }, s
        }(), r = function () {
            var r = !1;
            return e.defaultRenderer === "canvas2d" && (r = n), r
        }(), i = {
            merge: function () {
                var e = {}, t = arguments.length;
                for (var n = 0; n < t; n++) {
                    var r = arguments[n];
                    for (var i in r) e[i] = r[i]
                }
                return e
            }
        }, s = function () {
            function u() {
                var n = this._config = i.merge(e, arguments[0] || {});
                this._coordinator = new s;
                if (n.plugin) {
                    var u = n.plugin;
                    if (!e.plugins[u]) throw new Error("Plugin '" + u + "' not found. Maybe it was not registered.");
                    var a = e.plugins[u];
                    this._renderer = new a.renderer(n), this._store = new a.store(n)
                } else this._renderer = new r(n), this._store = new t(n);
                o(this)
            }

            var s = function () {
                function t() {
                    this.cStore = {}
                }

                return t.prototype = {
                    on: function (e, t, n) {
                        var r = this.cStore;
                        r[e] || (r[e] = []), r[e].push(function (e) {
                            return t.call(n, e)
                        })
                    }, emit: function (e, t) {
                        var n = this.cStore;
                        if (n[e]) {
                            var r = n[e].length;
                            for (var i = 0; i < r; i++) {
                                var s = n[e][i];
                                s(t)
                            }
                        }
                    }
                }, t
            }(), o = function (e) {
                var t = e._renderer, n = e._coordinator, r = e._store;
                n.on("renderpartial", t.renderPartial, t), n.on("renderall", t.renderAll, t), n.on("extremachange", function (t) {
                    e._config.onExtremaChange && e._config.onExtremaChange({
                        min: t.min,
                        max: t.max,
                        gradient: e._config.gradient || e._config.defaultGradient
                    })
                }), r.setCoordinator(n)
            };
            return u.prototype = {
                addData: function () {
                    return this._store.addData.apply(this._store, arguments), this
                }, removeData: function () {
                    return this._store.removeData && this._store.removeData.apply(this._store, arguments), this
                }, setData: function () {
                    return this._store.setData.apply(this._store, arguments), this
                }, setDataMax: function () {
                    return this._store.setDataMax.apply(this._store, arguments), this
                }, setDataMin: function () {
                    return this._store.setDataMin.apply(this._store, arguments), this
                }, configure: function (e) {
                    return this._config = i.merge(this._config, e), this._renderer.updateConfig(this._config), this._coordinator.emit("renderall", this._store._getInternalData()), this
                }, repaint: function () {
                    return this._coordinator.emit("renderall", this._store._getInternalData()), this
                }, getData: function () {
                    return this._store.getData()
                }, getDataURL: function () {
                    return this._renderer.getDataURL()
                }, getValueAt: function (e) {
                    return this._store.getValueAt ? this._store.getValueAt(e) : this._renderer.getValueAt ? this._renderer.getValueAt(e) : null
                }
            }, u
        }(), o = {
            create: function (e) {
                return new s(e)
            }, register: function (t, n) {
                e.plugins[t] = n
            }
        };
        return o
    }), function () {
        var e = {
            pageId: "", tdPageFlag: "", tdHeatMapData: {}, blockPixel: 10, calPageLoadDuration: function () {
                var e = (new Date).getTime(), t = e - WebappStart, n = "_td_page_load_duration",
                    r = "_td_page_load_duration", i = {pageName: window.location.href, pageDuration: t};
                TDAPP.onEvent(n, r, i)
            }, getElementPath: function (e) {
                var t = this, n = e.path || t.buildElementPath(e), r = n.length, i = "", t = this;
                t.build = function () {
                    for (var e = 0; e < r; e++) {
                        var t = n[r - 1 - e], s = t.nodeName;
                        if (s && s != "#document") {
                            s = s.toLowerCase();
                            if (t.id && i && i.indexOf("#") == -1) i += "#" + t.id + ">"; else if (t.previousSibling && s != "html" && s != "body") {
                                var o = t.parentNode, u = o.children || o.childNodes, a = 0;
                                for (var f = 0; f < u.length; f++) {
                                    var l = u[f];
                                    if (l == t) break;
                                    l.nodeType == 1 && a++
                                }
                                a != 0 ? i += s + "[" + a + "]" + ">" : i += s + ">"
                            } else i += s + ">"
                        }
                    }
                }, t.build();
                if (i.indexOf("#") != -1) {
                    var s = i.split("#");
                    i = "#" + s[s.length - 1]
                }
                return i = i.substring(0, i.length - 1), i
            }, buildPointByEvent: function (t) {
                var n = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                    r = t.clientY + document.body.scrollTop + document.documentElement.scrollTop, i = e.blockPixel,
                    s = t.target || t.srcElement, o = e.getTop(s), u = e.getLeft(s), a = s.offsetWidth,
                    f = s.offsetHeight, l = e.getPointCenter(n - u, i), c = e.getPointCenter(r - o, i),
                    h = Math.min(a, l), p = Math.min(f, c), d = {x: h, y: p};
                return d
            }, getPointCenter: function (e, t) {
                var n = e, r = 1;
                if (e && t && e > t) {
                    var i = e / t;
                    i.toString().indexOf(".") != -1 ? r = Math.floor(i) : r = Math.floor(i), n = (r - 1) * t + t / 2
                }
                return n
            }, buildElementPath: function (e) {
                var t = this, n = [], r = e.target || e.srcElement;
                return n.push(r), t.build = function (e) {
                    e.parentNode && (n.push(e.parentNode), t.build(e.parentNode))
                }, t.build(r), n
            }, getElementUrl: function (e) {
                var t = this, n = e.path || t.buildElementPath(e), r = n.length, i = "";
                for (var s = 0; s < r; s++) {
                    var o = n[r - 1 - s], u = o.nodeName;
                    if (u) {
                        u = u.toLowerCase();
                        if (u == "a") {
                            var a = o.getAttribute("href");
                            if (a && a.indexOf("javascript") == -1 && a != "#") {
                                i = a;
                                break
                            }
                        }
                    }
                }
                return i
            }, getElementAttribute: function (t) {
                var n = t.target || t.srcElement, r = e.buildPointByEvent(t), i = {
                    path: e.getElementPath(t),
                    url: e.getElementUrl(t),
                    point: {x: e.toDecimal(r.x / n.offsetWidth, 3), y: e.toDecimal(r.y / n.offsetHeight, 3)}
                };
                return i
            }, onEventByElems: function (t) {
                var n = "_td_heat_map_click", r = "", i = {pageId: e.pageId, elem: e.getElementAttribute(t)};
                TDAPP.onEvent(n, r, i), TDAPP.send()
            }, listenerEvent: function (t) {
                e.onEventByElems(t)
            }, getOnEventByElem: function (t) {
                if (t.tagName == "body" || t.tagName == "BODY" || t.tagName == "html" || t.tagName == "HTML") return;
                if (t.hasAttribute("td-event")) {
                    var n = t.getAttribute("td-event");
                    e.onEventByValue(n)
                } else t.parentNode && e.getOnEventByElem(t.parentNode)
            }, onEventByValue: function (e) {
                if (e) {
                    var t = e.split(","), n = t.length, r = "", i = "";
                    n == 1 ? r = t[0] : n == 2 && (r = t[0], i = t[1]), TDAPP.onEvent(r, i)
                }
            }, onEventByElemAttr: function (t) {
                var n = t.target || t.srcElement;
                e.getOnEventByElem(n)
            }, getAllAttrElements: function (e) {
                var t = document.all, n;
                for (var r = 0; r < t.length; r++) {
                    var i = t[r].tagName;
                    if (i == "body" || i == "BODY") {
                        n = r + 1;
                        break
                    }
                }
                var s = new Array;
                if (e) for (var o = n; o < t.length; o++) {
                    var i = t[o];
                    i.getAttribute(e) && s.push(i)
                } else for (var o = n; o < t.length; o++) {
                    var i = t[o];
                    s.push(i)
                }
                return s
            }, bindEventForTdEventElement: function () {
                var t = document.body || document;
                H5Event.addEventListener(t, "click", e.onEventByElemAttr)
            }, createHeatMapHtml: function () {
                var t = e.tdPageFlag, n = document.getElementById("td-heat-map-panel");
                n && n.parentNode.removeChild(n);
                var r = document.body;
                r.style.height = "auto";
                var i = e.getWindowsWH(), s = document.createElement("div");
                s.style.cssText = "position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index:9999;", s.setAttribute("class", "td-heat-map-panel"), s.setAttribute("id", "td-heat-map-panel"), s.style.height = i.height + "px", s.style.minHeight = i.minHeight + "px";
                var o = "";
                o += '<div class="heat-map-bg" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: #000;opacity: .3;filter: alpha(opacity=30);-moz-opacity: .3;-khtml-opacity: .3;"></div>', o += '<div class="heat-map-content" style="position: absolute; top: 0;left: 0;width: 100%;height: 100%;color: #fff;">', o += '<div class="heat-map-cavans" id="td-heat-map-cavans" style="height:100%;width:100%;"></div>', o += "</div>", s.innerHTML = o, r.appendChild(s)
            }, changePageStyle: function () {
                var e = document.getElementsByTagName("*");
                if (e && e.length > 0) for (var t = 0; t < e.length; t++) {
                    var n = e[t], r = n.nodeName;
                    r && (r = r.toLowerCase(), r != "html" && r != "head" && r != "meta" && r != "title" && r != "link" && r != "style" && r != "script" && r != "textarea" && r != "select" && r != "input" && r != "img" && r != "br" && (n.style.position = "relative"))
                }
            }, rendHeatMap: function () {
                TD_SDK_CONFIG && TD_SDK_CONFIG.USER_CLICK_MAP_PAGE_AUTO && e.changePageStyle();
                var t = e.tdPageFlag;
                e.createHeatMapHtml(), setTimeout(function () {
                    t == "tdHeatMap" && e.createHeatMap(), e.createPathHtmlByPath()
                }, 200)
            }, filterHeatMapDataByElem: function (e) {
                var t = [];
                if (e && e.length > 0) for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.url && t.push(r)
                }
                return t
            }, getHeatMapData: function () {
                var t = e.tdHeatMapData, n = t.elems, r = e.tdPageFlag;
                return r == "tdHeatMapLink" && (n = e.filterHeatMapDataByElem(n)), n
            }, getObjectByPath: function (e) {
                var t = document.body;
                if (e) if (e.indexOf(">") != -1) {
                    var n = 2, r = e.split(">");
                    if (e.indexOf("#") != -1) {
                        var i = r[0], s = i.substring(1, i.length);
                        t = document.getElementById(s), n = 1
                    }
                    for (var o = n; o < r.length; o++) {
                        var u = r[o], a = u.indexOf("[") + 1, f = u.indexOf("]"), l = 0;
                        a && f && (l = u.substring(a, f));
                        if (!(t && parseInt(l) < t.children.length)) {
                            t = null;
                            break
                        }
                        t = t.children[l];
                        var c = u;
                        u.indexOf("[") != -1 && (c = u.substring(0, a - 1));
                        if (c != t.nodeName.toLowerCase()) {
                            t = null;
                            break
                        }
                    }
                } else if (e.indexOf("#") != -1) {
                    var s = e.substring(1, e.length);
                    t = document.getElementById(s)
                }
                return t
            }, transPointByObject: function (t, n) {
                var r = e.getTop(n), i = e.getLeft(n), s = parseInt(parseFloat(t.x) * n.offsetWidth + i),
                    o = parseInt(parseFloat(t.y) * n.offsetHeight + r), u = {clickNum: t.clickNum, x: s, y: o};
                return u
            }, getPointsByElem: function (t) {
                var n = [], r = e.getObjectByPath(t.path);
                if (r && t && t.points && t.points.length > 0) for (var i = 0; i < t.points.length; i++) {
                    var s = e.transPointByObject(t.points[i], r);
                    n.push({x: s.x, y: s.y, value: s.clickNum})
                }
                return n
            }, rebuildHeatMapData: function (t) {
                t = t || [];
                var n = [];
                if (t && t.length > 0) for (var r = 0; r < t.length; r++) {
                    var i = t[r], s = e.getObjectByPath(i.path);
                    if (s) {
                        var o = e.getPointsByElem(i);
                        for (var u = 0; u < o.length; u++) {
                            var a = o[u];
                            a && n.push({x: a.x, y: a.y, value: a.value})
                        }
                    }
                }
                return n
            }, getHeatMapMax: function (e) {
                var t = 0;
                e = e || [];
                if (e && e.length > 0) for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    t = Math.max(t, r.value)
                }
                return t
            }, createHeatMap: function () {
                var t = document.querySelector("#td-heat-map-cavans");
                t.innerHTML = "";
                var n = TdHeatMap.create({
                    container: t,
                    gradient: {
                        .45: "rgb(0,0,255)",
                        .65: "rgb(60,179,113)",
                        .85: "rgb(255,215,0)",
                        "1.0": "rgb(205,38,38)"
                    },
                    opacity: 0,
                    radius: 30
                }), r = e.getHeatMapData(), i = e.rebuildHeatMapData(r), s = {max: e.getHeatMapMax(i), data: i};
                n.setData(s)
            }, buildHeatMapDataZindex: function (e) {
                var e = e || [], t = 0;
                if (e && e.length > 0) {
                    t = e.length;
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        r.path && r.path.indexOf("#") != -1 ? r.zIndex = t + n + 1 : r.zIndex = n
                    }
                }
                return e
            }, getTop: function (t) {
                var n = t.offsetTop;
                return t.offsetParent != null && (n += e.getTop(t.offsetParent)), n
            }, getLeft: function (t) {
                var n = t.offsetLeft;
                return t.offsetParent != null && (n += e.getLeft(t.offsetParent)), n
            }, createPathHtmlByPath: function () {
                var t = e.getPointsSum(), n = e.getWindowsWH(), r = e.tdPageFlag,
                    i = document.querySelector("#td-heat-map-cavans"), s = e.getHeatMapData();
                s = e.buildHeatMapDataZindex(s);
                if (s && s.length > 0) for (var o = 0; o < s.length; o++) {
                    var u = s[o];
                    if (u.path != "html" && u.path != "html>body") {
                        var a = e.getObjectByPath(u.path);
                        if (a) {
                            var f = a.offsetHeight, l = a.offsetWidth, c = e.getTop(a), h = e.getLeft(a);
                            l -= 10;
                            var p = document.createElement("div");
                            p.style.position = "absolute", r == "tdHeatMapLink" ? (p.style.background = "rgb(110, 172, 249)", p.style.opacity = "0.5") : p.style.background = "rgba(0,0,0,0)", p.style.zIndex = u.zIndex, p.style.width = l + "px", p.style.height = f + "px", p.style.textAlign = "center", p.style.top = c + "px", p.style.left = h + "px", p.style.padding = "0 5px", p.style.borderRadius = "3px";
                            var d = e.calElementValueBySamePath(u.path), v = 0;
                            t > 0 && (v = d / t * 100, v < 1 ? v = e.toDecimal(v, 2) : v = e.toDecimal(v, 2));
                            var m = d + "（" + v + "%）";
                            p.setAttribute("td-heat-map-text", m), p.setAttribute("td-heat-map-value", d), p.setAttribute("td-heat-map-percent", v), p.setAttribute("path", u.path);
                            if (r == "tdHeatMapLink") {
                                var g = u.uv || "";
                                p.setAttribute("td-heat-map-uv", g), p.style.lineHeight = f + "px", p.style.overflow = "hidden", p.style.textOverflow = "ellipsis", p.style.whiteSpace = "nowrap", p.innerHTML = m, p.setAttribute("title", m)
                            }
                            H5Event.addEventListener(p, "click", e.pathHtmlMouseClick), H5Event.addEventListener(p, "mouseenter", e.pathHtmlMouseEnter), H5Event.addEventListener(p, "mouseleave", e.pathHtmlMouseLeave), i.appendChild(p)
                        }
                    }
                }
            }, getPointsSum: function () {
                var t = 0, n = e.getHeatMapData();
                if (n && n.length > 0) for (var r = 0; r < n.length; r++) t += n[r].clickNum;
                return t
            }, toDecimal: function (e, t) {
                var n = parseFloat(e);
                if (isNaN(n)) return !1;
                var r = "1";
                for (var i = 0; i < t; i++) r += "0";
                var n = Math.floor(e * r) / r, s = n.toString(), o = s.indexOf(".");
                t > 0 && o < 0 && (o = s.length, s += ".");
                while (s.length <= o + t) s += "0";
                return s
            }, calElementValueBySamePath: function (t) {
                var n = 0, r = e.getHeatMapData();
                if (r && r.length > 0) for (var i = 0; i < r.length; i++) {
                    var s = r[i];
                    t == s.path && (n += s.clickNum)
                }
                return n
            }, createTooptipHtml: function (t) {
                var n = e.getWindowsWH(), r = e.tdPageFlag;
                e.removeToolTipPanel();
                var i = document.body, s = t.target || t.srcElement, o = e.getTop(s), u = e.getLeft(s),
                    a = o + s.offsetHeight, f = u, l = document.createElement("div");
                l.setAttribute("id", "td-heat-map-tooltip-panel"), l.style.position = "absolute", l.style.zIndex = "999999", l.style.top = a + "px", l.style.left = u + "px", l.style.padding = "8px", l.style.display = "inline-block", l.style.background = "rgba(0,0,0,0.8)", l.style.color = "#fff", l.style.fontSize = "12px", l.style.whiteSpace = "nowrap", l.style.lineHeight = "22px", l.style.borderRadius = "3px";
                var c = "", h = s.getAttribute("td-heat-map-text") || 0, p = s.getAttribute("td-heat-map-uv") || 0,
                    d = s.getAttribute("td-heat-map-value") || 0, v = s.getAttribute("td-heat-map-percent") || 0;
                r == "tdHeatMapLink" ? (l.style.background = "rgba(0,0,0,1)", c += "<div><span>访客数：</span><span>" + p + "</span></div>", c += "<div><span>点击数：</span><span>" + d + "</span></div>", c += "<div><span>点击占比：</span><span>" + v + "%</span></div>") : c += "<div><span>点击数：</span><span>" + h + "</span></div>", l.innerHTML = c, i.appendChild(l), a + l.offsetHeight >= n.minHeight && a + l.offsetHeight >= n.height && (a = o - l.offsetHeight, a < 0 && (a = 0), l.style.top = a + "px"), f + l.offsetWidth >= n.width && (f = n.width - l.offsetWidth, f < 0 && (f = 0), l.style.left = f + "px")
            }, removeToolTipPanel: function () {
                var e = document.getElementById("td-heat-map-tooltip-panel");
                if (e) {
                    var t = e.parentNode;
                    t && t.removeChild(e)
                }
            }, pathHtmlMouseLeave: function (t) {
                e.removeToolTipPanel();
                var n = e.tdPageFlag, r = t.target || t.srcElement;
                r.style.border = "none", r.style.cursor = "default", n == "tdHeatMapLink" && (r.style.background = "rgb(110, 172, 249)", r.style.opacity = "0.85")
            }, pathHtmlMouseClick: function (e) {
            }, pathHtmlMouseEnter: function (t) {
                var n = e.tdPageFlag, r = t.target || t.srcElement;
                r.style.cursor = "pointer", n == "tdHeatMapLink" ? (r.style.background = "rgb(18, 120, 246)", r.style.opacity = "0.95") : r.style.border = "1px solid #fff", e.createTooptipHtml(t)
            }, getWindowsWH: function () {
                var e = {};
                return e.width = document.body.clientWidth, e.height = document.body.clientHeight, e.minHeight = window.innerHeight, e
            }, initHeatMapData: function (t) {
                var n = TDJSON.parse(t.data);
                e.tdPageFlag = n.tdPageFlag || "", e.tdHeatMapData = n.data, e.initHeatMap()
            }, getSourceId: function () {
                var e = "", t = TD_SDK_CONFIG.SDK_VERSION || "";
                if (t && t.indexOf("+") != -1) {
                    var n = t.split("+")[0];
                    n == "WEB" ? e = "1" : n == "H5" && (e = "2")
                }
                return e
            }, checkIsCollectHeatMapData: function () {
                var t = DTGlobal.appkey || "", n = e.getSourceId();
                if (!t || !n || !TD_SDK_CONFIG.USER_CLICK_MAP_REQURL) return !1;
                var r = {appkey: t, sourceid: n, url: window.location.href}, i = new UrlRequest;
                i.set(r, function (t) {
                    t = TDJSON.parse(t);
                    if (t && t.page) {
                        var n = t.page;
                        e.pageId = n.id;
                        var r = {pageId: n.id};
                        TDAPP.onEvent("_td_heat_map_pv", "", r), e.listenerPageClick()
                    }
                }, function (e) {
                    console.log(e)
                }, TD_SDK_CONFIG.USER_CLICK_MAP_REQURL, "post", "HEATMAP")
            }, initHeatMap: function () {
                var t = e.tdPageFlag;
                t == "tdHeatMap" || t == "tdHeatMapLink" ? (e.rendHeatMap(), window.onresize = function () {
                    e.rendHeatMap()
                }) : e.checkIsCollectHeatMapData()
            }, listenerPageClick: function () {
                var t = document.body || document;
                H5Event.addEventListener(t, "click", e.listenerEvent)
            }, postMsgToParentWindow: function () {
                var e = "iframeDomHasLoaded";
                window.parent.postMessage(e, "*")
            }, listenerPageLoaded: function () {
                if (document.addEventListener) document.addEventListener("DOMContentLoaded", function () {
                    e.postMsgToParentWindow()
                }, !1); else if (document.all && !window.opera && H5Event.getIeVersion() < 9) {
                    document.write('<script type="text/javascript" id="tdContentLoadTag" defer="defer" src="javascript:void(0)"></script>');
                    var t = document.getElementById("tdContentLoadTag");
                    t.onreadystatechange = function () {
                        this.readyState == "complete" && e.postMsgToParentWindow()
                    }
                }
            }, init: function () {
                TD_SDK_CONFIG.EVENT_BY_ELEMENT && e.bindEventForTdEventElement(), TD_SDK_CONFIG.PAGE_LOAD_DURATION && e.calPageLoadDuration();
                if (TDIsWebviewFlag) return;
                TD_SDK_CONFIG.USER_CLICK_MAP && (window.frames.length != parent.frames.length ? (e.listenerPageLoaded(), H5Event.addEventListener(window, "message", e.initHeatMapData)) : e.initHeatMap())
            }
        };
        e.init()
    }();
})();
