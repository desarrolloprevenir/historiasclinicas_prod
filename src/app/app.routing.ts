import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {path: '', component : LoginComponent},
    {path : 'login', component: LoginComponent},
    {path : 'registro', component: RegistroComponent},
    {path : 'home', component: HomeComponent},
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
