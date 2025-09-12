import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { RDashboard } from './receptionists/r-dashboard/r-dashboard';
import { RSidebar } from './receptionists/r-sidebar/r-sidebar';
import { RLayout } from './layouts/r-layout/r-layout';
import { RVisitor } from './receptionists/r-visitor/r-visitor';
import { RRegister } from './receptionists/r-register/r-register';
import { RHosts } from './receptionists/r-hosts/r-hosts';
import { RPreregistertions } from './receptionists/r-preregistertions/r-preregistertions';
import { ADashboard } from './admin/a-dashboard/a-dashboard';
import { ALayout } from './layouts/a-layout/a-layout';
import { AHosts } from './admin/a-hosts/a-hosts';
import { AHistory } from './admin/a-history/a-history';
import { AReports } from './admin/a-reports/a-reports';
import { ASettings } from './admin/a-settings/a-settings';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { Pricing } from './home/pricing/pricing';
import { Contact } from './home/contact/contact';

export const routes: Routes = [ 
 { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home},
      { path: 'pricing', component: Pricing},
      { path: 'contact', component: Contact},
      { path: 'login', component: Login},
    ]
  },
  {
    path: '',
    component: RLayout,
    children: [
  { 
    path: 'dashboard', 
    component: RDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'ROLE_RECEPTIONIST' }
  },
  { path: 'r-visitor', component: RVisitor },
  { path: 'r-register', component: RRegister },
  { path: 'r-hosts', component: RHosts },
  { path: 'r-preregisterations', component: RPreregistertions}
]
  },
  { 
    path: '',
    component: ALayout,
    children: [
      { 
    path: 'adashboard', 
    component: ADashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
      { path: 'ahosts', component: AHosts },
      { path: 'ahistory', component: AHistory },
      { path: 'areports', component: AReports },
      { path: 'asettings', component: ASettings },

    ]
  }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
})
export class AppRoutingModule { }