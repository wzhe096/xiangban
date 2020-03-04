import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtensionPage } from './extension.page';

describe('ExtensionPage', () => {
  let component: ExtensionPage;
  let fixture: ComponentFixture<ExtensionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtensionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
