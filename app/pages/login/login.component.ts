import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";
import * as dialogs from "ui/dialogs";
import { Data } from "../../shared/Data";
import { Server } from "../../shared/Server/Server";
import * as application from "application";
const firebase = require("nativescript-plugin-firebase");
import { AndroidApplication, AndroidActivityBackPressedEventData} from "application";
import { componentFactoryName } from "@angular/compiler";
var http = require("http");

/**
 * 
 * 
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
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
  site: string = "http://188.166.127.207:5555/api.php/";
  userId: any;
  server: Server;


  /**
   * Creates an instance of LoginComponent.
   * @param {Router} router 
   * @param {Page} page 
   * @param {Data} data 
   * @memberof LoginComponent
   */
  constructor(private router: Router, private page: Page, private data: Data) {
    this.user = {
      "email" : "",
      "password" : ""
    }
    this.userId = 0;
    this.server = new Server();
  } 

  /**
   * 
   * 
   * @memberof LoginComponent
   */
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
          firebase.login();
          this.findUser();
        })
      .catch(error => alert(error));
    }
  }

  /**
   * 
   * 
   * @memberof LoginComponent
   */
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
          console.log(JSON.stringify(fb_result));
          that.findUser();
        },
        function(err) {
          if (err.localeCompare("Logging in the user failed. com.google.firebase.auth.FirebaseAuthUserCollisionException: An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.") == 0) 
          {
            alert("The email address is already associated with another account. Log in and link the accounts");

          }
          else {
            //alert("WOOOW");
          }
        }
      );
  }

  /**
   * 
   * 
   * @memberof LoginComponent
   */
  googleLogin() {
    var router = this.router;
    var that = this;
    firebase.login({
    type: firebase.LoginType.GOOGLE
    }).then(
      function (result) {
        console.log(JSON.stringify(result));
        that.findUser();
    },
    function(err) {
      console.log(err);
      alert("Login unsuccessfull " + err);
    }
  );
}

/**
 * 
 * 
 * @memberof LoginComponent
 */
signUp() {
    this.signingUp = true;
    this.newUser = {
      "email" : "",
      "password" : ""
    }
  }

  /**
   * 
   * 
   * @memberof LoginComponent
   */
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

  /**
   * 
   * 
   * @memberof LoginComponent
   */
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
              //this.findUser();
              //this.router.navigate(["/tab"]);
              alert("User created. You can now log in to SergPhoto");
            });
            
          })
          .catch(error => console.error(error));

      } else {
        alert("Fields first and last name can't be empty!");
      }
  }

  /**
   * 
   * 
   * @memberof LoginComponent
   */
  findUser() {
    firebase.getCurrentUser()
    .then(user => {
        this.user.email = user.email;
        //alert("Provider " + user.providers[1].id);
        console.log("Users email is " + this.user.email);
        var query: string = this.site + "users?transform=1&filter=email,eq,"+this.user.email;
        http.getJSON(query)
        .then((r) => { 
            if (r.users.length > 0) {
                this.userId = r.users[0].user_Id;
                this.data.storage = {
                  "firstName" : r.users[0].first_Name,
                  "lastName" : r.users[0].last_Name,
                  "email" : r.users[0].email,
                  //"provider1" : user.providers[1].id,
                  //"provider2" : user.providers[2] == null ? null : user.providers[2].id,
                  //"provider3" : user.providers[3] == null ? null : user.providers[3].id,
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
              console.log("IN ELSE");
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
          alert("User not found ");
          console.log("User not found");
        })
        
    })
    
    .catch(error => console.error(error)); 
}

/**
 * 
 * 
 * @memberof LoginComponent
 */
cancel() {
  this.signingUp = false;
}

cancel2() {
  this.signingUp = false;
  this.userCreated = false;
}

/**
 * 
 * 
 * @memberof LoginComponent
 */
ngOnInit() {
    this.page.actionBarHidden = true;
    firebase.getCurrentUser()
    .then( () => {
      this.findUser();
    }) 
    .catch(error => console.log("Not logged in " + error));
    application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData)=> { 
      if (this.router.isActive("/login" , false)) {
        data.cancel = true; 
      }
    })
  }
}