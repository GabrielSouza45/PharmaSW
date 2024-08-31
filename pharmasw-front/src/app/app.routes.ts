import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
      path: "cadastrar-usuario",
      component: CadastrarUsuarioComponent
    },
    {
      path: "pagina-inicial",
      component: PaginaInicialComponent
    } 
];
