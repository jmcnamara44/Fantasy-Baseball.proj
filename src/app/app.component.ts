import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  user;
  private isLoggedIn: Boolean;
  private userName: String;
  title = 'Fantasy Baseball';
  devNames = "Verna Santos, Andrew Lupton, Jimmy McNamara, Justin Roller, and David Tumpowsky"
  constructor(public authService: AuthenticationService,
    // private router: Router
    ) {
    this.authService.user.subscribe(user =>  {
      if (user == null) {
        this.isLoggedIn = false;
        // this.router.navigate(['welcome']);
      } else {
        this.isLoggedIn = true;
        this.userName = user.displayName;
        // this.router.navigate([]);
      }
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }



}
