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
export class AuthService {

    constructor(public http: HttpService) {
    }

    login(user) {
        return this.http.post('/v1/auth/login', user);
    }

    messageVerification(username: string) {
        const lang = Storage.localStorage.get('lang');
        return this.http.get('/v1/auth/message/' + username + '/' + lang);
    }

    // 注册
    register(code, user) {
        return this.http.post('/v1/auth/register/' + code, user);
    }


    // 修改密码
    modifyPassword(code, user) {
        return this.http.post('/v1/auth/modifyPassword/' + code, user);
    }

    // 判断用户名是否已经存在
    getUserByName(value): Observable<ValidationErrors | null> {
        // todo 这里模拟后台操作
        /* return Observable.create(observer => {
             if (value === 'test') {
                 observer.next(null); // 返回null表示验证通过
             } else {
                 observer.next({'exist': value}); // 返回非null表示验证失败，其中'exist'可以作为验证失败的类型在页面上判断
             }
         });*/
        const url = '/v1/user/view/username_number';
        const paramMap = {username: value};
        return this.http.postFormData(url, paramMap, {showLoading: false}).pipe(
            map(userNumber => {
                return userNumber === 0 ? null : {'exist': value};
            })
        );
    }
}
