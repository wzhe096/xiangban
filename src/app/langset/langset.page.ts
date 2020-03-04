import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-langset',
  templateUrl: './langset.page.html',
  styleUrls: ['./langset.page.scss'],
})
export class LangsetPage implements OnInit {

  constructor(private translate: TranslateService, private router: Router) { }

  ngOnInit() {
  }
  /**
   * 获取选中状态
   * @param lang 传入的语言
   */
  public getChecked(lang: any) {
    if (lang === this.translate.getDefaultLang()) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * 更改当前语言
   * @param lang 要更改的语言
   */
  public changeLanguage(lang: any) {
    console.log('lang=' + lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang).subscribe(() => {
      console.log('语言切换=' + lang);
      window.localStorage.setItem('lang', lang);
    });
    this.router.navigate(['gender-setting']);
  }
}
