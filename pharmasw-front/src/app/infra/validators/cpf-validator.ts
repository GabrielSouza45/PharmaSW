import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // Não valida se o campo estiver vazio

    const cpf = control.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(.)\1{10}$/.test(cpf)) {
      return { invalidCpf: true }; // Verifica se todos os números são iguais
    }

    let sum = 0;
    let rest: number;

    // Verifica o primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (10 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;

    if (rest !== parseInt(cpf.charAt(9), 10)) {
      return { invalidCpf: true };
    }

    // Verifica o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest === 10) rest = 0;

    if (rest !== parseInt(cpf.charAt(10), 10)) {
      return { invalidCpf: true };
    }

    return null; // CPF válido
  };
}
