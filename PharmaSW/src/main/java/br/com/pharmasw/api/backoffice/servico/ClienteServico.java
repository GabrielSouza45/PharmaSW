package br.com.pharmasw.api.backoffice.servico;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

public class ClienteServico {
    @Autowired
    private ClienteRepositorio clienteRepositorio;

    // CADASTRAR CLIENTE
    public ResponseEntity<?> cadastrar (Cliente cliente){
        return null;
    }
}
