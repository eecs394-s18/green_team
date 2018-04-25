import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileViewerPage } from './profile-viewer';

@NgModule({
  declarations: [
    ProfileViewerPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileViewerPage),
  ],
})
export class ProfileViewerPageModule {}
