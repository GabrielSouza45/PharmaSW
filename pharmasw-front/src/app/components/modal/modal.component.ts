import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BotaoComponent } from '../botao/botao.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BotaoComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  isModalOpen = false;
  @Input()tituloModal: string = '';
  @Input()botaoTexto: string = 'Cadastrar';
  @Input()formGroup: FormGroup;
  @Input()textoBotao: string = '';
  @Output("fecharModal") fechar = new EventEmitter;
  @Output("submit") submit = new EventEmitter;

  abrirModal(tipo: string): void {
    this.isModalOpen = true;
    this.tituloModal = tipo === 'Cadastrar' ? 'Cadastrar Usuário' : 'Alterar Usuário';
    this.botaoTexto = tipo === 'Cadastrar' ? 'Cadastrar' : 'Alterar';
  }

  fecharModal(): void {
    this.fechar.emit();
  }

  onSubmit(){
    this.submit.emit();
  }

}
