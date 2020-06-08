import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './componentes/home/home.component';
import { SearchComponent } from './componentes/search/search.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'add', component: SearchComponent},
    { path: 'details/:nombreCiudad', component: DetallesComponent},
    { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];

export const appRouting = RouterModule.forRoot(routes);