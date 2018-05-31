import { Component } from "@angular/core";

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {}

/*
Desta has to enable signin methods + get app secret from facebook console + add key hashes + add Valid OAuth Redirect URIs 
in facebook login on facebook, sha for firebase to enable google login
*/