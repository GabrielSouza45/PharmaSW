package br.com.pharmasw.api.infra.exceptionHandler;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errorMessage = new ArrayList<>();
        ex.getBindingResult()
                .getAllErrors().forEach(err -> {errorMessage.add(err.getDefaultMessage());});
//                .stream()
//                .map(error -> error.getDefaultMessage())
//                .collect(Collectors.joining(", "));
        String json = new Gson().toJson(errorMessage);
        return new ResponseEntity<>(json, HttpStatus.BAD_REQUEST);
    }
}
