import { platformNativeScriptDynamic } from "nativescript-angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { ActivatedRoute } from "@angular/router";

import firebase = require("nativescript-plugin-firebase");
import { Data } from "./shared/Data";

firebase.init({
  onAuthStateChanged: function(data) { 
    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
    if (data.loggedIn) { 
      //console.log("user's email adress is " + (data.user.email ? data.user.email : "N/A"));
    }
  }
})
.then(() => console.log("Firebase initialized"))
.catch(error => console.error(Error));

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  bootstrap: [AppComponent],
  providers: [Data]
})
export class AppModule {}