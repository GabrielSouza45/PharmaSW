package br.com.pharmasw.api.infra.validators.cpf;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CpfValidator implements ConstraintValidator<ValidCpf, String> {

    @Override
    public void initialize(ValidCpf constraintAnnotation) {
    }

    @Override
    public boolean isValid(String cpf, ConstraintValidatorContext context) {
        if (cpf == null || cpf.isEmpty()) {
            return false;
        }

        cpf = cpf.replaceAll("\\D", ""); // Remove caracteres não numéricos

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length() != 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (CPFs inválidos como 111.111.111-11)
        if (cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        // Valida os dígitos verificadores do CPF
        return isValidCPF(cpf);
    }

    private boolean isValidCPF(String cpf) {
        try {
            int peso = 10;
            int soma = 0;

            // Calcula o primeiro dígito verificador
            for (int i = 0; i < 9; i++) {
                int num = Integer.parseInt(cpf.substring(i, i + 1));
                soma += num * peso--;
            }
            int primeiroDigitoVerificador = 11 - (soma % 11);
            if (primeiroDigitoVerificador >= 10) {
                primeiroDigitoVerificador = 0;
            }

            // Verifica o primeiro dígito
            if (primeiroDigitoVerificador != Integer.parseInt(cpf.substring(9, 10))) {
                return false;
            }

            // Calcula o segundo dígito verificador
            peso = 11;
            soma = 0;
            for (int i = 0; i < 10; i++) {
                int num = Integer.parseInt(cpf.substring(i, i + 1));
                soma += num * peso--;
            }
            int segundoDigitoVerificador = 11 - (soma % 11);
            if ( segundoDigitoVerificador >= 10) {
                segundoDigitoVerificador = 0;
            }

            // Verifica o segundo dígito
            return segundoDigitoVerificador == Integer.parseInt(cpf.substring(10, 11));

        } catch (NumberFormatException e) {
            return false;
        }
    }
}
