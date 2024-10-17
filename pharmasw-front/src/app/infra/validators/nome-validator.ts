import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value as string;

    if (!name) {
      return null; // Deixar outros validadores lidarem com campos vazios
    }

    // Verifica se o nome é muito longo
    if (name.length > 255) {
      return { maxLength: true };
    }

    // Divide o nome em palavras
    const words = name.trim().split(/\s+/);

    // Verifica se há mais de duas palavras
    if (words.length > 2) {
      return { maxWords: true };
    }

    // Verifica o tamanho de cada palavra
    for (const word of words) {
      if (word.length < 3) {
        return { minWordLength: true };
      }
    }

    // Se tudo estiver correto, retorna null
    return null;
  };
}
