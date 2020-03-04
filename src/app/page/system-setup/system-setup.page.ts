import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RongCloudService } from 'src/app/service/rong-cloud.service';

@Component({
    selector: 'app-system-setup',
    templateUrl: './system-setup.page.html',
    styleUrls: ['./system-setup.page.scss'],
})
export class SystemSetupPage implements OnInit {


    constructor(private routerInfo: ActivatedRoute, private router: Router,
        private toastController: ToastController, private alertController: AlertController,public rongcloud: RongCloudService) {
    }

    ngOnInit() {

    }
    privacy(){
        window.open("http://winnerray.com/userAgreeing.html","_blank");
    }
    async submitSuccess(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: 'dark',
            position: 'middle',
            cssClass: 'toast'
        });
        toast.present();
    }

    async clearCache() {
        const alert = await this.alertController.create({
            header: '',
            message: '清空缓存？',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: '确定',
                    handler: () => {
                        this.submitSuccess('已清空');
                    }
                }
            ]
        });

        await alert.present();
    }
    logout() {
        window.localStorage.removeItem('token');
        localStorage.removeItem("user_id")
        localStorage.removeItem("user_id")
        localStorage.removeItem("identityid")
        localStorage.removeItem("userinfo")
        this.rongcloud.disconnectRy();
        this.rongcloud.logoutRy();
        window.location.reload();
    }
}

