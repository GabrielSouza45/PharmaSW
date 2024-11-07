package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Endereco;
import br.com.pharmasw.api.modelo.enums.TipoEndereco;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


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
