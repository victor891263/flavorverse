import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import getApiUrl from "../utilities/getApiUrl"

const httpHeaders = {
    headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token') || ''
    })
}

@Injectable({
    providedIn: 'root'
})
export class VerifyService {
    private url = getApiUrl()

    constructor(private http: HttpClient) {}

    verify(id: string) {
        return this.http.get(`${this.url}/verify/${id}`, { responseType: 'text', ...httpHeaders })
    }

    verifyEmail(id: string) {
        return this.http.get(`${this.url}/mail/${id}`, { responseType: 'text', ...httpHeaders })
    }
}
