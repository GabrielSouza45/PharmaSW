import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbrirComponenteService {
  constructor(private dialog: MatDialog){}

    abrirComponent( dados: any, component: ComponentType<any>) : Observable<any> {
       const dialogRef = this.dialog.open(component, {
        data: dados,
      });
      // Escutando o resultado após fechar o modal
      return dialogRef.afterClosed();

  }
}
