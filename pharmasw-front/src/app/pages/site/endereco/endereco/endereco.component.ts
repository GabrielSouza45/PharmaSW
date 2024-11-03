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
import { PopupComponent } from '../../../../components/popup/popup.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { AuthService } from '../../../../infra/auth/auth.service';
import { Cep } from '../../../../modelo/Cep';
import { SelectOptions } from '../../../../modelo/SelectOpcoes';
import { EnderecoService } from '../../../../services/endereco/endereco.service';
import { FormCheckerService } from '../../../../services/form-checker/form-checker.service';
import { LayoutPrincipalComponent } from '../../layout-principal/layout-principal.component';
import { Endereco } from './../../../../modelo/Endereco';
import { TipoEndereco } from './../../../../modelo/enums/TipoEndereco';
import { AbrirComponenteService } from './../../../../services/abrir-componente/abrir-componente.service';
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
  optionsTipo: SelectOptions[] = [];
  enderecoFaturamento: Endereco;

  constructor(
    public dialogRef: MatDialogRef<EnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private enderecoService: EnderecoService,
    private cepApi: CorreiosApiService,
    private toastr: ToastrService,
    private checker: FormCheckerService,
    private auth: AuthService,
    private abrirComponent: AbrirComponenteService
  ) {
    this.enderecoForm = this.getForm();
    this.consultaEnderecoFaturamento();
  }

  onTipoEnderecoChange(event: any): void {
    this.enderecoForm.get('tipoEndereco')?.setValue(event);
  }

  pesquisaCep() {
    if (this.checker.validaCep(this.enderecoForm)) {
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
    if (this.checker.checkFormErrorsEndereco(this.enderecoForm)) {
      const novoEndereco: Endereco = this.enderecoForm.value;
      novoEndereco.idClienteCadastro = this.idCliente;

      console.log(novoEndereco.tipoEndereco === TipoEndereco.FATURAMENTO.toUpperCase());
      console.log(novoEndereco.tipoEndereco);
      console.log(TipoEndereco.FATURAMENTO.toUpperCase());

      if (novoEndereco.tipoEndereco === TipoEndereco.FATURAMENTO.toUpperCase()) {
        this.abrirComponent.abrirComponent(
          {
            tituloPopup: 'Endereço de Faturamento.',
            texto: 'Deseja criar um endereço de entrega a partir deste endereço?'
          },
          PopupComponent
        ).subscribe((resposta) => {
          if (resposta === 'confirmar') {
            novoEndereco.copia = true;
          }
          this.adicionar(novoEndereco);
        });
      }
      else {
        this.adicionar(novoEndereco);
      }
    }
  }

  private adicionar(endereco: Endereco) {
    this.enderecoService.adicionar(endereco, '/adicionar').subscribe({
      next: (response) => {
        this.fecharModal();
      },
      error: (error) => {
        if (error.status == 400) {
          this.toastr.warning('Endereço já cadastrado.');
        }
      },
    });
  }

  private getTipoEndereco(): void {
    if (this.enderecoFaturamento) {
      let opt: SelectOptions = new SelectOptions();
      opt.text = TipoEndereco.ENTREGA;
      opt.value = TipoEndereco.ENTREGA.toUpperCase()
      this.optionsTipo.push(opt);
    } else {
      for (const [key, value] of Object.entries(TipoEndereco)) {
        let opc = new SelectOptions();
        opc.text = value.toString();
        opc.value = key;
        this.optionsTipo.push(opc);
      }
    }
    this.enderecoForm.patchValue({
      tipoEndereco: this.optionsTipo[0].value
    })
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

