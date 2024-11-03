package br.com.pharmasw.api.servico.site.Interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface IMetodosPagamentoService {

    public ResponseEntity<?> getMetodosPagamento();

}
