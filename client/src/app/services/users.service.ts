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
        return this.http.get<GetUserResponse>(`${this.url}/users/${id}`, { responseType: 'json' })
    }

    updateProfile(formData: FormData) {
        return this.http.put(`${this.url}/users`, formData, { responseType: 'json' })
    }

    updateEmail(email: string) {
        return this.http.put(`${this.url}/users/email`, email, { responseType: 'text', ...httpOptions })
    }

    stopUpdateEmail() {
        return this.http.delete(`${this.url}/users/email`, { responseType: 'text', ...httpOptions })
    }

    updatePassword(oldPassword: string, newPassword: string) {
        return this.http.put(`${this.url}/users/password`, { oldPassword, newPassword }, { responseType: 'text', ...httpOptions })
    }

    deleteProfile() {
        return this.http.delete(`${this.url}/users`, { responseType: 'text', ...httpOptions })
    }
}
