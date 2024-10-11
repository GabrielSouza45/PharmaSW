import { Component } from '@angular/core';
import { EnderecoService } from '../../../../services/endereco/endereco.service';
import { Endereco } from '../../../../modelo/Endereco';
import { TipoEntrega } from '../../../../modelo/enums/TipoEntrega';
import { BotaoComponent } from '../../../../components/botao/botao.component';
import { InputPrimarioComponent } from '../../../../components/input-primario/input-primario.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { PaginaLayoutComponent } from '../../../../components/back-office/pagina-layout/pagina-layout.component';
import { SelectComponent } from '../../../../components/select/select.component';
import { LayoutPrincipalComponent } from '../../layout-principal/layout-principal.component';

interface Opcoes {
  value: string;
  text: string;
}

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
    LayoutPrincipalComponent
  ],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css'
})
export class EnderecoComponent {
  fecharModal() {
    throw new Error('Method not implemented.');
    }
  enderecoForm: FormGroup;
  endereco: Endereco;

  optionsUF: Opcoes[] = [
    { value: 'AC', text: 'Acre' },
    { value: 'AL', text: 'Alagoas' },
    { value: 'AP', text: 'Amapá' },
    { value: 'AM', text: 'Amazonas' },
    { value: 'BA', text: 'Bahia' },
    { value: 'CE', text: 'Ceará' },
    { value: 'DF', text: 'Distrito Federal' },
    { value: 'ES', text: 'Espírito Santo' },
    { value: 'GO', text: 'Goiás' },
    { value: 'MA', text: 'Maranhão' },
    { value: 'MT', text: 'Mato Grosso' },
    { value: 'MS', text: 'Mato Grosso do Sul' },
    { value: 'MG', text: 'Minas Gerais' },
    { value: 'PA', text: 'Pará' },
    { value: 'PB', text: 'Paraíba' },
    { value: 'PR', text: 'Paraná' },
    { value: 'PE', text: 'Pernambuco' },
    { value: 'PI', text: 'Piauí' },
    { value: 'RJ', text: 'Rio de Janeiro' },
    { value: 'RN', text: 'Rio Grande do Norte' },
    { value: 'RS', text: 'Rio Grande do Sul' },
    { value: 'RO', text: 'Rondônia' },
    { value: 'RR', text: 'Roraima' },
    { value: 'SC', text: 'Santa Catarina' },
    { value: 'SP', text: 'São Paulo' },
    { value: 'SE', text: 'Sergipe' },
    { value: 'TO', text: 'Tocantins' },
  ];


  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecoService
  ) {}

  ngOnInit(): void {
    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}')]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  adicionarNovoEndereco() {
    if (this.enderecoForm.valid) {
      const novoEndereco = new Endereco(
        this.enderecoForm.value.cep,
        this.enderecoForm.value.logradouro,
        this.enderecoForm.value.numero,
        this.enderecoForm.value.bairro,
        this.enderecoForm.value.cidade,
        this.enderecoForm.value.uf,
        true, // Endereço padrão
        TipoEntrega.ENTREGA, // Definindo tipo de endereço
        this.enderecoForm.value.complemento
      );

      this.enderecoService.adicionarEndereco(novoEndereco).subscribe({
        next: (response) => {
          console.log('Endereço adicionado:', response);
        },
        error: (error) => {
          console.error('Erro ao adicionar endereço:', error);
        }
      });
    } else {
      console.warn('Formulário inválido!');
    }
  }
}
