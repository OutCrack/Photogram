"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var trace = require("trace");
var TnsOAuthWebViewHelper = (function (_super) {
    __extends(TnsOAuthWebViewHelper, _super);
    function TnsOAuthWebViewHelper() {
        var _this = _super.call(this) || this;
        return global.__native(_this);
    }
    TnsOAuthWebViewHelper.initWithWebViewAndIntercept = function (wv, checkCodeIntercept) {
        var wvCreateNv = wv.createNativeView;
        wv.createNativeView = function () {
            wv._webViewClient = TnsOAuthWebViewHelper.initWithView(wv, checkCodeIntercept);
            var nativeView = new android.webkit.WebView(wv._context);
            nativeView.getSettings().setJavaScriptEnabled(true);
            nativeView.getSettings().setBuiltInZoomControls(true);
            nativeView.setWebViewClient(wv._webViewClient);
            nativeView.client = wv._webViewClient;
            return nativeView;
        };
    };
    TnsOAuthWebViewHelper.initWithView = function (view, checkCodeIntercept) {
        try {
            var client = new TnsOAuthWebViewHelper();
            client._view = view;
            client._origClient = view._webViewClient;
            client._checkCodeIntercept = checkCodeIntercept;
            return client;
        }
        catch (er) {
            console.dir(er);
        }
    };
    TnsOAuthWebViewHelper.prototype.shouldOverrideUrlLoading = function (view, url) {
        if (trace.isEnabled()) {
            trace.write("WebViewClientClass.shouldOverrideUrlLoading(" + url + ")", trace.categories.Debug);
        }
        var urlStr = '';
        if (typeof url === 'string') {
            urlStr = url;
        }
        else if (typeof url === 'object') {
            try {
                urlStr = url.getUrl().toString();
            }
            catch (ex) {
                return false;
            }
        }
        else {
            return false;
        }
        if (this._checkCodeIntercept(this._view, null, urlStr)) {
            return true;
        }
        return false;
    };
    TnsOAuthWebViewHelper.prototype.onPageStarted = function (view, url, favicon) {
        this._checkCodeIntercept(this._view, null, url);
        _super.prototype.onPageStarted.call(this, view, url, favicon);
        if (this._view) {
            if (trace.isEnabled()) {
                trace.write("WebViewClientClass.onPageStarted(" + url + ", " + favicon + ")", trace.categories.Debug);
            }
            this._view._onLoadStarted(url, undefined);
        }
    };
    TnsOAuthWebViewHelper.prototype.onPageFinished = function (view, url) {
        _super.prototype.onPageFinished.call(this, view, url);
        if (this._view) {
            if (trace.isEnabled()) {
                trace.write("WebViewClientClass.onPageFinished(" + url + ")", trace.categories.Debug);
            }
            this._checkCodeIntercept(this._view, null, url);
            this._view._onLoadFinished(url, undefined);
        }
    };
    TnsOAuthWebViewHelper.prototype.onReceivedError = function () {
        var view = arguments[0];
        if (arguments.length === 4) {
            var errorCode = arguments[1];
            var description = arguments[2];
            var failingUrl = arguments[3];
            this._checkCodeIntercept(this._view, null, failingUrl);
            _super.prototype.onReceivedError.call(this, view, errorCode, description, failingUrl);
            if (this._view) {
                if (trace.isEnabled()) {
                    trace.write("WebViewClientClass.onReceivedError(" + errorCode + ", " + description + ", " + failingUrl + ")", trace.categories.Debug);
                }
                this._view._onLoadFinished(failingUrl, description + "(" + errorCode + ")");
            }
        }
        else {
            var request = arguments[1];
            var error = arguments[2];
            this._checkCodeIntercept(this._view, error);
            _super.prototype.onReceivedError.call(this, view, request, error);
            if (this._view) {
                if (trace.isEnabled()) {
                    trace.write("WebViewClientClass.onReceivedError(" + error.getErrorCode() + ", " + error.getDescription() + ", " + (error.getUrl && error.getUrl()) + ")", trace.categories.Debug);
                }
                this._view._onLoadFinished(error.getUrl && error.getUrl(), error.getDescription() + "(" + error.getErrorCode() + ")");
            }
        }
    };
    return TnsOAuthWebViewHelper;
}(android.webkit.WebViewClient));
exports.TnsOAuthWebViewHelper = TnsOAuthWebViewHelper;
