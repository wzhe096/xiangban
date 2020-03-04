import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'button',
    loadChildren: () => import('./demo/button/button.module').then(m => m.ButtonPageModule),
  },
  {
    path: 'slid',
    loadChildren: () => import('./demo/slid/slid.module').then(m => m.SlidPageModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./demo/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'datetime',
    loadChildren: () => import('./demo/datetime/datetime.module').then(m => m.DatetimePageModule)
  },
  {
    path: 'action-sheet',
    loadChildren: () => import('./demo/action-sheet/action-sheet.module').then(m => m.ActionSheetPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'infinite',
    loadChildren: () => import('./demo/infinite/infinite.module').then(m => m.InfinitePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./demo/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'langset',
    loadChildren: () => import('./langset/langset.module').then(m => m.LangsetPageModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./page/user-details/user-details.module').then(m => m.UserDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'his-dynamic',
    loadChildren: () => import('./page/his-dynamic/his-dynamic.module').then(m => m.HisDynamicPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-dynamic',
    loadChildren: () => import('./page/my-dynamic/my-dynamic.module').then(m => m.MyDynamicPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dynamic',
    loadChildren: () => import('./page/dynamic/dynamic.module').then(m => m.DynamicPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./page/report/report.module').then(m => m.ReportPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'release-dynamic',
    loadChildren: () => import('./page/release-dynamic/release-dynamic.module').then(m => m.ReleaseDynamicPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mine',
    loadChildren: () => import('./page/mine/mine.module').then(m => m.MinePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'invitation',
    loadChildren: () => import('./page/invitation/invitation.module').then(m => m.InvitationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'location',
    loadChildren: () => import('./page/location/location.module').then(m => m.LocationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./page/signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'verification-code-login',
    loadChildren: () => import('./page/verification-code-login/verification-code-login.module').then(m => m.VerificationCodeLoginPageModule)
  },
  {
    path: 'information-completion',
    loadChildren: () => import('./page/information-completion/information-completion.module').then(m => m.InformationCompletionPageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./page/chat/chat.module').then(m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-wallet',
    loadChildren: () => import('./page/my-wallet/my-wallet.module').then(m => m.MyWalletPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recharge',
    loadChildren: () => import('./page/recharge/recharge.module').then(m => m.RechargePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'gift-income',
    loadChildren: () => import('./page/gift-income/gift-income.module').then(m => m.GiftIncomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cash-withdrawal',
    loadChildren: () => import('./page/cash-withdrawal/cash-withdrawal.module').then(m => m.CashWithdrawalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'extension',
    loadChildren: () => import('./page/extension/extension.module').then(m => m.ExtensionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'system-setup',
    loadChildren: () => import('./page/system-setup/system-setup.module').then(m => m.SystemSetupPageModule),
    canActivate: [AuthGuard]
  },
  {

    path: 'cash-withdrawal',
    loadChildren: () => import('./page/cash-withdrawal/cash-withdrawal.module').then(m => m.CashWithdrawalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'extension',
    loadChildren: () => import('./page/extension/extension.module').then(m => m.ExtensionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'evaluate',
    loadChildren: () => import('./page/evaluate/evaluate.module').then(m => m.EvaluatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'evaluation-center',
    loadChildren: () => import('./page/evaluation-center/evaluation-center.module').then(m => m.EvaluationCenterPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-identity',
    loadChildren: () => import('./page/verify-identity/verify-identity.module').then(m => m.VerifyIdentityPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    loadChildren: () => import('./page/feedback/feedback.module').then(m => m.FeedbackPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'forget-pay-pwd',
    loadChildren: () => import('./page/forget-pay-pwd/forget-pay-pwd.module').then(m => m.ForgetPayPwdPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'forget-pay-pwd2',
    loadChildren: () => import('./page/forget-pay-pwd2/forget-pay-pwd2.module').then(m => m.ForgetPayPwd2PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'verify-phone',
    loadChildren: () => import('./page/verify-phone/verify-phone.module').then(m => m.VerifyPhonePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'set-pay-pwd',
    loadChildren: () => import('./page/set-pay-pwd/set-pay-pwd.module').then(m => m.SetPayPwdPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'binding-account',
    loadChildren: () => import('./page/binding-account/binding-account.module').then(m => m.BindingAccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'open-membership',
    loadChildren: () => import('./page/open-membership/open-membership.module').then(m => m.OpenMembershipPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'member',
    loadChildren: () => import('./page/member/member.module').then(m => m.MemberPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'demo',
    loadChildren: () => import('./page/demo/demo.module').then(m => m.DemoPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./page/order/order.module').then(m => m.OrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-agreement',
    loadChildren: () => import('./page/user-agreement/user-agreement.module').then(m => m.UserAgreementPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-bank-card',
    loadChildren: () => import('./page/add-bank-card/add-bank-card.module').then(m => m.AddBankCardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-bank-card2',
    loadChildren: () => import('./page/add-bank-card2/add-bank-card2.module').then(m => m.AddBankCard2PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'gender-setting',
    loadChildren: () => import('./page/gender-setting/gender-setting.module').then(m => m.GenderSettingPageModule)
  },
  {
    path: 'personal-data',
    loadChildren: () => import('./page/personal-data/personal-data.module').then(m => m.PersonalDataPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'baidu-map',
    loadChildren: () => import('./page/baidu-map/baidu-map.module').then(m => m.BaiduMapPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'album',
    loadChildren: () => import('./page/album/album.module').then(m => m.AlbumPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'convention',
    loadChildren: () => import('./page/convention/convention.module').then(m => m.ConventionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customerservice',
    loadChildren: () => import('./page/customerservice/customerservice.module').then(m => m.CustomerservicePageModule)
  },
  {
    path: 'modify-password',
    loadChildren: () => import('./page/modify-password/modify-password.module').then(m => m.ModifyPasswordPageModule)
  },









];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
