import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalData } from '../providers/GlobalData';
import { ValidationErrors } from '@angular/forms';
import { Encrypt } from '../providers/Encrypt';
import {Storage} from '../providers/Storage';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(public http: HttpService) {
    }

    // 查询用户信息
    getUserInfo(username) {
        return this.http.get('/sj/getUserInfo/' + username);
    }
}
