package br.com.pharmalink.api.backoffice;

import br.com.pharmalink.api.helpers.DataHelper;
import br.com.pharmalink.api.modelo.Usuario;
import br.com.pharmalink.api.modelo.enums.Status;
import br.com.pharmalink.api.modelo.enums.Grupo;
import br.com.pharmalink.api.repositorio.UsuarioRepositorio;
import br.com.pharmalink.api.service.EncriptaSenhaUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private EncriptaSenhaUsuario encriptaSenhaUsuario;
    @Autowired
    private LoginUsuario loginUsuario;

    @Value("${USUARIO.EMAIL_PADRAO}")
    private String emailPadrao;
    @Value("12345")
    private String senhaPadrao;
    @Value("${USUARIO.NOME_PADRAO}")
    private String nomePadrao;


    @Override
    public void run(String... args) throws Exception {

        verificaPrimeiroUsuarioExistente();

        loginUsuario.iniciar();
    }

    private void verificaPrimeiroUsuarioExistente(){

        Usuario usuario = usuarioRepositorio.findUsuarioByEmailAndStatus(emailPadrao, Status.ATIVO);
        if (usuario == null) {
            criaAdministradorPadrao();
        }

    }

    private void criaAdministradorPadrao(){
        String senhaEncriptada = encriptaSenhaUsuario.encriptar(senhaPadrao);

        Usuario usuario = new Usuario();

        usuario.setNome(nomePadrao);
        usuario.setEmail(emailPadrao);
        usuario.setSenha(senhaEncriptada);

        usuario.setStatus(Status.ATIVO);
        usuario.setGrupo(Grupo.ADMINISTRADOR);
        usuario.setDataIni(DataHelper.getDataHora());

        usuarioRepositorio.save(usuario);
    }
}
