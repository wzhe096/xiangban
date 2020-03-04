import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BaiduMapPage } from './baidu-map.page';

describe('BaiduMapPage', () => {
  let component: BaiduMapPage;
  let fixture: ComponentFixture<BaiduMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaiduMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BaiduMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
