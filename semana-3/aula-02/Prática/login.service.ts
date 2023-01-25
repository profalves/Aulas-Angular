import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    this.getAuthorization({
      username: "kminchelle",
      password: "0lelplR"
    }).subscribe({
      next: (response) => {
        console.log(response, 'response from Login');
        this.tokenResponse = response.token
      },
      error: (response) => console.log(response, 'Error Authentication')
    })
  }

  readonly apiUrl = 'https://dummyjson.com';

  tokenResponse: string = ""

  private getAuthorization(body: { username: string, password: string }) {
    return this.http.post<{
      token: string
    }>(`${this.apiUrl}/auth/login`, body);
  }
}
