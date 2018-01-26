"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tnsOauth = require("./tns-oauth");
var AuthHelper = (function () {
    function AuthHelper() {
        this.tokenResult = tnsOauth.getTokenFromCache();
    }
    AuthHelper.prototype.login = function (successPage) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            tnsOauth.loginViaAuthorizationCodeFlow(_this.credentials, successPage)
                .then(function (response) {
                _this.tokenResult = response;
                resolve(response.accessToken);
            })
                .catch(function (er) {
                reject(er);
            });
        });
    };
    AuthHelper.prototype.refreshToken = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            tnsOauth.refreshToken(_this.credentials)
                .then(function (response) {
                _this.tokenResult = response;
                resolve(response.accessToken);
            })
                .catch(function (er) {
                reject(er);
            });
        });
    };
    AuthHelper.prototype._logout = function (successPage, cookieDomains) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                tnsOauth.logout(cookieDomains, successPage);
                _this.tokenResult = null;
                resolve();
            }
            catch (er) {
                reject(er);
            }
        });
    };
    AuthHelper.prototype.accessTokenExpired = function () {
        if (this.tokenResult && this.tokenResult.accessTokenExpiration) {
            return this.tokenResult.accessTokenExpiration < (new Date());
        }
        else {
            return true;
        }
    };
    AuthHelper.prototype.refreshTokenExpired = function () {
        if (this.tokenResult && this.tokenResult.refreshTokenExpiration) {
            if (this.tokenResult.refreshTokenExpiration) {
                return this.tokenResult.refreshTokenExpiration < (new Date());
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    return AuthHelper;
}());
exports.AuthHelper = AuthHelper;
