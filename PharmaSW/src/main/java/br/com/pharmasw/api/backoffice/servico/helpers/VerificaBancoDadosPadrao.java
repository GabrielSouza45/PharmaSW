package br.com.pharmasw.api.backoffice.servico.helpers;

import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Grupo;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class VerificaBancoDadosPadrao implements CommandLineRunner {


    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private ProdutoRepositorio produtoRepositorio;

    @Value("${USUARIO.EMAIL_PADRAO}")
    private String emailPadrao;
    @Value("${USUARIO.SENHA_PADRAO}")
    private String senhaPadrao;
    @Value("${USUARIO.NOME_PADRAO}")
    private String nomePadrao;

    private final String NOME_PRODUTO = "Ibuprofeno";
    private final String FABRICANTE_PRODUTO = "Fabricante Ficticio";
    private final String CATEGORIA_PRODUTO = "Febre e Dor";


    @Override
    public void run(String... args) throws Exception {
        Usuario usuario = usuarioRepositorio.findUsuarioByEmailAndStatus(emailPadrao, Status.ATIVO);
        if (usuario == null) {
            criaAdministradorPadrao();
            System.out.println("Primeiro usuário criado!");

        }

//        Produto produto = produtoRepositorio.findByNomeAndFabricanteAndStatus(NOME_PRODUTO, FABRICANTE_PRODUTO, Status.ATIVO);
//        if (produto == null) {
//            criaProdutoPadrao();
//            System.out.println("Primeiro produto criado!");
//
//        }
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


    private void criaProdutoPadrao(){
        Produto produto = new Produto();

        produto.setNome(NOME_PRODUTO);
        produto.setCategoria(CATEGORIA_PRODUTO);
        produto.setPeso(150.0);
        produto.setValor(25.0);
        produto.setFabricante(FABRICANTE_PRODUTO);
        produto.setQuantidadeEstoque(10);
        produto.setStatus(Status.ATIVO);

        produtoRepositorio.save(produto);
    }
    
}
