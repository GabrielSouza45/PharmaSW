import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormCheckerService {
  constructor(private toastrService: ToastrService) {}

  // USUARIO

  checkFormErrorsUsuario(formGroup: FormGroup): boolean {
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

  // SENHA

  senhaValida(formGroup: FormGroup): boolean {
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
      const confirmarSenha = formGroup.get('confirmarSenha').value;

      if (senha != confirmarSenha) {
        this.toastrService.warning('Senhas não coincidem.');
        return false;
      }
    }
    return true;
  }

  // PRODUTOS

  checkFormErrorsProdutos(formGroup: FormGroup): boolean {
    let valido: boolean = true;
    const controls = formGroup.controls;

    // Verifica se há erros no campo 'nome'
    if (controls['nome']?.errors?.['required']) {
      this.toastrService.warning('O campo Nome é obrigatório.');
      valido = false;
    }

    // Verifica se há erros no campo 'valor'
    if (controls['valor']?.errors) {
      if (controls['valor'].errors['required']) {
        this.toastrService.warning('O campo de Valor é obrigatório.');
      }
      if (controls['valor'].errors['min']) {
        this.toastrService.warning('Valor mínimo permitido: 0.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'quantidadeEstoque'
    if (controls['quantidadeEstoque']?.errors) {
      if (controls['quantidadeEstoque'].errors['required']) {
        this.toastrService.warning(
          'O campo de Quantidade Estoque é obrigatório.'
        );
      }
      if (controls['quantidadeEstoque'].errors['min']) {
        this.toastrService.warning(
          'Quantidade em Estoque mínima permitida: 0.'
        );
      }
      valido = false;
    }

    // Verifica se há erros no campo 'descricao'
    if (controls['descricao']?.errors) {
      if (controls['descricao']?.errors?.['required']) {
        this.toastrService.warning('O campo de Descrição é obrigatório.');
      }
      if (controls['descricao']?.errors?.['maxLength']) {
        this.toastrService.warning('Descrição máxima de 2 mil letras.');
      }
      valido = false;
    }

    // Verifica se há erros no campo 'avaliacao'
    if (controls['avaliacao']?.errors) {
      if (controls['avaliacao']?.errors?.['required']) {
        this.toastrService.warning('O campo de Avaliação é obrigatório.');
      }
      if (controls['avaliacao']?.errors?.['min']) {
        this.toastrService.warning('Avaliação mínima: 0.');
      }
      if (controls['avaliacao']?.errors?.['max']) {
        this.toastrService.warning('Avaliação máxima: 5.');
      }
      valido = false;
    }
    return valido;
  }

  // CLIENTE

  checkFormErrorsCliente(formGroup: FormGroup): boolean {
    let valido: boolean = true;
    const controls = formGroup.controls;

    if (controls['nome']?.errors) {
      const control = controls['nome'];
      if (control.errors['required']) {
        this.toastrService.warning('O campo nome é obrigatório.');
      } else if (control.errors['maxLength']) {
        this.toastrService.warning('Nome deve ter no máximo 255 caracteres.');
      } else if (control.errors['maxWords']) {
        this.toastrService.warning('Nome deve ter no máximo 2 palavras.');
      } else if (control.errors['minWordLength']) {
        this.toastrService.warning(
          'Nome deve ter no mínimo 3 letras em cada palavra.'
        );
      }
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

    // Verifica se há erros no campo 'genero'
    if (controls['genero']?.errors?.['required']) {
      this.toastrService.warning('O campo de genero é obrigatório.');
      valido = false;
    }

    // Verifica se há erros no campo 'dataNascimento'
    if (controls['dataNascimento']?.errors?.['required']) {
      this.toastrService.warning(
        'O campo de data de nascimento é obrigatório.'
      );
      valido = false;
    }

    return valido;
  }

  validaCep(formGroup: FormGroup): boolean{
    let valido: boolean = true;
    const controls = formGroup.controls;

    if (controls['cep']?.errors?.['required']){
      this.toastrService.warning(
        'Digite o CEP.'
      );

      valido = false;
    }

    if (controls['cep']?.errors?.['minlength']){
      this.toastrService.warning(
        'CEP inválido.'
      );

      valido = false;
    }

    if (controls['cep']?.errors?.['pattern']){
      this.toastrService.warning(
        'Formato de CEP inválido.'
      );

      valido = false;
    }

    return valido;
  }

  checkFormErrorsEndereco(formGroup: FormGroup): boolean{
    let valido: boolean = true;
    const controls = formGroup.controls;

    valido = this.validaCep(formGroup);


    if (controls['logradouro']?.errors?.['required']) {
      this.toastrService.warning("Logradouro é obrigatório. Por favor, digite seu CEP!");
      valido = false;
    }

    if (controls['numero']?.errors?.['required']) {
      this.toastrService.warning("Número é obrigatório.");
      valido = false;
    }

    if (controls['bairro']?.errors?.['required']) {
      this.toastrService.warning("Bairro é obrigatório. Por favor, digite seu CEP!");
      valido = false;
    }

    if (controls['cidade']?.errors?.['required']) {
      this.toastrService.warning("Cidade é obrigatório. Por favor, digite seu CEP!");
      valido = false;
    }

    if (controls['uf']?.errors?.['required']) {
      this.toastrService.warning("UF é obrigatório. Por favor, digite seu CEP!");
      valido = false;
    }

    return valido;
  }


  checkFormErrorsPagamento(form : FormGroup): boolean {

    let valido: boolean = true;
    const controls = form.controls;

    if (controls['numeroCartao'].errors?.['required']) {
      this.toastrService.warning("Número do cartão é obrigatório. Por favor, digite o número no campo adequado!");
      valido = false;
    }

    if (controls['codigoCartao'].errors?.['required']) {
      this.toastrService.warning("Código do cartão é obrigatório. Por favor, digite o código no campo adequado!");
      valido = false;
    }

    if (controls['nomeTitular'].errors?.['required']) {
      this.toastrService.warning("Nome do titular do cartão é obrigatório. Por favor, digite o nome no campo adequado!");
      valido = false;
    }

    if (controls['dataVencimento'].errors?.['required']) {
      this.toastrService.warning("Data de vencimento do cartão é obrigatório. Por favor, selecione o mês e ano de vencimento no calendario!");
      valido = false;
    }

    if (controls['qtdParcelas'].errors?.['required']) {
      this.toastrService.warning("Quantidade de parcelas é obrigatório. Por favor, selecione a quantidade de parcelas!");
      valido = false;
    }

    return valido;

  }
}
