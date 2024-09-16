import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormCheckerService {

  constructor(private toastrService: ToastrService) { }

  checkFormErrorsUsuario(formGroup : FormGroup): boolean {
    let valido: boolean = true;
    const controls = formGroup.controls;

    // Verifica se há erros no campo 'nome'
    if (controls['nome']?.errors?.['required']) {
      this.toastrService.warning('O campo nome é obrigatório.');
      valido = false;
    }

    // Verifica se há erros no campo 'email'
    if (controls['email']?.errors) {
      if (controls['email'].errors['required']) {
        this.toastrService.warning('O campo de email é obrigatório.');
      } else if (controls['email'].errors['email']) {
        this.toastrService.warning('O email inserido não é válido.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'cpf'
    if (controls['cpf']?.errors) {
      if (controls['cpf'].errors['invalidCpf']) {
        this.toastrService.warning('CPF Inválido.');
      } else if (controls['cpf'].errors['required']) {
        this.toastrService.warning('CPF é obrigatório.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'grupo'
    if (controls['grupo']?.errors?.['required']) {
      this.toastrService.warning('O campo de grupo é obrigatório.');
      valido = false;
    }
    return valido;
  }

  senhaValida(formGroup : FormGroup): boolean {
    const controls = formGroup.controls;

    // Verifica se há erros no campo 'senha'
    if (controls['senha']?.errors?.['required']) {
      this.toastrService.warning('O campo de senha é obrigatório.');
      return false;
    }
    // Verifica se há erros no campo 'confirmarSenha'
    if (controls['confirmarSenha']?.errors?.['required']) {
      this.toastrService.warning(
        'O campo de confirmação de senha é obrigatório.'
      );
      return false;
    }

    if (!controls['senha']?.errors && !controls['confirmarSenha']?.errors) {
      const senha = formGroup.get('senha').value;
      const confirmarSenha =
      formGroup.get('confirmarSenha').value;

      if (senha != confirmarSenha) {
        this.toastrService.warning('Senhas não coincidem.');
        return false;
      }
    }
    return true;
  }

  checkFormErrorsProdutos(formGroup: FormGroup): boolean {
    let valido: boolean = true;
    const controls = formGroup.controls;

    // Verifica se há erros no campo 'nome'
    if (controls['nome']?.errors?.['required']) {
      this.toastrService.warning('O campo nome é obrigatório.');
      valido = false;
    }

    // Verifica se há erros no campo 'categoria'
    if (controls['categoria']?.errors) {
      if (controls['categoria'].errors['required']) {
        this.toastrService.warning('O campo de email é obrigatório.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'valor'
    if (controls['valor']?.errors) {
      if (controls['valor'].errors['required']) {
        this.toastrService.warning('O campo de valor é obrigatório.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'peso'
    if (controls['peso']?.errors?.['required']) {
      this.toastrService.warning('O campo de peso é obrigatório.');
      valido = false;
    }
    return valido;
  }
}
