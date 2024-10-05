package br.com.pharmasw.api.infra.validators.nome;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NomeValidator implements ConstraintValidator<ValidNome, String> {

    private static final int MAX_CARACTERES = 255;

    @Override
    public void initialize(ValidNome constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String nome, ConstraintValidatorContext constraintValidatorContext) {
        if (nome == null || nome.trim().isEmpty()) {
            return false;
        }

        // Divide o nome em palavras
        String[] palavras = nome.trim().split("\\s+");

        // Verifica se o nome tem mais de 255 caracteres
        if (nome.length() > MAX_CARACTERES) {
            return false;
        }

        // Verifica se há mais de duas palavras
        if (palavras.length > 2) {
            return false;
        }

        // Verifica se cada palavra tem no mínimo 3 letras
        for (String palavra : palavras) {
            if (palavra.length() < 3) {
                return false;
            }
        }

        return true;
    }
}
