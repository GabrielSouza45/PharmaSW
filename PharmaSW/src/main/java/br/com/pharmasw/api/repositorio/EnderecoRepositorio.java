package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Endereco;
import br.com.pharmasw.api.modelo.enums.TipoEndereco;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


import java.util.List;

public interface EnderecoRepositorio extends JpaRepository<Endereco, Long> {
    boolean existsByClienteIdAndTipoEndereco(Long id, TipoEndereco tipoEndereco);

    Endereco findByCepAndTipoEndereco(String cep, TipoEndereco tipoEndereco);

    boolean existsByCepAndTipoEndereco(String cep, TipoEndereco tipoEndereco);

    boolean existsByClienteIdAndCepAndTipoEndereco(Long id, @NotBlank(message = "CEP é obrigatório") String cep, TipoEndereco tipoEndereco);

    List<Endereco> findByClienteId(Long clienteId);

    List<Endereco> findByClienteIdOrderByPadraoDesc(Long id);

    Endereco findByClienteIdAndTipoEnderecoAndPadrao(Long id, TipoEndereco tipoEndereco, boolean b);

    boolean existsByClienteIdAndCepAndTipoEnderecoAndNumero(Long id, String cep, TipoEndereco tipoEndereco, String numero);

    Endereco findByClienteIdAndTipoEndereco(Long idCliente, TipoEndereco tipoEndereco);

    List<Endereco> findByClienteIdOrderByTipoEnderecoDescPadraoDesc(Long id);
}
