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
var auth_helper_1 = require("./auth-helper");
var AuthHelperFacebook = (function (_super) {
    __extends(AuthHelperFacebook, _super);
    function AuthHelperFacebook(clientId, clientSecret, scope) {
        var _this = _super.call(this) || this;
        var scopeStr = scope.join('%20');
        _this.credentials = {
            authority: 'https://www.facebook.com/dialog',
            tokenEndpointBase: 'https://graph.facebook.com',
            authorizeEndpoint: '/oauth',
            tokenEndpoint: '/v2.3/oauth/access_token',
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: 'https://www.facebook.com/connect/login_success.html',
            scope: scopeStr
        };
        return _this;
    }
    AuthHelperFacebook.prototype.logout = function (successPage) {
        var cookieDomains = [".facebook.com"];
        return this._logout(successPage, cookieDomains);
    };
    return AuthHelperFacebook;
}(auth_helper_1.AuthHelper));
exports.AuthHelperFacebook = AuthHelperFacebook;
