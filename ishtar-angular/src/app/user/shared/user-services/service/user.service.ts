import {Injectable} from '@angular/core';
import {LoginRequest} from '../request/login-request';
import {EMPTY, Observable, Subject} from 'rxjs';
import {RegisterRequest} from '../request/register-request';
import {catchError} from 'rxjs/operators';
import {UserInfo} from '../entity/user-info';
import {UserResponse} from '../response/user-response';
import {UserManagerService} from '../manager/user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly KEY_TOKEN = 'token';
  googleConnect = false;

  constructor(private userManager: UserManagerService) {
  }

  login(username: string, password: string): Observable<string> {
    const loginSubject = new Subject<string>();
    const loginRequest: LoginRequest = {
      username,
      password
    };
    this.userManager.login(loginRequest)
      .pipe(
        catchError(err => {
          loginSubject.error('Error Logging In! ');
          return EMPTY;
        })
      )
      .subscribe(
        loginResponse => {
          localStorage.setItem(this.KEY_TOKEN, 'Bearer ' + loginResponse.token);
          localStorage.setItem('date', new Date().toString());
          // Result : Wed Dec 04 2019 15:46:54 GMT+0200 (Eastern European Standard Time)
          loginSubject.next('true');
        }
      );
    return loginSubject.asObservable();
  }

  register(username, email, password): Observable<number> {
    const registerSubject = new Subject<number>();
    const registerRequest: RegisterRequest = {
      username,
      email,
      password,
      image: 'https://via.placeholder.com/150?text=avatar'
    };
    this.userManager.register(registerRequest)
      .pipe(
        catchError(err => {
          registerSubject.error('Error Logging In! ');
          return EMPTY;
        })
      )
      .subscribe(
        () => {
          registerSubject.next(200);
        }, () => {
          registerSubject.next(403);
        }
      );
    return registerSubject.asObservable();
  }

  getUserInfo(): Observable<UserInfo> {
    const userSubject = new Subject<UserInfo>();
    if (this.isLoggedIn()) {
      this.userManager.getUserProfile().subscribe(
        userInfo => {
          if (userInfo.Data.email || userInfo.Data.username) {
            const userData: UserResponse = {
              Data: {
                id: userInfo.Data.id,
                lang: userInfo.Data.lang
              }
            };
            localStorage.setItem('userInfo', JSON.stringify(userData));
            if (userData.Data.lang === 'en' || userData.Data.lang === 'de') {
              localStorage.setItem('lang', userData.Data.lang);
            }
            userSubject.next(userInfo.Data);
          }
        }
      );
    } else {
      localStorage.removeItem('userInfo');
      userSubject.error('User is Not Logged in!');
    }
    return userSubject.asObservable();
  }

  getTokenWithGoogleLogin(): Observable<boolean> {
    const googleSubject = new Subject<boolean>();
    // Connect TO fetch Token After Google Connect
    this.userManager.getTokenWithGoogleLogin()
      .pipe(
        catchError(err => {
          googleSubject.error('Error Google Logging In! ');
          this.googleConnect = false;
          return EMPTY;
        })
      ).subscribe(
      tokenResponse => {
        if (tokenResponse.token) {
          this.googleConnect = true;
          localStorage.setItem(this.KEY_TOKEN, 'Bearer ' + tokenResponse.token);
          localStorage.setItem('date', new Date().toString());
          googleSubject.next(true);
        }
      }
    );
    return googleSubject.asObservable();
  }

  public isLoggedIn(): boolean {
    const diff = +new Date().valueOf() - +new Date(Date.parse(localStorage.getItem('date'))).valueOf();
    // Millisecond to Minutes
    if (diff / 60000 < 45) {
      return this.getToken() !== null && this.getToken() !== undefined;
    } else {
      localStorage.removeItem(this.KEY_TOKEN);
      return false;
    }
  }

  public getToken(): string {
    return localStorage.getItem(this.KEY_TOKEN);
  }

  public logout() {
    localStorage.removeItem('userInfo');
    this.userManager.googleLogout().subscribe(
        () => {
          this.googleConnect = false;
          console.log('Success Logout');
        }
    );
    return localStorage.removeItem(this.KEY_TOKEN);
  }

  getSavedClientId(): number {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      return userInfo.Data.id;
    } else {
      return -1;
    }
  }
}
