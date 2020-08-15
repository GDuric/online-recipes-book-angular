import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationPeriod: any;

    constructor(private http: HttpClient, private router: Router){}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNwv2W8IXDqlwZqsT9lekwGAxuwKdLz18', 
        {
            email: email,
            password: password,
            returnSecureToken: true
            })
            .pipe(catchError (this.handleError),
            tap(responseData => {
                this.getUserData(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNwv2W8IXDqlwZqsT9lekwGAxuwKdLz18', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError (this.handleError), 
            tap(responseData => {
                this.getUserData(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }));
    }

    automaticLogin(){
        const user : {
            email:string, 
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!user){
            return;
        } 
        const loadedUser = new User(user.email, user.id, user._token, new Date( user._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.automaticLogout(expDuration);
        } 
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['./authenticate']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationPeriod){
            clearTimeout(this.tokenExpirationPeriod);
        }
        this.tokenExpirationPeriod = null;
    }

    automaticLogout(expirationDuration: number){
        this.tokenExpirationPeriod = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError (errorResponse: HttpErrorResponse) {
        let errorMessage: string = 'An unknown error occured';
        console.log(errorResponse);
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        } else {
            switch(errorResponse.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = "The email already exists." 
                    break;    
                case 'INVALID_PASSWORD':
                    errorMessage = "You have entered invalid password."
                    break; 
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "User with that email does not exist. Please sign up first."
                    break;
            }
            return throwError(errorMessage);
        }
    }

    private getUserData(email: string, id: string, tokenId: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
        const newUser = new User( email, id, tokenId,expirationDate);
        this.user.next(newUser);
        this.automaticLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(newUser));
    }
}