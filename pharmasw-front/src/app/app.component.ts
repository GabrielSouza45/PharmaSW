import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { InputPrimarioComponent } from './components/input-primario/input-primario.component';
import { BotaoComponent } from './components/botao/botao.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ModalComponent,
    CommonModule,
    InputPrimarioComponent,
    BotaoComponent,
    TextAreaComponent,
    CarouselComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pharmasw-front';



  modalAberto = true;
  images: string[] = ["../assets/logo-com-fundo.png"];



  fecharModal(){}
  mudaEstadoClick(){}

  // Usa o botão como gatilho para abrir o input file escondido
  triggerFileInput() {

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Lida com os arquivos selecionados
  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if(this.images[0] == "../assets/logo-com-fundo.png"){
      this.images = [];
    }

    if (files && files.length > 0) {
      console.log('Arquivos selecionados:', files);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.images.push(e.target.result);  // Armazena a URL da imagem no array
        };

        reader.readAsDataURL(file);  // Converte o arquivo para uma URL válida
      }
    }
  }

}
