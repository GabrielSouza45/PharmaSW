package br.com.pharmasw.api.service.responseBuilder;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder implements IResponseBuilder {

    @Override
    public ResponseEntity<?> build(String menssagem, HttpStatus httpStatus) {
        Retorno retorno = new Retorno(menssagem);
        return new ResponseEntity<>(retorno, httpStatus);
    }

    @Override
    public ResponseEntity<?> build(Object object, HttpStatus httpStatus) {
        return new ResponseEntity<>(object, httpStatus);
    }

    @Override
    public ResponseEntity<?> build(HttpStatus httpStatus) {
        return new ResponseEntity<>(httpStatus);
    }
}

class Retorno {
    private String menssagem;

    public Retorno(String menssagem) {
        this.menssagem = menssagem;
    }

    public String getMenssagem() {
        return menssagem;
    }
}
