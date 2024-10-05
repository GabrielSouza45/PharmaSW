package br.com.pharmasw.api.infra.validators.nome;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NomeValidator.class) // Referência para a classe que implementa a lógica de validação
public @interface ValidNome {

    String message() default "Nome inválido"; // Mensagem padrão
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}
