"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_helper_office365_1 = require("./auth-helper-office365");
var auth_helper_facebook_1 = require("./auth-helper-facebook");
var auth_helper_google_1 = require("./auth-helper-google");
var auth_helper_uaa_1 = require("./auth-helper-uaa");
var auth_helper_linkedin_1 = require("./auth-helper-linkedin");
exports.instance = null;
function initOffice365(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (exports.instance !== null) {
                reject("You already ran init");
                return;
            }
            exports.instance = new auth_helper_office365_1.AuthHelperOffice365(options.clientId, options.scope);
            resolve(exports.instance);
        }
        catch (ex) {
            console.log("Error in AuthHelperOffice365.init: " + ex);
            reject(ex);
        }
    });
}
exports.initOffice365 = initOffice365;
function initFacebook(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (exports.instance !== null) {
                reject("You already ran init");
                return;
            }
            exports.instance = new auth_helper_facebook_1.AuthHelperFacebook(options.clientId, options.clientSecret, options.scope);
            resolve(exports.instance);
        }
        catch (ex) {
            console.log("Error in AuthHelperFacebook.init: " + ex);
            reject(ex);
        }
    });
}
exports.initFacebook = initFacebook;
function initGoogle(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (exports.instance !== null) {
                reject("You already ran init");
                return;
            }
            exports.instance = new auth_helper_google_1.AuthHelperGoogle(options.clientId, options.scope);
            resolve(exports.instance);
        }
        catch (ex) {
            console.log("Error in AuthHelperFacebook.init: " + ex);
            reject(ex);
        }
    });
}
exports.initGoogle = initGoogle;
function initUaa(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (exports.instance !== null) {
                reject("You already ran init");
                return;
            }
            exports.instance = new auth_helper_uaa_1.AuthHelperUaa(options.authority, options.redirectUri, options.clientId, options.clientSecret, options.scope, options.cookieDomains, options.basicAuthHeader);
            resolve(exports.instance);
        }
        catch (ex) {
            console.log("Error in AuthHelperUaa.init: " + ex);
            reject(ex);
        }
    });
}
exports.initUaa = initUaa;
function initLinkedIn(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (exports.instance !== null) {
                reject("You already ran init");
                return;
            }
            exports.instance = new auth_helper_linkedin_1.AuthHelperLinkedIn(options.clientId, options.clientSecret, options.redirectUri, options.scope);
            resolve(exports.instance);
        }
        catch (ex) {
            console.log("Error in AuthHelperLinkedIn.init: " + ex);
            reject(ex);
        }
    });
}
exports.initLinkedIn = initLinkedIn;
function accessToken() {
    return exports.instance.tokenResult.accessToken;
}
exports.accessToken = accessToken;
function login(successPage) {
    return exports.instance.login(successPage);
}
exports.login = login;
function logout(successPage) {
    return exports.instance.logout(successPage);
}
exports.logout = logout;
function accessTokenExpired() {
    return exports.instance.accessTokenExpired();
}
exports.accessTokenExpired = accessTokenExpired;
function ensureValidToken() {
    return new Promise(function (resolve, reject) {
        if (exports.instance.accessTokenExpired()) {
            if (exports.instance.refreshTokenExpired()) {
                login()
                    .then(function (response) {
                    resolve(response);
                })
                    .catch(function (er) {
                    reject(er);
                });
            }
            else {
                exports.instance.refreshToken()
                    .then(function (result) {
                    resolve(result);
                })
                    .catch(function (er) {
                    reject(ErrorEvent);
                });
            }
        }
        else {
            resolve(accessToken());
        }
    });
}
exports.ensureValidToken = ensureValidToken;
