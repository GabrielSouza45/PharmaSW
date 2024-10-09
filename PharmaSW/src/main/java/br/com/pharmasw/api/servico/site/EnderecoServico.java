package br.com.pharmasw.api.servico.site;

import br.com.pharmasw.api.modelo.Cliente;
import br.com.pharmasw.api.modelo.Endereco;
import br.com.pharmasw.api.modelo.ViaCepEndereco;
import br.com.pharmasw.api.modelo.enums.TipoEndereco;
import br.com.pharmasw.api.repositorio.EnderecoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnderecoServico {

    @Autowired
    private EnderecoRepositorio enderecoRepositorio;

    public ResponseEntity<?> cadastrar(Endereco endereco, Cliente cliente) {

        if (endereco.getTipoEndereco() == TipoEndereco.ENTREGA) {
            return this.cadastrarEnderecoEntrega(endereco, cliente);
        } else {
            return this.cadastrarEnderecoFaturamento(endereco, cliente);
        }

    }

    private ResponseEntity<?> cadastrarEnderecoEntrega(Endereco endereco, Cliente cliente) {

        ViaCepEndereco apiEndereco = ViaCepAPI.consultar(endereco.getCep());

        if (apiEndereco == null)
            return new ResponseEntity<>("Cep não localizado", HttpStatus.BAD_GATEWAY);

        boolean existe =
                enderecoRepositorio.existsByClienteIdAndCepAndTipoEndereco(cliente.getId(), endereco.getCep(), TipoEndereco.ENTREGA);

        if (existe)
            return new ResponseEntity<>("Endereço já cadastrado", HttpStatus.BAD_REQUEST);

        endereco.setLogradouro(apiEndereco.getLogradouro());
        endereco.setBairro(apiEndereco.getBairro());
        endereco.setCidade(apiEndereco.getLocalidade());
        endereco.setUf(apiEndereco.getUf());
        endereco.setCliente(cliente);

        boolean clienteJaTemEndereco =
                enderecoRepositorio.existsByClienteIdAndTipoEndereco(cliente.getId(), TipoEndereco.ENTREGA);

        if (!clienteJaTemEndereco)
            endereco.setPadrao(true);

        Endereco retorno = enderecoRepositorio.save(endereco);
        retorno.setCliente(null);
        return new ResponseEntity<>(retorno, HttpStatus.CREATED);
    }


    private ResponseEntity<?> cadastrarEnderecoFaturamento(Endereco endereco, Cliente cliente) {

        boolean clienteJaTemEndereco =
                enderecoRepositorio.existsByClienteIdAndTipoEndereco(cliente.getId(), TipoEndereco.FATURAMENTO);

        if (clienteJaTemEndereco)
            return new ResponseEntity<>("Não é possível adicionar mais de um endereço de faturamento", HttpStatus.BAD_GATEWAY);


        ViaCepEndereco apiEndereco = ViaCepAPI.consultar(endereco.getCep());

        if (apiEndereco == null)
            return new ResponseEntity<>("Cep não localizado", HttpStatus.BAD_GATEWAY);


        endereco.setLogradouro(apiEndereco.getLogradouro());
        endereco.setBairro(apiEndereco.getBairro());
        endereco.setCidade(apiEndereco.getLocalidade());
        endereco.setUf(apiEndereco.getUf());
        endereco.setCliente(cliente);

        Endereco retorno = enderecoRepositorio.save(endereco);
        retorno.setCliente(null);
        return new ResponseEntity<>(retorno, HttpStatus.CREATED);

    }

    //Adicionar novo enderecoEntrega
    public ResponseEntity<?> adicionarNovoEnderecoEntrega(Endereco endereco, Cliente cliente) {
        ViaCepEndereco apiEndereco = ViaCepAPI.consultar(endereco.getCep());

        if (apiEndereco == null) {
            return new ResponseEntity<>("Cep não localizado", HttpStatus.BAD_GATEWAY);
        }

        boolean existeEnderecoEntrega =
                enderecoRepositorio.existsByClienteIdAndCepAndTipoEndereco(cliente.getId(), endereco.getCep(), TipoEndereco.ENTREGA);

        if (existeEnderecoEntrega) {
            return new ResponseEntity<>("Endereço já cadastrado", HttpStatus.BAD_REQUEST);
        }

        endereco.setLogradouro(apiEndereco.getLogradouro());
        endereco.setBairro(apiEndereco.getBairro());
        endereco.setCidade(apiEndereco.getLocalidade());
        endereco.setUf(apiEndereco.getUf());
        endereco.setCliente(cliente);

        boolean enderecoEntregaExiste =
                enderecoRepositorio.existsByClienteIdAndTipoEndereco(cliente.getId(), TipoEndereco.ENTREGA);

        if (enderecoEntregaExiste) {
            endereco.setPadrao(true);
        } else if (endereco.isPadrao()) {
            this.definirEnderecoPadrao(cliente.getId(), endereco.getId());
        }

        Endereco retorno = enderecoRepositorio.save(endereco);

        if (endereco.isPadrao()) {
            this.definirEnderecoPadrao(cliente.getId(), retorno.getId());
        }

        retorno.setCliente(null);

        return new ResponseEntity<>(retorno, HttpStatus.CREATED);
    }

    //ajuda a definir o padrão de entrega
    private void definirEnderecoPadrao(Long clienteId, Long enderecoAtualId) {
        List<Endereco> enderecosEntrega = enderecoRepositorio.findByClienteIdAndTipoEnderecoAndPadrao(clienteId, TipoEndereco.ENTREGA, true);

        for (Endereco endereco : enderecosEntrega) {
            if (!endereco.getId().equals(enderecoAtualId)) {
                endereco.setPadrao(false);
                enderecoRepositorio.save(endereco);
            }
        }
    }
}