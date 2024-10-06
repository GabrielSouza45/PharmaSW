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

@Service
public class EnderecoServico {

    @Autowired
    private EnderecoRepositorio enderecoRepositorio;

    public ResponseEntity<?> cadastrar(Endereco endereco, Cliente cliente){

        if (endereco.getTipoEndereco() == TipoEndereco.ENTREGA){
            return this.cadastrarEnderecoEntrega(endereco, cliente);
        } else {
            return this.cadastrarEndetecoFaturamento(endereco, cliente);
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


    private ResponseEntity<?> cadastrarEndetecoFaturamento(Endereco endereco, Cliente cliente) {

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




}
