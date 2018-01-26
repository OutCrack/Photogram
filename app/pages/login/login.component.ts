import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import * as tnsOAuthModule from "nativescript-oauth";
import * as dialogs from "ui/dialogs";


@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
})

export class LoginComponent {
  user: User;
  isLoggingIn = true;
  face = false;
  @ViewChild("container") container: ElementRef;

  constructor(private router: Router, private userService: UserService, private page: Page) {
    this.user = new User();
    this.user.email = "tests@photogram.com";
    this.user.password = "test1234";
  } 

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/tab"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  public faceLogin() {
    tnsOAuthModule.ensureValidToken()
    .then((token: string) => {
      console.log("Token: " + token);
      this.router.navigate(["/tab"]);
      this.face = true;
    })
    .catch((er) => {
      console.error("Error logging in");
      console.dir(er);
      alert("We could not log you in");
    });
  }

  public faceLogout() {
    tnsOAuthModule.logout()
    .then(() => { 
      console.log("Logged out with Facebook");
      alert("Facebook logout succeded"); 
      this.face = false;
    })
      .catch((er) => {
          console.error("Error loging out with facebook");
          console.dir(er);
      });
}

  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}