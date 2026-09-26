package br.com.pharmasw.api.service.site.Interfaces;

import br.com.pharmasw.api.model.Cliente;
import br.com.pharmasw.api.model.Endereco;
import org.springframework.http.ResponseEntity;

public interface IEnderecoServico {

    public ResponseEntity<?> listarPorCliente(Long id);

    public ResponseEntity<?> cadastrar(Endereco endereco, Cliente cliente);

    public ResponseEntity<?> alterarEnderecoPadrao(Long idEndereco);

    public ResponseEntity<?> getEnderecoFaturamento(Long idCliente);

    public ResponseEntity<?> getEnderecoEntrega(Long idCliente);
}