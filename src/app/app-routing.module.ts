import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/firebase/auth.guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./pages/cliente/cliente.module').then((m) => m.ClientePageModule),
    canActivate: [AuthGuard], // Agregar la guarda a la ruta
  },
  {
    path: 'vendedor',
    loadChildren: () => import('./pages/vendedor/vendedor.module').then( m => m.VendedorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
