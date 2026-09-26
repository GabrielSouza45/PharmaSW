package br.com.pharmasw.api.service.site;

import br.com.pharmasw.api.model.MetodosPagamento;
import br.com.pharmasw.api.repository.MetodosPagamentoRepositorio;
import br.com.pharmasw.api.service.responseBuilder.ResponseBuilder;
import br.com.pharmasw.api.service.site.Interfaces.IMetodosPagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetodosPagamentoService implements IMetodosPagamentoService {

    @Autowired
    private MetodosPagamentoRepositorio metodosRepositorio;

    @Override
    public ResponseEntity<?> getMetodosPagamento() {
        List<MetodosPagamento> metodos = metodosRepositorio.findAll();

        return new ResponseBuilder().build(metodos, HttpStatus.OK);
    }
}
