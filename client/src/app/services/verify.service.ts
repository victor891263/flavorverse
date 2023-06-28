import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import getApiUrl from "../utilities/getApiUrl"

@Injectable({
    providedIn: 'root'
})
export class VerifyService {
    private url = getApiUrl()

    constructor(private http: HttpClient) {}

    verify(id: string) {
        return this.http.get(`${this.url}/verify/${id}`, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }
}
