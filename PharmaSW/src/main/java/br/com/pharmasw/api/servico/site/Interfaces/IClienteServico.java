package br.com.pharmasw.api.servico.site.Interfaces;

import br.com.pharmasw.api.modelo.Cliente;
import org.springframework.http.ResponseEntity;

public interface IClienteServico {

        public ResponseEntity<?>cadastrar(Cliente cliente);

        public ResponseEntity<?> alterar(Cliente clienteRequest);

        public ResponseEntity<?> listarClientePorId(Long id);
    }