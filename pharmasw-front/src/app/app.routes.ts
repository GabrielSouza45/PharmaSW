import { Routes } from '@angular/router';
import { authGuard } from './infra/auth/auth.guard';
import { roleGuard } from './infra/auth/role.guard';
import { LoginComponent } from './pages/back-office/login/login.component';
import { PaginaInicialComponent } from './pages/back-office/pagina-inicial/pagina-inicial.component';
import { PaginaProdutosComponent } from './pages/back-office/pagina-produtos/pagina-produtos.component';
import { PaginaUsuarioComponent } from './pages/back-office/pagina-usuario/pagina-usuario.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { CadastroClienteComponent } from './pages/site/cadastro-cliente/cadastro-cliente.component';
import { CarrinhoComponentComponent } from './pages/site/carrinho/carrinho-component.component';
import { DetalhesProdutoComponent } from './pages/site/detalhes-produto/detalhes-produto.component';
import { EscolherEnderecoComponent } from './pages/site/escolher-endereco/escolher-endereco.component';
import { EscolherPagamentoComponent } from './pages/site/escolher-pagamento/escolher-pagamento.component';
import { HomeComponent } from './pages/site/home/home.component';
import { LoginClienteComponent } from './pages/site/login-cliente/login-cliente.component';
import { PerfilComponent } from './pages/site/perfil/perfil.component';
import { ResumoPedidoComponent } from './pages/site/resumo-pedido/resumo-pedido.component';
import { PedidoCriadoComponent } from './pages/site/pedido-criado/pedido-criado.component';
import { ListaPedidosComponent } from './pages/site/lista-pedidos/lista-pedidos.component';
import { DetalhesPedidoComponent } from './pages/site/detalhes-pedido/detalhes-pedido.component';
import { EstoquistaPedidoComponent } from './pages/back-office/estoquista-pedido/EstoquistaPedidoComponent';

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
    path: 'resumo-pedido',
    component : ResumoPedidoComponent
  },
  {
    path: 'pedido-criado',
    component: PedidoCriadoComponent
  },
  {
    path: 'lista-pedidos',
    component: ListaPedidosComponent
  },
  {
    path: 'detalhes-pedido/:id',
    component: DetalhesPedidoComponent
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
  {
    path: 'checkout',
    children: [
      {
        path: 'entrar',
        component: LoginClienteComponent
      },
      {
        path: 'cadastre-se',
        component: CadastroClienteComponent
      },
      {
        path: 'selecionar-endereco',
        component: EscolherEnderecoComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: ['CLIENTE'] }
      },
      {
        path: 'pagamento',
        component: EscolherPagamentoComponent,
        canActivate: [authGuard, roleGuard],
        data: { expectedRole: ['CLIENTE'] }
      }
    ],
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
  },
  {
    path: 'estoquista-pedido',
    component: EstoquistaPedidoComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: ['ESTOQUISTA'] },
  },

  // Rota Curinga
  { path: '**', component: PaginaNaoEncontradaComponent }
];
