import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

const firebase = require("nativescript-plugin-firebase");

platformNativeScriptDynamic().bootstrapModule(AppModule);

