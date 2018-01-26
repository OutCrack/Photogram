"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require("querystring");
var URL = require("url");
var http = require("http");
var frameModule = require("ui/frame");
var platform = require("platform");
var utils = require("./tns-oauth-utils");
var tns_oauth_page_provider_1 = require("./tns-oauth-page-provider");
var tns_oauth_token_cache_1 = require("./tns-oauth-token-cache");
exports.ACCESS_TOKEN_CACHE_KEY = 'ACCESS_TOKEN_CACHE_KEY';
exports.REFRESH_TOKEN_CACHE_KEY = 'REFRESH_TOKEN_CACHE_KEY';
function getAuthHeaderFromCredentials(credentials) {
    var customAuthHeader;
    if (credentials['basicAuthHeader']) {
        customAuthHeader = { 'Authorization': credentials['basicAuthHeader'] };
    }
    return customAuthHeader;
}
function getTokenFromCode(credentials, code) {
    var customAuthHeader = getAuthHeaderFromCredentials(credentials);
    var oauth2 = new TnsOAuth(credentials.clientId, credentials.clientSecret, credentials.authority, credentials.tokenEndpointBase, credentials.authorizeEndpoint, credentials.tokenEndpoint, customAuthHeader);
    var oauthParams = {
        grant_type: 'authorization_code',
        redirect_uri: credentials.redirectUri,
        response_mode: 'form_post',
        nonce: utils.newUUID(),
        state: 'abcd'
    };
    return oauth2.getOAuthAccessToken(code, oauthParams);
}
function getTokenFromRefreshToken(credentials, refreshToken) {
    var customAuthHeader = getAuthHeaderFromCredentials(credentials);
    var oauth2 = new TnsOAuth(credentials.clientId, credentials.clientSecret, credentials.authority, credentials.tokenEndpointBase, credentials.authorizeEndpoint, credentials.tokenEndpoint, customAuthHeader);
    var oauthParams = {
        grant_type: 'refresh_token',
        redirect_uri: credentials.redirectUri,
        response_mode: 'form_post',
        nonce: utils.newUUID(),
        state: 'abcd'
    };
    return oauth2.getOAuthAccessToken(refreshToken, oauthParams);
}
exports.getTokenFromRefreshToken = getTokenFromRefreshToken;
function getAuthUrl(credentials) {
    return credentials.authority + credentials.authorizeEndpoint +
        '?client_id=' + credentials.clientId +
        '&response_type=code' +
        '&redirect_uri=' + credentials.redirectUri +
        '&scope=' + credentials.scope +
        '&response_mode=query' +
        '&nonce=' + utils.newUUID() +
        '&state=abcd';
}
exports.getAuthUrl = getAuthUrl;
function getTokenFromCache() {
    return tns_oauth_token_cache_1.TnsOAuthTokenCache.getToken();
}
exports.getTokenFromCache = getTokenFromCache;
function loginViaAuthorizationCodeFlow(credentials, successPage) {
    return new Promise(function (resolve, reject) {
        var navCount = 0;
        var checkCodeIntercept = function (webView, error, url) {
            var retStr = '';
            try {
                if (error && error.userInfo && error.userInfo.allValues && error.userInfo.allValues.count > 0) {
                    var val0 = error.userInfo.allValues[0];
                    if (val0.absoluteString) {
                        retStr = error.userInfo.allValues[0].absoluteString;
                    }
                    else if (val0.userInfo && val0.userInfo.allValues && val0.userInfo.allValues.count > 0) {
                        retStr = val0.userInfo.allValues[0];
                    }
                    else {
                        retStr = val0;
                    }
                }
                else if (webView.request && webView.request.URL && webView.request.URL.absoluteString) {
                    retStr = webView.request.URL.absoluteString;
                }
                else if (url) {
                    retStr = url;
                }
            }
            catch (ex) {
                reject('Failed to resolve return URL');
            }
            if (retStr != '') {
                var parsedRetStr = URL.parse(retStr);
                if (parsedRetStr.query) {
                    var qsObj = querystring.parse(parsedRetStr.query);
                    var codeStr = qsObj['code'] ? qsObj['code'] : qsObj['xsrfsign'];
                    var errSubCode = qsObj['error_subcode'];
                    if (codeStr) {
                        try {
                            getTokenFromCode(credentials, codeStr)
                                .then(function (response) {
                                tns_oauth_token_cache_1.TnsOAuthTokenCache.setToken(response);
                                if (successPage && navCount === 0) {
                                    var navEntry = {
                                        moduleName: successPage,
                                        clearHistory: true
                                    };
                                    frameModule.topmost().navigate(navEntry);
                                }
                                else {
                                    frameModule.topmost().goBack();
                                }
                                navCount++;
                                resolve(response);
                            })
                                .catch(function (er) {
                                reject(er);
                            });
                        }
                        catch (er) {
                            console.error('getOAuthAccessToken error occurred...');
                            console.dir(er);
                            reject(er);
                        }
                        return true;
                    }
                    else {
                        if (errSubCode) {
                            if (errSubCode == 'cancel') {
                                frameModule.topmost().goBack();
                            }
                        }
                    }
                }
            }
            return false;
        };
        console.log('LOGIN PAGE URL = ' + getAuthUrl(credentials));
        var authPage = new tns_oauth_page_provider_1.TnsOAuthPageProvider(checkCodeIntercept, getAuthUrl(credentials));
        frameModule.topmost().navigate(function () { return authPage.loginPageFunc(); });
    });
}
exports.loginViaAuthorizationCodeFlow = loginViaAuthorizationCodeFlow;
function refreshToken(credentials) {
    return new Promise(function (resolve, reject) {
        try {
            var oldTokenResult = tns_oauth_token_cache_1.TnsOAuthTokenCache.getToken();
            getTokenFromRefreshToken(credentials, oldTokenResult.refreshToken)
                .then(function (response) {
                tns_oauth_token_cache_1.TnsOAuthTokenCache.setToken(response);
                resolve(response);
            })
                .catch(function (er) {
                reject(er);
            });
        }
        catch (er) {
            console.error('refreshToken error occurred...');
            console.dir(er);
            reject(er);
        }
    });
}
exports.refreshToken = refreshToken;
function logout(cookieDomains, successPage) {
    if (platform.isIOS) {
        var cookieArr = utils.nsArrayToJSArray(NSHTTPCookieStorage.sharedHTTPCookieStorage.cookies);
        for (var i = 0; i < cookieArr.length; i++) {
            var cookie = cookieArr[i];
            for (var j = 0; j < cookieDomains.length; j++) {
                if (utils.endsWith(cookie.domain, cookieDomains[j])) {
                    NSHTTPCookieStorage.sharedHTTPCookieStorage.deleteCookie(cookie);
                }
            }
        }
    }
    else if (platform.isAndroid) {
        var cookieManager = android.webkit.CookieManager.getInstance();
        if (cookieManager.removeAllCookies) {
            var cm23 = cookieManager;
            cm23.removeAllCookies(null);
            cm23.flush();
        }
        else if (cookieManager.removeAllCookie) {
            cookieManager.removeAllCookie();
            cookieManager.removeSessionCookie();
        }
    }
    tns_oauth_token_cache_1.TnsOAuthTokenCache.removeToken();
    if (successPage) {
        var navEntry = {
            moduleName: successPage,
            clearHistory: true
        };
        frameModule.topmost().navigate(navEntry);
    }
}
exports.logout = logout;
var TnsOAuth = (function () {
    function TnsOAuth(clientId, clientSecret, baseSite, baseSiteToken, authorizePath, accessTokenPath, customHeaders) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._baseSite = baseSite;
        this._baseSiteToken = baseSiteToken;
        this._authorizeUrl = authorizePath || "/oauth/authorize";
        this._accessTokenUrl = accessTokenPath || "/oauth/access_token";
        this._accessTokenName = "access_token";
        this._authMethod = "Bearer";
        this._customHeaders = customHeaders || {};
        this._useAuthorizationHeaderForGET = false;
    }
    Object.defineProperty(TnsOAuth.prototype, "accessTokenUrl", {
        get: function () {
            if (this._baseSiteToken && this._baseSiteToken != '') {
                return this._baseSiteToken + this._accessTokenUrl;
            }
            else {
                return this._baseSite + this._accessTokenUrl;
            }
        },
        enumerable: true,
        configurable: true
    });
    TnsOAuth.prototype.setAccessTokenName = function (name) {
        this._accessTokenName = name;
    };
    TnsOAuth.prototype.setAuthMethod = function (authMethod) {
        this._authMethod = authMethod;
    };
    ;
    TnsOAuth.prototype.useAuthorizationHeaderforGET = function (useIt) {
        this._useAuthorizationHeaderForGET = useIt;
    };
    TnsOAuth.prototype.buildAuthHeader = function (token) {
        return this._authMethod + ' ' + token;
    };
    ;
    TnsOAuth.prototype.getAuthorizeUrl = function (params) {
        var params = params || {};
        params['client_id'] = this._clientId;
        return this._baseSite + this._authorizeUrl + "?" + querystring.stringify(params);
    };
    TnsOAuth.prototype.getOAuthAccessToken = function (code, params) {
        var _this = this;
        var params = params || {};
        params['client_id'] = this._clientId;
        if (this._clientSecret && this._clientSecret != '') {
            params['client_secret'] = this._clientSecret;
        }
        var codeParam = (params.grant_type === 'refresh_token') ? 'refresh_token' : 'code';
        params[codeParam] = code;
        var post_data = querystring.stringify(params);
        var post_headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return new Promise(function (resolve, reject) {
            _this._request("POST", _this.accessTokenUrl, post_headers, post_data, null)
                .then(function (response) {
                var results;
                try {
                    results = response.content.toJSON();
                }
                catch (e) {
                    results = querystring.parse(response.content.toString());
                }
                var access_token = results["access_token"];
                var refresh_token = results["refresh_token"];
                var expires_in = results["expires_in"];
                delete results["refresh_token"];
                var expSecs = Math.floor(parseFloat(expires_in));
                var expDate = new Date();
                expDate.setSeconds(expDate.getSeconds() + expSecs);
                var tokenResult = {
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    accessTokenExpiration: expDate,
                    refreshTokenExpiration: expDate
                };
                resolve(tokenResult);
            })
                .catch(function (er) {
                reject(er);
            });
        });
    };
    TnsOAuth.prototype._request = function (method, url, headers, post_body, access_token) {
        var parsedUrl = URL.parse(url, true);
        var realHeaders = {};
        for (var key in this._customHeaders) {
            realHeaders[key] = this._customHeaders[key];
        }
        if (headers) {
            for (var key in headers) {
                realHeaders[key] = headers[key];
            }
        }
        realHeaders['Host'] = parsedUrl.host;
        if (access_token && !('Authorization' in realHeaders)) {
            if (!parsedUrl.query) {
                parsedUrl.query = {};
            }
            parsedUrl.query[this._accessTokenName] = access_token;
        }
        var queryStr = querystring.stringify(parsedUrl.query);
        if (queryStr) {
            queryStr = "?" + queryStr;
        }
        var options = {
            host: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + queryStr,
            method: method,
            headers: realHeaders
        };
        return this._executeRequest(options, url, post_body);
    };
    TnsOAuth.prototype._executeRequest = function (options, url, post_body) {
        var promise = http.request({
            url: url,
            method: options.method,
            headers: options.headers,
            content: post_body
        });
        return promise;
    };
    return TnsOAuth;
}());
