import { Routes } from '@angular/router';
import { authGuard } from './infra/auth/auth.guard';
import { roleGuard } from './infra/auth/role.guard';
import { LoginComponent } from './pages/back-office/login/login.component';
import { PaginaInicialComponent } from './pages/back-office/pagina-inicial/pagina-inicial.component';
import { PaginaProdutosComponent } from './pages/back-office/pagina-produtos/pagina-produtos.component';
import { PaginaUsuarioComponent } from './pages/back-office/pagina-usuario/pagina-usuario.component';
import { CadastroClienteComponent } from './pages/site/cadastro-cliente/cadastro-cliente.component';
import { CarrinhoComponentComponent } from './pages/site/carrinho/carrinho-component.component';
import { DetalhesProdutoComponent } from './pages/site/detalhes-produto/detalhes-produto.component';
import { HomeComponent } from './pages/site/home/home.component';
import { LoginClienteComponent } from './pages/site/login-cliente/login-cliente.component';
import { PerfilComponent } from './pages/site/perfil/perfil.component';

export const routes: Routes = [
  // SITE
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home/:busca',
    component: HomeComponent,
  },
  {
    path: 'produto/:id',
    component: DetalhesProdutoComponent,
  },
  {
    path: 'carrinho',
    component: CarrinhoComponentComponent
  },
  {
    path: 'entrar',
    component: LoginClienteComponent
  },
  {
    path: 'cadastre-se',
    component: CadastroClienteComponent
  },
  {
    path: 'minha-conta',
    component: PerfilComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: ['CLIENTE'] },
  },
  // BACKOFFICE
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pagina-inicial',
    component: PaginaInicialComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: ['ADMINISTRADOR', 'ESTOQUISTA'] },
  },
  {
    path: 'pagina-usuarios',
    component: PaginaUsuarioComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: ['ADMINISTRADOR'] },
  },
  {
    path: 'pagina-produtos',
    component: PaginaProdutosComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: ['ADMINISTRADOR', 'ESTOQUISTA'] },
  }
];
