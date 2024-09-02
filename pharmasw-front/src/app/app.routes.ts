import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';
import { NaoAutorizadoComponent } from './pages/nao-autorizado/nao-autorizado.component';
import { PaginaProdutosComponent } from './pages/pagina-produtos/pagina-produtos.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
      path: "pagina-inicial",
      component: PaginaInicialComponent,
      // canActivate: [authGuard, roleGuard], 
      // data: {expectedRole: ['ADMINISTRADOR', 'ESTOQUISTA']}
    },
    {
      path: "pagina-usuario",
      component: CadastrarUsuarioComponent,
      // canActivate: [authGuard, roleGuard], 
      // data: {expectedRole: ['ADMINISTRADOR']}
    },
    {
      path: "pagina-produtos",
      component: PaginaProdutosComponent,
      // canActivate: [authGuard, roleGuard], 
      // data: {expectedRole: ['ADMINISTRADOR', 'ESTOQUISTA']}
    },
    {
      path: "nao-autorizado",
      component: NaoAutorizadoComponent
    }
   
];
