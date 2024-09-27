import { Routes } from '@angular/router';
import { authGuard } from './infra/auth/auth.guard';
import { roleGuard } from './infra/auth/role.guard';
import { LoginComponent } from './pages/back-office/login/login.component';
import { NaoAutorizadoComponent } from './pages/back-office/nao-autorizado/nao-autorizado.component';
import { PaginaInicialComponent } from './pages/back-office/pagina-inicial/pagina-inicial.component';
import { PaginaProdutosComponent } from './pages/back-office/pagina-produtos/pagina-produtos.component';
import { PaginaUsuarioComponent } from './pages/back-office/pagina-usuario/pagina-usuario.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
      path: "pagina-inicial",
      component: PaginaInicialComponent,
      canActivate: [authGuard, roleGuard],
      data: {expectedRole: ['ADMINISTRADOR', 'ESTOQUISTA']}
    },
    {
      path: 'pagina-usuarios',
      component: PaginaUsuarioComponent,
      canActivate: [authGuard, roleGuard],
      data: {expectedRole: ['ADMINISTRADOR']}
    }
    ,
    {
      path: "pagina-produtos",
      component: PaginaProdutosComponent,
      canActivate: [authGuard, roleGuard],
      data: {expectedRole: ['ADMINISTRADOR', 'ESTOQUISTA']}
    },
    {
      path: "carrinho",
      component: CarrinhoComponent
    },
    {
      path: "nao-autorizado",
      component: NaoAutorizadoComponent
    }

];
