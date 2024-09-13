import { LoginService } from './services/login/login.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrudService } from './services/crud-service.service';
import { AuthService } from './infra/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Produto } from './modelo/Produto';
import { Filtros } from './modelo/Filtros';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'pharmasw-front';
  // imagem: string = "";
  // filtro: Filtros;
  // response: any[];


  // constructor(  private httpClient: HttpClient,
  //   private auth: AuthService,
  //   private toastService: ToastrService){}

  // submit(){
  //   this.auth.login("admin@admin.com", "12345").subscribe({
  //     next: () => {
  //       this.toastService.success("Login Realizado com sucesso!");

  //       this.filtro = new Filtros();
  //       this.filtro.id = 2;
  //       this.httpClient.post<any[]>("http://localhost:8080/imagem-produto/listar", this.filtro)
  //       .subscribe((response) => {
  //         console.log(response);
  //         this.imagem = 'data:image/jpeg;base64,' + response[0].imagem;
  //       });
  //     },
  //     error: (erro) => {
  //       if (erro.status === 403) {
  //         this.toastService.warning("Usuário não encontrado. Verifique suas credenciais e tente novamente.");
  //       } else {
  //         this.toastService.error("Erro inesperado, tente novamente mais tarde.");
  //       }
  //     }}
  //   );


  // }
}
