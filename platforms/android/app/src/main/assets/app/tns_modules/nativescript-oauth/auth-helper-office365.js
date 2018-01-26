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
var AuthHelperOffice365 = (function (_super) {
    __extends(AuthHelperOffice365, _super);
    function AuthHelperOffice365(clientId, scope) {
        var _this = _super.call(this) || this;
        var scopeStr = scope.join('%20');
        _this.credentials = {
            authority: 'https://login.microsoftonline.com/common',
            authorizeEndpoint: '/oauth2/v2.0/authorize',
            tokenEndpoint: '/oauth2/v2.0/token',
            clientId: clientId,
            redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
            scope: scopeStr
        };
        return _this;
    }
    AuthHelperOffice365.prototype.logout = function (successPage) {
        var cookieDomains = ["login.microsoftonline.com", ".live.com"];
        return this._logout(successPage, cookieDomains);
    };
    return AuthHelperOffice365;
}(auth_helper_1.AuthHelper));
exports.AuthHelperOffice365 = AuthHelperOffice365;
