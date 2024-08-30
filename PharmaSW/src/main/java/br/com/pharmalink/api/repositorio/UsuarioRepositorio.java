package br.com.pharmalink.api.repositorio;

import br.com.pharmalink.api.modelo.Usuario;
import br.com.pharmalink.api.modelo.enums.Status;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends CrudRepository<Usuario, Long> {

    public List<Usuario> findAllByStatus(Status status);

    @Override
    public List<Usuario> findAll();
    public Usuario findUsuarioByEmailAndSenha(String email, String senha);
    public Usuario findByCpfAndStatus(Long cpf, Status status);
    Usuario findUsuarioByEmailAndStatus(String emailPadrao, Status status);

    @Query(value = "SELECT senha FROM usuario WHERE email = :email AND status = 'ATIVO'", nativeQuery = true)
    String getSenhaByEmailAtivo(@Param("email") String login);

    Optional<Usuario> findByEmail(String email);
}
