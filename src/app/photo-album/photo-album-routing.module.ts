import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoAlbumPage } from './photo-album.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoAlbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoAlbumPageRoutingModule {}
