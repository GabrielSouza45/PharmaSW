package br.com.pharmasw.api.service.helpers;

import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Grupo;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class VerificaAdministradorPadrao implements CommandLineRunner {


    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Value("${USUARIO.EMAIL_PADRAO}")
    private String emailPadrao;
    @Value("${USUARIO.SENHA_PADRAO}")
    private String senhaPadrao;
    @Value("${USUARIO.NOME_PADRAO}")
    private String nomePadrao;



    @Override
    public void run(String... args) throws Exception {
        Usuario usuario = usuarioRepositorio.findUsuarioByEmailAndStatus(emailPadrao, Status.ATIVO);
        if (usuario == null) {
            criaAdministradorPadrao();
            System.out.println("Primeiro usuário criado!");

        }
    }

    private void criaAdministradorPadrao(){
        String senhaEncriptada = new BCryptPasswordEncoder().encode(senhaPadrao);

        Usuario usuario = new Usuario();

        usuario.setNome(nomePadrao);
        usuario.setEmail(emailPadrao);
        usuario.setSenha(senhaEncriptada);
        usuario.setCpf(80999626051L);

        usuario.setStatus(Status.ATIVO);
        usuario.setGrupo(Grupo.ADMINISTRADOR);

        usuarioRepositorio.save(usuario);
    }

}
