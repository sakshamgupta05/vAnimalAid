import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ScrollToModule } from 'ng2-scroll-to';
import { FileUploadModule } from 'ng2-file-upload';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddBlogComponent } from './components/blog/add-blog/add-blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { AddHospitalComponent } from './components/hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent } from './components/hospitals/edit-hospital/edit-hospital.component';
import { ViewBlogComponent } from './components/blog/view-blog/view-blog.component';
import { RegisterComponent } from './components/register/register.component';
import { LegalComponent } from './components/legal/legal.component';
import { AddLegalComponent } from './components/legal/add-legal/add-legal.component';

import { AuthService } from './services/auth.service';
import { BlogsService } from './services/blogs.service';
import { HospitalsService } from './services/hospitals.service';
import { ValidateService } from './services/validate.service';
import { LegalService } from './services/legal.service';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'blog', children: [
        { path: 'add', component: AddBlogComponent, canActivate: [AuthGuard] },
        { path: 'post', children: [
          { path: 'edit/:id', component: EditBlogComponent, canActivate: [AuthGuard] },
          { path: ':id', component: ViewBlogComponent, canActivate: [AuthGuard] }
        ] },
        { path: ':page', component: BlogComponent, canActivate: [AuthGuard] },
        { path: '', redirectTo: '1' }
      ] },
      { path: 'hospitals', children: [
        { path: 'add', component: AddHospitalComponent, canActivate: [AuthGuard] },
        { path: 'edit/:id', component: EditHospitalComponent, canActivate: [AuthGuard] },
        { path: '', component: HospitalsComponent, canActivate: [AuthGuard] }
      ] },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'legal', children: [
        { path: 'add', component: AddLegalComponent, canActivate: [AuthGuard] },
        { path: '', component: LegalComponent, canActivate: [AuthGuard] }
      ] }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    BlogComponent,
    AddBlogComponent,
    EditBlogComponent,
    HospitalsComponent,
    AddHospitalComponent,
    EditHospitalComponent,
    ViewBlogComponent,
    RegisterComponent,
    LegalComponent,
    AddLegalComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(appRoutes),
    ScrollToModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    AuthService,
    HospitalsService,
    BlogsService,
    ValidateService,
    LegalService,
    AuthGuard,
    LoginGuard
  ]
})

export class AdminModule {}
