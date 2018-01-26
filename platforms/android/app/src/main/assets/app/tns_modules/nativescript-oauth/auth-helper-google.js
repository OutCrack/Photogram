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
var AuthHelperGoogle = (function (_super) {
    __extends(AuthHelperGoogle, _super);
    function AuthHelperGoogle(clientId, scope) {
        var _this = _super.call(this) || this;
        var scopeStr = scope.join('%20');
        _this.credentials = {
            authority: 'https://accounts.google.com/o',
            authorizeEndpoint: '/oauth2/v2/auth',
            tokenEndpoint: '/oauth2/v2.0/token',
            clientId: clientId,
            redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
            scope: scopeStr
        };
        return _this;
    }
    AuthHelperGoogle.prototype.logout = function (successPage) {
        var cookieDomains = [".google.com"];
        return this._logout(successPage, cookieDomains);
    };
    return AuthHelperGoogle;
}(auth_helper_1.AuthHelper));
exports.AuthHelperGoogle = AuthHelperGoogle;
