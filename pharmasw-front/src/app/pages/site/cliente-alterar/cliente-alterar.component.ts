import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaginaLayoutComponent } from "../../../components/back-office/pagina-layout/pagina-layout.component";
import { BotaoComponent } from "../../../components/botao/botao.component";
import { InputPrimarioComponent } from "../../../components/input-primario/input-primario.component";
import { ModalComponent } from '../../../components/modal/modal.component';
import { SelectComponent } from "../../../components/select/select.component";
import { nameValidator } from '../../../infra/validators/nome-validator';
import { Cliente } from '../../../modelo/Cliente';
import { Genero } from '../../../modelo/enums/Genero';
import { SelectOptions } from '../../../modelo/SelectOpcoes';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { FormCheckerService } from '../../../services/form-checker/form-checker.service';
import { LayoutPrincipalComponent } from "../layout-principal/layout-principal.component";

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
  clienteForm: FormGroup;
  optionsGenero: SelectOptions[] = [];
  cliente: Cliente;

  constructor(
    public dialogRef: MatDialogRef<ClienteAlterarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private http: HttpClient,
    private checker: FormCheckerService
  ) {
    this.getGeneros();
    this.clienteForm = this.getForm();
    this.cliente = data.cliente;
    this.alimentaForm(this.cliente);

  }

  fecharModal(msg?: string) {
    this.dialogRef.close(msg);
  }

  onSubmit(): void {
    if (this.checker.checkFormErrorsCliente(this.clienteForm)) {
      if (this.clienteForm.value.senha) {
        if (!this.checker.senhaValida(this.clienteForm)) {
          return;
        }
      }

      const clienteData: Cliente = this.clienteForm.value;
      clienteData.id = this.cliente.id;

      this.clienteService.editar(clienteData, "/alterar-cliente").subscribe();
      this.fecharModal("editado");
    }
  }


  private getForm(): FormGroup {
    return new FormGroup({
      nome: new FormControl('', [Validators.required, nameValidator()]),
      genero: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      senha: new FormControl(''),
      confirmarSenha: new FormControl(''),
    });
  }

  private alimentaForm(cliente: Cliente): void {
    this.clienteForm.patchValue({
      nome: cliente.nome,
      dataNascimento: cliente.dataNascimento
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

  private getGeneros(): void {
    for (const [key, value] of Object.entries(Genero)) {
      let opc = new SelectOptions();
      opc.text = value.toString();
      opc.value = key;
      this.optionsGenero.push(opc);
    }
  }
}

