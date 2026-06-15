import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class Api {
    constructor(private http: HttpClient) { }

    // base_url = 'http://localhost:3000';
    base_url = 'https://profile-server-myt3.onrender.com';
    

    appendHeader() {
        let httpHeader = new HttpHeaders()
        let header = httpHeader.append('Authorization', `Token ${sessionStorage.getItem('token')}`)
        return header
    }


    getProfile() {
        return this.http.get(`${this.base_url}/getprofiles`, { headers: this.appendHeader() })
    }

    addProfile(data: FormData) {return this.http.post(`${this.base_url}/add`,data);
    }
    
    getSingleProfile(id: any) {
        return this.http.get(`${this.base_url}/get/${id}`);
    }

    deleteProfile(id: any) {
        return this.http.delete(`${this.base_url}/delete/${id}`, { headers: this.appendHeader() })
    }

    updateProfile(id: any, data: any) {
        return this.http.put(`${this.base_url}/update/${id}`, data, { headers: this.appendHeader() })
    }
}




