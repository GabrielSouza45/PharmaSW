package br.com.pharmasw.api.repositorio;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    UserDetails findByEmailAndStatus(String email, Status status);

    public List<Usuario> findAllByStatus(Status status);

    @Override
    public List<Usuario> findAll();
    public Usuario findUsuarioByEmailAndSenha(String email, String senha);
    public Usuario findByCpfAndStatus(Long cpf, Status status);
    Usuario findUsuarioByEmailAndStatus(String emailPadrao, Status status);

    @Query(value = "SELECT senha FROM usuario WHERE email = :email AND status = 'ATIVO'", nativeQuery = true)
    String getSenhaByEmailAtivo(@Param("email") String login);

}