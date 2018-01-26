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
var TnsOAuthWebViewHelper = (function (_super) {
    __extends(TnsOAuthWebViewHelper, _super);
    function TnsOAuthWebViewHelper() {
        return _super.call(this) || this;
    }
    TnsOAuthWebViewHelper.initWithWebViewAndIntercept = function (wv, checkCodeIntercept) {
        wv._delegate = TnsOAuthWebViewHelper.initWithOwner(new WeakRef(wv), checkCodeIntercept);
    };
    TnsOAuthWebViewHelper.initWithOwner = function (owner, checkCodeIntercept) {
        var delegate = new TnsOAuthWebViewHelper();
        delegate._owner = owner;
        delegate._origDelegate = owner.get()._delegate;
        delegate._checkCodeIntercept = checkCodeIntercept;
        return delegate;
    };
    TnsOAuthWebViewHelper.prototype.webViewShouldStartLoadWithRequestNavigationType = function (webView, request, navigationType) {
        return this._origDelegate.webViewShouldStartLoadWithRequestNavigationType(webView, request, navigationType);
    };
    TnsOAuthWebViewHelper.prototype.webViewDidStartLoad = function (webView) {
        this._origDelegate.webViewDidStartLoad(webView);
    };
    TnsOAuthWebViewHelper.prototype.webViewDidFinishLoad = function (webView) {
        this._checkCodeIntercept(webView, null);
        this._origDelegate.webViewDidFinishLoad(webView);
    };
    TnsOAuthWebViewHelper.prototype.webViewDidFailLoadWithError = function (webView, error) {
        this._checkCodeIntercept(webView, error);
        this._origDelegate.webViewDidFailLoadWithError(webView, error);
    };
    return TnsOAuthWebViewHelper;
}(NSObject));
TnsOAuthWebViewHelper.ObjCProtocols = [UIWebViewDelegate];
exports.TnsOAuthWebViewHelper = TnsOAuthWebViewHelper;
