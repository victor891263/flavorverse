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
        return this.http.post(`${this.url}/users`, data, { responseType: 'text' })
    }

    login(data: { email: string, password: string }) {
        return this.http.post(`${this.url}/auth`, data, { responseType: 'text' })
    }

    recoverPassword(email: string) {
        return this.http.post(`${this.url}/recover`, { email }, { responseType: 'text' })
    }

    updatePassword(id: string, password: string) {
        return this.http.put(`${this.url}/recover/${id}`, { password }, { responseType: 'text' })
    }
}
