import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotoAlbumPage } from './photo-album.page';

describe('PhotoAlbumPage', () => {
  let component: PhotoAlbumPage;
  let fixture: ComponentFixture<PhotoAlbumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoAlbumPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
