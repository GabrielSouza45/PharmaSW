import { Routes } from '@angular/router';
import { authGuard } from './infra/auth/auth.guard';
import { roleGuard } from './infra/auth/role.guard';
import { LoginComponent } from './pages/back-office/login/login.component';
import { PaginaInicialComponent } from './pages/back-office/pagina-inicial/pagina-inicial.component';
import { PaginaProdutosComponent } from './pages/back-office/pagina-produtos/pagina-produtos.component';
import { PaginaUsuarioComponent } from './pages/back-office/pagina-usuario/pagina-usuario.component';
import { HomeComponent } from './pages/site/home/home.component';
import { CarrinhoComponentComponent } from './pages/site/carrinho/carrinho-component.component';
import { DetalhesProdutoComponent } from './pages/site/detalhes-produto/detalhes-produto.component';
import { CadastroClienteComponent } from './pages/site/cadastro-cliente/cadastro-cliente.component';
import { LoginClienteComponent } from './pages/site/login-cliente/login-cliente.component';
import { ClienteAlterarComponent } from './pages/site/cliente-alterar/cliente-alterar.component';
import { EnderecoComponent } from './pages/site/endereco/endereco/endereco.component';

export const routes: Routes = [
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
  },
  {
    path: 'cliente-alterar',
    component: ClienteAlterarComponent
  },
  {
    path: 'endereco',
    component: EnderecoComponent
  }
];
