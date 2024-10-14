import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteAlterarService } from '../../../services/cliente-alterar/cliente-alterar.service';
import { BotaoComponent } from "../../../components/botao/botao.component";
import { InputPrimarioComponent } from "../../../components/input-primario/input-primario.component";
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../components/modal/modal.component';
import { PaginaLayoutComponent } from "../../../components/back-office/pagina-layout/pagina-layout.component";
import { SelectComponent } from "../../../components/select/select.component";
import { Genero } from '../../../modelo/enums/Genero';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";
import { cpfValidator } from '../../../infra/validators/cpf-validator';
import { nameValidator } from '../../../infra/validators/nome-validator';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormCheckerService } from '../../../services/form-checker/form-checker.service';

@Component({
  selector: 'app-cliente-alterar',
  standalone: true,
  imports: [
    BotaoComponent,
    InputPrimarioComponent,
    ReactiveFormsModule,
    CommonModule,
    ModalComponent,
    PaginaLayoutComponent,
    SelectComponent,
    LayoutPrincipalComponent
],
  templateUrl: './cliente-alterar.component.html',
  styleUrl: './cliente-alterar.component.css'
})
export class ClienteAlterarComponent {
[x: string]: any;
fecharModal() {
throw new Error('Method not implemented.');
}

clienteForm: FormGroup;
tituloModal: any;
textoBotao: string;
optionsGenero: Opcoes[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteAlterarService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private checker: FormCheckerService
  ) {
    this.clienteForm = this.getForm();
    this.getGeneros();
  }

  ngOnInit(): void {
    this.carregarDadosCliente();
  }

  carregarDadosCliente(): void {
    this.clienteService.getClienteLogado().subscribe((cliente) => {
      this.clienteForm.patchValue({
        nome: cliente.nome,
        dataNascimento: cliente.dataNascimento,
        genero: cliente.genero
      });
    });
  }

  getGeneros(): void {
    for (const [key, value] of Object.entries(Genero)) {
      let opc = new Opcoes(value.toString(), key);
      console.log(opc);

      this.optionsGenero.push(opc);
    }
  }


  onSubmit(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;

      this.clienteService.alterarCliente(clienteData).subscribe(
        (response) => {
          this.toastr.success(response); // Exibe mensagem de sucesso
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.toastr.error(error.error || 'Erro ao alterar dados.'); // Exibe mensagem de erro
        }
      );
    } else {
      this.toastr.warning('Por favor, preencha todos os campos corretamente.'); // Alerta caso o formulário não esteja válido
    }
  }

  getForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', [Validators.required, nameValidator()]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
}

class Opcoes {
  text: string;
  value: string;

  constructor(text: string, value: string) {
    this.text = text;
    this.value = value;
  }
}
