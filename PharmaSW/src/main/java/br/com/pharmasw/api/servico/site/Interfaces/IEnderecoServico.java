package br.com.pharmasw.api.servico.site.Interfaces;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Endereco;
import org.springframework.http.ResponseEntity;

public interface IEnderecoServico {

    public ResponseEntity<?> listarPorCliente(Long id);

    public ResponseEntity<?> cadastrar(Endereco endereco, Cliente cliente);

    public ResponseEntity<?> cadastrarEnderecoEntrega(Endereco endereco, Cliente cliente);

    public ResponseEntity<?> cadastrarEnderecoFaturamento(Endereco endereco, Cliente cliente);

    public ResponseEntity<?> alterarEnderecoPadrao(Long idEndereco);

    public ResponseEntity<?> getEnderecoFaturamento(Long idCliente);

    public ResponseEntity<?> getEnderecoEntrega(Long idCliente);
}