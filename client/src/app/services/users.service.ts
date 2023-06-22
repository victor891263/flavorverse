import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import getApiUrl from "../utilities/getApiUrl"
import {RecipeBrief, User} from "../types";

type GetUserResponse = {
    user: User
    recipes: RecipeBrief[]
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private url = getApiUrl()

    constructor(private http: HttpClient) { }

    getUser(id: string | number) {
        return this.http.get<GetUserResponse>(`${this.url}/users/${id}`)
    }

    updateProfile(data: { username: string, name: string, about: string, link: string }) {
        return this.http.put(`${this.url}/users`, data, httpOptions)
    }

    updateEmail(email: string) {
        return this.http.put(`${this.url}/users/email`, email, httpOptions)
    }

    updatePassword(oldPassword: string, newPassword: string) {
        return this.http.put(`${this.url}/users/password`, { oldPassword, newPassword }, httpOptions)
    }

    deleteProfile() {
        return this.http.delete(`${this.url}/users`, httpOptions)
    }
}
