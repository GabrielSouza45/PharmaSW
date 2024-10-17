import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComponentType, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { InputPrimarioComponent } from '../../../components/input-primario/input-primario.component';
import { SelectComponent } from '../../../components/select/select.component';
import { cpfValidator } from '../../../infra/validators/cpf-validator';
import { nameValidator } from '../../../infra/validators/nome-validator';
import { Genero } from '../../../modelo/enums/Genero';
import { CrudService } from '../../../services/crud-service/crud-service.service';
import { LayoutPrincipalComponent } from '../layout-principal/layout-principal.component';
import { Cliente } from './../../../modelo/Cliente';
import { FormCheckerService } from './../../../services/form-checker/form-checker.service';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [
    LayoutPrincipalComponent,
    InputPrimarioComponent,
    ReactiveFormsModule,
    SelectComponent,
    BotaoComponent,
  ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.css',
})
export class CadastroClienteComponent extends CrudService<Cliente> {
  formCadastro: FormGroup;
  optionsGenero: Opcoes[] = [];

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private checker: FormCheckerService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    super(http, '/home-controle', toastr);
    this.formCadastro = this.getForm();
    this.getGeneros();
  }

  getForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', [Validators.required, nameValidator()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, cpfValidator()]),
      genero: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      confirmarSenha: new FormControl('', [Validators.required]),
    });
  }

  // Método para obter a data atual no formato 'YYYY-MM-DD'
  getCurrentDate(): string {
    const today = new Date();
    const dd: string = String(today.getDate()).padStart(2, '0');
    const mm: string = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const yyyy: string = today.getFullYear().toString();

    return `${yyyy}-${mm}-${dd}`;
  }

  getGeneros(): void {
    for (const [key, value] of Object.entries(Genero)) {
      let opc = new Opcoes(value.toString(), key);
      this.optionsGenero.push(opc);
    }
  }

  cadastrar(): void {
    const formValido: boolean = this.checker.checkFormErrorsCliente(
      this.formCadastro
    );
    const senhaValida: boolean = this.checker.senhaValida(this.formCadastro);

    if (!formValido || !senhaValida) return;

    this.adicionar(this.getCliente(), '/cadastrar-cliente').subscribe({
      next: (response) => {
        this.limpaFormulario();
        // const cliente: Cliente = this.mapResponseToCliente(response);
        this.addEndereco(response);


        // this.addEndereco(response);
      },
      error: (erro) => {
        this.exibeErros(erro);
      },
    });
  }

  // private mapResponseToCliente(response: any): Cliente {
  //   // return {
  //   //   id: response.id,
  //   //   nome: response.nome,
  //   //   email: response.email,
  //   //   dataNascimento: new Date(response.dataNascimento), // Converter para Date se necessário
  //   //   genero: response.genero,
  //   //   // Mapeie outros campos conforme necessário
  //   // };
  // }

  private addEndereco(cliente: any){

    const dados = {
      cliente: cliente
    };

    this.router.navigate(['/entrar']);
  }

  private getCliente(): Cliente {
    const form = this.formCadastro.value;
    return new Cliente(
      form.email,
      form.cpf,
      form.nome,
      form.dataNascimento,
      form.genero,
      form.senha
    );
  }

  private exibeErros(error: any) {
    if (error.Status == 400) {
      const erros: string[] = error.error
      erros.forEach((err) => {
        this.toastr.warning(err);
      });
    } else {
      this.toastr.error("Email já existe no sistema.")
    }

  }

  private limpaFormulario() {
    this.formCadastro.reset();
  }

  private abrirComponent(
    dados: any,
    component: ComponentType<any>
  ): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      data: dados,
    });
    // Escutando o resultado após fechar o modal
    return dialogRef.afterClosed();
  }
}

class Opcoes {
  text: string;
  value: string;

  constructor(text: string, value: string) {
    this.text = text;
    this.value = value;
  }
}
