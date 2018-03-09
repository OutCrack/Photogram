import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import * as dialogs from "ui/dialogs";
const firebase = require("nativescript-plugin-firebase");


@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css" ]
})

export class LoginComponent implements OnInit{
  user: any;
  isLoggingIn = true;
  @ViewChild("container") container: ElementRef;

  constructor(private router: Router, private userService: UserService, private page: Page) {
    this.user = {
      "email" : "test@photogram.com",
      "password" : "123456"
    }
  } 

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    if (this.user.email && this.user.password) {
      firebase.login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
          email: this.user.email,
          password: this.user.password
        }
      })
      .then(
        () => {
          console.log("Logged inn");
          this.router.navigate(["/tab"]);
        })
      .catch(error => console.log(error));
    }
  }

  faceLogin() {
    var router = this.router;
      firebase.login({
        type: firebase.LoginType.FACEBOOK,
        facebookOptions: {
          scope: ['public_profile', 'email']
        }
      }).then(
        function(fb_result) {
          console.log("Facebook login");
          router.navigate(["/tab"]);
          
          //var fb_access_token = fb_result.providers[1].token;
        },
        function(err) {
          console.log("Error logging to Facebook" + err);
        }
      );
  }

  googleLogin() {
    var router = this.router;
    firebase.login({
    type: firebase.LoginType.GOOGLE
    }).then(
      function (result) {
        JSON.stringify(result);
        console.log("Google login succeded")
        router.navigate(["/tab"]);
    },
    function(error) {
      console.log(error);
    }
  );
}

  signUp() {
    if (this.user.email && this.user.password) {
      firebase.createUser({
        email: this.user.email,
          password: this.user.password
      }).then(
        (result) => alert("User created"),
        (error) => alert(error)
      )
    }
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
    firebase.getCurrentUser()
    .then(user => this.router.navigate(["/tab"]))
    .catch(error => console.log("Not logged in " + error));
  }
}