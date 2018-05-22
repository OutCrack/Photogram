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
  //@ViewChild("container") container: ElementRef;
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
        })
      .catch(error => alert(error));
    }
  }

  faceLogin() {
    var router = this.router;
    var that = this;
      firebase.login({
        type: firebase.LoginType.FACEBOOK,
        facebookOptions: {
          scope: ['public_profile', 'email']
        }
      }).then(
        function(fb_result) {
          that.findUser();
        },
        function(err) {
          alert("Login unsuccessfull " + err);
        }
      );
  }

  googleLogin() {
    var router = this.router;
    var that = this;
    firebase.login({
    type: firebase.LoginType.GOOGLE
    }).then(
      function (result) {
        JSON.stringify(result);
        that.findUser();
    },
    function(err) {
      console.log(err);
      alert("Login unsuccessfull " + err);
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
          alert("Error signing up " + (error));
          this.newUser = {
            "email" : "",
            "password" : "" }
          }
      )
    }
  }

  saveData() {
      if (this.userData.firstName && this.userData.lastName) {
        firebase.getCurrentUser() 
          .then(user => {
            var ok = new Promise((resolve, reject) => {
              this.server.saveUser(this.userData.firstName, this.userData.lastName, this.userData.location, 
                this.userData.profession, user.email)
              this.signingUp = false;
              this.userCreated = false;
              resolve();
            }); 
            ok.then(() => {
              this.findUser();
            });
            
          })
          .catch(error => console.error(error));

      } else {
        alert("Fields first and last name can't be empty!");
      }
  }

  findUser() {
    firebase.getCurrentUser()
    .then(user => {
        this.user.email = user.email;
        var query: string = this.site + "users?transform=1&filter=email,eq,"+user.email;
        http.getJSON(query)
        .then((r) => { 
            if (r.users.length > 0) {
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
                this.server.saveAlbum(r.users[0].user_Id, r.users[0].first_Name + "'s album" ,
                true, "Album for feed photos");
                this.router.navigate(["/tab"]);
            } else {
              this.userData = {
                "firstName" : "",
                "lastName" : "",
                "location" : "",
                "profession" : ""
              }
                this.userCreated = true;
                this.signingUp = false;
                this.server = new Server();
            }
        }, function(e) {
          //alert("User not found ");
        })
        
    })
    
    .catch(error => console.error(error)); 
}

cancel() {
  this.signingUp = false;
}

  ngOnInit() {
    this.page.actionBarHidden = true;
    firebase.getCurrentUser()
    .then( () => {
      this.findUser();
    }) 
    .catch(error => console.log("Not logged in " + error));
  }
}