import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';
import { NavController, Events } from '@ionic/angular';
import { GlobalData } from '../providers/GlobalData';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageServe: StorageService, private nav: NavController, private events: Events) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    const lang = localStorage.getItem('lang');
    if (!lang) {
      // this.router.navigate(['/langset']);
      this.nav.navigateRoot('langset');
      return false;
    } else {
      // 判断本地有没有token
      const token = localStorage.getItem('token');
      // 如果token有值，表示登录成功，继续跳转，否则跳转到首页
      if (token) {
        // this.events.publish('new:login', "ok", Date.now());
        return true;
      }
      // if (GlobalData.token) { return true; }
      // this.router.navigate(['/signin']);
      this.nav.navigateRoot('signin');
      return false;
    }
  }

}
