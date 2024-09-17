import { Component, Inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { BotaoComponent } from '../botao/botao.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [ModalComponent, BotaoComponent],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  tituloPopup: string = this.data.tituloPopup;

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
