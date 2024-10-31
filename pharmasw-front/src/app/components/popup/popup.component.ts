import { Component, Inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { BotaoComponent } from '../botao/botao.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ModalComponent, BotaoComponent, CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  tituloPopup: string = this.data.tituloPopup;
  texto: string = this.data.texto;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onCancelar() {
    this.dialogRef.close('cancelar');
  }

  onSubmit() {
    this.dialogRef.close('confirmar');
  }
}
