import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import * as dialogs from "ui/dialogs";
import { Data } from "../../shared/Data";
import { Server } from "../../shared/Server/Server";
const firebase = require("nativescript-plugin-firebase");
var http = require("http");


//continue here
//when a user logs in with facebook or google for the first time
//create the user in db

@Component({
  selector: "my-app",
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css" ]
})

export class LoginComponent implements OnInit{
  user: any;
  newUser: any;
  userData: any;
  userCreated = false;
  signingUp = false;
  @ViewChild("container") container: ElementRef;
  site: string = "http://188.166.127.207:5555/api.php/";
  userId: any;
  server: Server;


  constructor(private router: Router, private page: Page, private data: Data) {
    this.user = {
      "email" : "kasia.zubowicz@gmail.com",
      "password" : "qwerty123"
    }
    this.userId = 0;
    this.server = new Server();
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
          this.findUser();
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
        console.log("Google login succeded");
        router.navigate(["/tab"]);
    },
    function(error) {
      console.log(error);
    }
  );
}

  signUp() {
    this.signingUp = true;
    this.newUser = {
      "email" : "newUser@user.com",
      "password" : "newPassword"
    }

  }

  signUpToFirebase() {
    if (this.newUser.email && this.newUser.password) {
      firebase.createUser({
          email: this.newUser.email,
          password: this.newUser.password
      }).then(
        (result) =>  {
          alert("User created");
          this.userCreated = true;
          this.signingUp = false;
          this.server = new Server();
          this.userData = {
            "firstName" : "",
            "lastName" : "",
            "location" : "",
            "profession" : ""
          }
     },
        (error) =>  {
          alert(error);
          this.newUser = {
            "email" : "",
            "password" : "" }
          }
      )
    }
  }

  saveData() {
      if (this.userData.firstName && this.userData.lastName) {
          var ok = this.server.saveUser(this.userData.firstName, this.userData.lastName, this.userData.location, this.userData.profession, this.newUser.email)
          this.signingUp = false;
          this.userCreated = false;
      } else {
        alert("Fields first and last name can't be empty!");
      }
      firebase.getCurrentUser()
      .then( () => {
        this.findUser();
        this.router.navigate(["/tab"])}) 
      .catch(error => console.log("Not logged in " + error));
  }

  findUser() {
    firebase.getCurrentUser()
    .then(user => {
        console.log("TABBBBBBB Users email is " + user.email);
        var query: string = this.site + "users?transform=1&filter=email,eq,"+user.email;
        //alert(query);
        http.getJSON(query)
        .then((r) => { 
            if (r.users.length > 0) {
                //alert("User found " + r.users[0].user_Id + r.users[0].email);
                this.userId = r.users[0].user_Id;
                this.data.storage = {
                  "firstName" : r.users[0].first_Name,
                  "lastName" : r.users[0].last_Name,
                  "email" : r.users[0].email,
                  "id" : r.users[0].user_Id,
                  "gender" : r.users[0].gender,
                  "dob" : r.users[0].DOB,
                  "avatar" : r.users[0].avatar,
                  "profession" : r.users[0].profession,
                  "location" : r.users[0].location,
                  "hobby" : r.users[0].hobby

                }
            } else {
                alert("User not found " + user.email); 
            }
        })
        
    })
    
    .catch(error => console.error(error));
    console.log("Users id " + this.userId);
    
}

  ngOnInit() {
    this.page.actionBarHidden = true;
    firebase.getCurrentUser()
    .then( () => {
      this.findUser();
      this.router.navigate(["/tab"])}) 
    .catch(error => console.log("Not logged in " + error));
  }
}