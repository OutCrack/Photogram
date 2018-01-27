import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import * as tnsOAuthModule from 'nativescript-oauth';

platformNativeScriptDynamic().bootstrapModule(AppModule);

var facebookInitOptions : tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '163605604272974',
    clientSecret: '985db09d1d265f6b13ab1266cf72cf5e',
    scope: ['email']
};

tnsOAuthModule.initFacebook(facebookInitOptions);
