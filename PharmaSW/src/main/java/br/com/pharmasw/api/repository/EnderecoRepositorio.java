package br.com.pharmasw.api.repository;

import br.com.pharmasw.api.model.Endereco;
import br.com.pharmasw.api.model.enums.TipoEndereco;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnderecoRepositorio extends JpaRepository<Endereco, Long> {
    boolean existsByClienteIdAndTipoEndereco(Long id, TipoEndereco tipoEndereco);

    List<Endereco> findByClienteId(Long clienteId);

    boolean existsByClienteIdAndCepAndTipoEnderecoAndNumero(Long id, String cep, TipoEndereco tipoEndereco, String numero);

    List<Endereco> findByClienteIdAndTipoEndereco(Long idCliente, TipoEndereco tipoEndereco);

    List<Endereco> findByClienteIdOrderByTipoEnderecoDescPadraoDesc(Long id);

    boolean existsByClienteIdAndPadrao(Long id, boolean padrao);

    List<Endereco> findByClienteIdAndTipoEnderecoOrderByPadraoDesc(Long idCliente, TipoEndereco tipoEndereco);
}
