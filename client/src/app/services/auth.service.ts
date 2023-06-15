import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import getApiUrl from "../utilities/getApiUrl"

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private url = getApiUrl()

    constructor(private http: HttpClient) { }

    createAccount(data: { email: string, password: string }) {
        return this.http.post(`${this.url}/users`, data)
    }

    login(data: { email: string, password: string }) {
        return this.http.post(`${this.url}/auth`, data)
    }
}
