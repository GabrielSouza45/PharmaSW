package br.com.pharmalink.api.backoffice;

import br.com.pharmalink.api.helpers.Scan;
import br.com.pharmalink.api.modelo.Sessao;
import br.com.pharmalink.api.modelo.enums.Status;
import br.com.pharmalink.api.repositorio.UsuarioRepositorio;
import br.com.pharmalink.api.service.EncriptaSenhaUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
    @Autowired
    private Sessao sessao ;



    public void iniciar() {

        try {
            sc.limpar();
            sc.mensagem("Bem Vindo!");
            String login = sc.getString("Login: ");
            String senha = sc.getString("Senha: ");


            if (senhasValida(login, senha)) {
                sc.mensagem("Login efetuado com sucesso!");

                sessao.setUsuarioLogado(
                        usuarioRepositorio.findUsuarioByEmailAndStatus(login, Status.ATIVO)
                );

                telaLogado.mostrarMenu();

            } else {
                sc.mensagem("Login ou senha incorretos!\n");
                iniciar();
            }

        } catch (Error e) {
            e.printStackTrace();
            iniciar();
        }

    }

    private boolean senhasValida(String login, String senha){
        return encriptaSenhaUsuario.validarSenhas(
                login,
                senha
        );
    }


}
