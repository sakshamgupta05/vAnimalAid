import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ScrollToModule } from 'ng2-scroll-to';
import { FileUploadModule } from 'ng2-file-upload';

import { WebsiteComponent } from './website.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { LegalComponent } from './components/legal/legal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RescueComponent } from './components/rescue/rescue.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

import { HospitalsService } from './services/hospitals.service';
import { BlogsService } from './services/blogs.service';
import { RescueService } from './services/rescue.service';
import { ValidateService } from './services/validate.service';
import { LegalService } from './services/legal.service';

const appRoutes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'blog',children: [
        { path: 'post/:id', component: BlogPostComponent },
        { path: ':page', component: BlogComponent },
        { path: '', redirectTo: '1' },
      ] },

      { path: 'rescue', component: RescueComponent },
      { path: 'hospitals', component: HospitalsComponent },
      { path: 'legal', component: LegalComponent }
    ]
  }
];

@NgModule({
  declarations: [
    WebsiteComponent,
    HomeComponent,
    BlogComponent,
    FooterComponent,
    HospitalsComponent,
    LegalComponent,
    NavbarComponent,
    RescueComponent,
    BlogPostComponent,
    WebsiteComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB36j0MxMPeTrFo2kdFL7-XQkQHHrCcJGs'
    }),
    ScrollToModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    HospitalsService,
    BlogsService,
    RescueService,
    ValidateService,
    LegalService
  ]
})

export class WebsiteModule {}
