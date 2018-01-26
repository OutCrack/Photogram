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
var AuthHelperLinkedIn = (function (_super) {
    __extends(AuthHelperLinkedIn, _super);
    function AuthHelperLinkedIn(clientId, clientSecret, redirectUri, scope) {
        var _this = _super.call(this) || this;
        var scopeStr = scope.join('%20');
        _this.credentials = {
            authority: 'https://www.linkedin.com',
            tokenEndpointBase: 'https://www.linkedin.com',
            authorizeEndpoint: '/oauth/v2/authorization',
            tokenEndpoint: '/oauth/v2/accessToken',
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: redirectUri,
            scope: scopeStr
        };
        return _this;
    }
    AuthHelperLinkedIn.prototype.logout = function (successPage) {
        var cookieDomains = [".linkedin.com"];
        return this._logout(successPage, cookieDomains);
    };
    return AuthHelperLinkedIn;
}(auth_helper_1.AuthHelper));
exports.AuthHelperLinkedIn = AuthHelperLinkedIn;
