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
import java.util.Optional;

@Service
public class EnderecoServico {

    @Autowired
    private EnderecoRepositorio enderecoRepositorio;

    public ResponseEntity<?> listarPorCliente(Long id) {

        List<Endereco> enderecos = enderecoRepositorio.findByClienteIdOrderByTipoEnderecoDescPadraoDesc(id);

        return new ResponseEntity<>(enderecos, HttpStatus.OK);

    }


    public ResponseEntity<?> cadastrar(Endereco endereco, Cliente cliente){

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
                enderecoRepositorio.existsByClienteIdAndCepAndTipoEnderecoAndNumero(cliente.getId(), endereco.getCep(), TipoEndereco.ENTREGA, endereco.getNumero());

        if (existe)
            return new ResponseEntity<>("Endereço já cadastrado", HttpStatus.BAD_REQUEST);

        endereco.setLogradouro(apiEndereco.getLogradouro());
        endereco.setBairro(apiEndereco.getBairro());
        endereco.setCidade(apiEndereco.getLocalidade());
        endereco.setUf(apiEndereco.getUf());
        endereco.setCliente(cliente);

        Endereco endSalvo = enderecoRepositorio.save(endereco);
        ResponseEntity<?> resp = this.alterarEnderecoPadrao(endSalvo.getId());
        endSalvo.setCliente(null);
        return new ResponseEntity<>(endSalvo, HttpStatus.CREATED);
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
        endereco.setPadrao(false);

        Endereco retorno = enderecoRepositorio.save(endereco);
        retorno.setCliente(null);
        return new ResponseEntity<>(retorno, HttpStatus.CREATED);

    }

    public ResponseEntity<?> alterarEnderecoPadrao(Long idEndereco) {
        Optional<Endereco> enderecoOpt = enderecoRepositorio.findById(idEndereco);
        if (enderecoOpt.isEmpty()) {
            return new ResponseEntity<>("Endereço não encontrado", HttpStatus.NOT_FOUND);
        }

        Endereco enderecoEscolhido = enderecoOpt.get();
        Cliente cliente = enderecoEscolhido.getCliente();

        List<Endereco> enderecosDoCliente = enderecoRepositorio.findByClienteId(cliente.getId());

        enderecosDoCliente.forEach(endereco -> {
            endereco.setPadrao(false);
            enderecoRepositorio.save(endereco);
        });

        enderecoEscolhido.setPadrao(true);
        enderecoRepositorio.save(enderecoEscolhido);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    public ResponseEntity<?> getEnderecoFaturamento(Long idCliente) {

        Endereco endereco = enderecoRepositorio.findByClienteIdAndTipoEndereco(idCliente, TipoEndereco.FATURAMENTO);

        return new ResponseEntity<>(endereco, HttpStatus.OK);
    }
}