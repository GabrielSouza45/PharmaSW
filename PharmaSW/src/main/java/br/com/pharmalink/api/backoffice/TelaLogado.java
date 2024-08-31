package br.com.pharmalink.api.backoffice;

import br.com.pharmalink.api.service.helpers.Scan;
import br.com.pharmalink.api.modelo.Produto;
import br.com.pharmalink.api.modelo.Sessao;
import br.com.pharmalink.api.modelo.enums.Grupo;
import br.com.pharmalink.api.service.UsuarioServico;
import br.com.pharmalink.api.service.ProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TelaLogado {

    @Autowired
    private Scan sc;
    @Autowired
    private Sessao sessao;
    @Autowired
    private LoginUsuario loginUsuario;
    @Autowired
    private UsuarioServico usuarioServico;
    @Autowired
    private ProdutoServico produtoServico;



    public void mostrarMenu() {

        int escolha = getEscolha();

        switch (escolha) {
            case 0 -> {
                sc.mensagem("Sem permissão.");
                sessao.encerrarSessao();
                System.exit(0);

            }
            case 1 -> {
                // Chamar API ListarProdutos

                produtoServico.listarTodosProdutos();

            }
            case 2 -> {
                // Chamar API ListarUsuarios

                usuarioServico.listarTodosUsuarios();

            }
        }

    }

    private int getEscolha(){

        Grupo grupo = sessao.getGrupo();

        if (grupo.equals(Grupo.ADMINISTRADOR)){
            return menuAdministrador();

        } else if (grupo.equals(Grupo.ESTOQUISTA)) {
            return menuEstoquista();

        } else {
            return 0;
        }
    }

    private void menuLogado(){
        sc.limpar();
        sc.mensagem("\nBem vindo à Área Logada!");
        sc.mensagem("\nQual opção deseja acessar?");
        sc.mensagem("1- Listar Produtos");
    }

    private int menuEstoquista(){
        menuLogado();
        return sc.getInt();

    }

    private int menuAdministrador(){
        menuLogado();
        sc.mensagem("2- Listar Usuários");
        return sc.getInt();

    }

}
