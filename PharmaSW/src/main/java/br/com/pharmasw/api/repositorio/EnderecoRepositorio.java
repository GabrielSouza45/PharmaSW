package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Endereco;
import br.com.pharmasw.api.modelo.enums.TipoEndereco;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepositorio extends JpaRepository<Endereco, Long> {
    boolean existsByClienteIdAndTipoEndereco(Long id, TipoEndereco tipoEndereco);

    Endereco findByCepAndTipoEndereco(String cep, TipoEndereco tipoEndereco);

    boolean existsByCepAndTipoEndereco(String cep, TipoEndereco tipoEndereco);

    boolean existsByClienteIdAndCepAndTipoEndereco(Long id, @NotBlank(message = "CEP é obrigatório") String cep, TipoEndereco tipoEndereco);
}
