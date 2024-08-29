import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
      path: "cadastrar-usuario",
      component: CadastrarUsuarioComponent
  }
];
