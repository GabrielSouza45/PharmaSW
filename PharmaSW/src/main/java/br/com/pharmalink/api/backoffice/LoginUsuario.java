package br.com.pharmalink.api.backoffice;

import br.com.pharmalink.api.helpers.Scan;
import br.com.pharmalink.api.modelo.Usuario;
import br.com.pharmalink.api.modelo.enums.Status;
import br.com.pharmalink.api.repositorio.UsuarioRepositorio;
import br.com.pharmalink.api.service.EncriptaSenhaUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class LoginUsuario {


    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private EncriptaSenhaUsuario encriptaSenhaUsuario;
    @Autowired
    private Scan sc;
    @Autowired
    private TelaLogado telaLogado;


    public void iniciar() {

        try {
            sc.mensagem("Bem Vindo!");
            String login = sc.getString("Login: ");
            String senha = sc.getString("Senha: ");



            boolean senhasValida = encriptaSenhaUsuario.validarSenhas(
                    login,
                    senha
            );

            if (senhasValida) {
                sc.mensagem("Login efetuado com sucesso!");

                Usuario usuarioLogado =
                        usuarioRepositorio.findUsuarioByEmailAndStatus(login, Status.ATIVO);

                telaLogado.menu();

            } else {
                sc.mensagem("Login ou senha incorretos!\n");
                iniciar();
            }

        } catch (Error e) {
            e.printStackTrace();
        }

    }


}
