import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaginaLayoutComponent } from '../../../../components/back-office/pagina-layout/pagina-layout.component';
import { BotaoComponent } from '../../../../components/botao/botao.component';
import { InputPrimarioComponent } from '../../../../components/input-primario/input-primario.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { AuthService } from '../../../../infra/auth/auth.service';
import { Cep } from '../../../../modelo/Cep';
import { EnderecoService } from '../../../../services/endereco/endereco.service';
import { FormCheckerService } from '../../../../services/form-checker/form-checker.service';
import { LayoutPrincipalComponent } from '../../layout-principal/layout-principal.component';
import { Endereco } from './../../../../modelo/Endereco';
import { TipoEndereco } from './../../../../modelo/enums/TipoEndereco';
import { CorreiosApiService } from './../../../../services/correios/correios-api.service';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [
    BotaoComponent,
    InputPrimarioComponent,
    ReactiveFormsModule,
    CommonModule,
    ModalComponent,
    PaginaLayoutComponent,
    SelectComponent,
    LayoutPrincipalComponent,
  ],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css',
})
export class EnderecoComponent {
  enderecoForm: FormGroup;
  endereco: Endereco;
  idCliente: number = this.auth.getIdUser();
  optionsTipo: Opcoes[] = [];
  enderecoFaturamento: Endereco;

  constructor(
    public dialogRef: MatDialogRef<EnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private enderecoService: EnderecoService,
    private cepApi: CorreiosApiService,
    private toastr: ToastrService,
    private cheker: FormCheckerService,
    private auth: AuthService
  ) {
    this.enderecoForm = this.getForm();
    this.consultaEnderecoFaturamento();
  }

  onTipoEnderecoChange(event: any): void {
    this.enderecoForm.get('tipoEndereco')?.setValue(event);
  }

  pesquisaCep() {
    if (this.cheker.validaCep(this.enderecoForm)) {
      this.cepApi.consultar(this.enderecoForm.value.cep).subscribe({
        next: (resp: Cep) => {
          this.alimentaForm(resp);
        },
      });
    }
  }

  fecharModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.cheker.checkFormErrorsEndereco(this.enderecoForm)) {
      const novoEndereco: Endereco = this.enderecoForm.value;
      novoEndereco.idClienteCadastro = this.idCliente;
      novoEndereco.padrao = true;

      this.enderecoService.adicionar(novoEndereco, '/adicionar').subscribe({
        next: (response) => {
          this.fecharModal();
        },
        error: (error) => {
          if (error.status == 400) {
            this.toastr.warning('Endereço já cadastrado.');
          }
        },
      });
    } else {
    }
  }

  private getTipoEndereco(): void {
    console.log(this.enderecoFaturamento);
    if (this.enderecoFaturamento) {
      let opt: Opcoes = new Opcoes(
        TipoEndereco.ENTREGA,
        TipoEndereco.ENTREGA.toUpperCase()
      );
      this.optionsTipo.push(opt);
    } else {
      for (const [key, value] of Object.entries(TipoEndereco)) {
        let opc = new Opcoes(value.toString(), key);
        this.optionsTipo.push(opc);
      }
    }
  }

  private consultaEnderecoFaturamento(): void {
    this.enderecoService
      .listarGet(
        `/cliente-listar-endereco-faturamento?idCliente=${this.idCliente}`
      )
      .subscribe({
        next: (response) => {
          this.enderecoFaturamento = response ? response : null;
          this.getTipoEndereco();
        },
      });
  }

  private alimentaForm(cep: Cep) {
    this.enderecoForm.patchValue({
      logradouro: cep.logradouro,
      bairro: cep.bairro,
      cidade: cep.localidade,
      uf: cep.uf,
    });
  }

  private getForm() {
    return new FormGroup({
      tipoEndereco: new FormControl('', [Validators.required]),
      cep: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[0-9]{8}'),
      ]),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
    });
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
