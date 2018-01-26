"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var page_1 = require("ui/page");
var grid_layout_1 = require("ui/layouts/grid-layout");
var stack_layout_1 = require("ui/layouts/stack-layout");
var web_view_1 = require("ui/web-view");
var tns_oauth_webview_helper_1 = require("./tns-oauth-webview-helper");
var TnsOAuthPageProvider = (function () {
    function TnsOAuthPageProvider(checkCodeIntercept, authUrl) {
        this._checkCodeIntercept = checkCodeIntercept;
        this._authUrl = authUrl;
    }
    TnsOAuthPageProvider.prototype.loginPageFunc = function () {
        var wv = new web_view_1.WebView();
        tns_oauth_webview_helper_1.TnsOAuthWebViewHelper.initWithWebViewAndIntercept(wv, this._checkCodeIntercept);
        var grid = new grid_layout_1.GridLayout();
        grid.addChild(wv);
        var stack = new stack_layout_1.StackLayout();
        stack.addChild(grid);
        var page = new page_1.Page();
        page.content = stack;
        wv.src = this._authUrl;
        return page;
    };
    ;
    return TnsOAuthPageProvider;
}());
exports.TnsOAuthPageProvider = TnsOAuthPageProvider;
