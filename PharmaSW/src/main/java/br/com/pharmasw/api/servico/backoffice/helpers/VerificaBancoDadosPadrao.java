package br.com.pharmasw.api.servico.backoffice.helpers;

import br.com.pharmasw.api.modelo.MetodosPagamento;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Usuario;
import br.com.pharmasw.api.modelo.enums.Grupo;
import br.com.pharmasw.api.modelo.enums.MetodoPagamento;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.MetodosPagamentoRepositorio;
import br.com.pharmasw.api.repositorio.ProdutoRepositorio;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import br.com.pharmasw.api.servico.backoffice.ImagemProdutoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class VerificaBancoDadosPadrao implements CommandLineRunner {


    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private MetodosPagamentoRepositorio metodosPagamentoRepositorio;
    @Autowired
    private ImagemProdutoServico imagemProdutoServico;

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

        List<MetodosPagamento> pagamento = metodosPagamentoRepositorio.findAll();
        if (pagamento.isEmpty()) {
            criaMetodosPagamento();
        }

        criaProdutosPadrao();
    }

    private void criaMetodosPagamento() {
        MetodosPagamento metodo1 = new MetodosPagamento(MetodoPagamento.PIX);
        MetodosPagamento metodo2 = new MetodosPagamento(MetodoPagamento.CARTAO);

        metodosPagamentoRepositorio.save(metodo1);
        metodosPagamentoRepositorio.save(metodo2);
    }

    private void criaAdministradorPadrao() {
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


    private void criaProdutosPadrao() throws IOException {
        boolean exist = produtoRepositorio.existsByNome("Roxx Energy");
        if (!exist){
            Produto produto = new Produto();
            produto.setNome("Roxx Energy");
            produto.setCategoria("Suplementos");
            produto.setPeso(280.0);
            produto.setValor(99.0);
            produto.setFabricante("Roxx");
            produto.setQuantidadeEstoque(10);
            produto.setImagemPrincipal("roxx1.jpg");
            produto.setStatus(Status.ATIVO);
            produto.setAvaliacao(5.0);
            produto.setDescricao("Suplemento energético");
            Produto prod = produtoRepositorio.save(produto);
            imagemProdutoServico.cadastrarPadrao(prod);
            System.out.println("Produto - Roxx criado");
        }

        exist = produtoRepositorio.existsByNome("Darrow Actine");
        if (!exist){
            Produto produto = new Produto();
            produto.setNome("Darrow Actine");
            produto.setCategoria("Creme");
            produto.setPeso(60.0);
            produto.setValor(35.0);
            produto.setFabricante("Darrow");
            produto.setQuantidadeEstoque(15);
            produto.setImagemPrincipal("darrow1.jpg");
            produto.setAvaliacao(5.0);
            produto.setStatus(Status.ATIVO);
            produto.setDescricao("Creme anti-sinais");
            Produto prod = produtoRepositorio.save(produto);
            imagemProdutoServico.cadastrarPadrao(prod);
            System.out.println("Produto - Darrow criado");
        }

        exist = produtoRepositorio.existsByNome("Huggies Supreme Care");
        if (!exist){
            Produto produto = new Produto();
            produto.setNome("Huggies Supreme Care");
            produto.setCategoria("Fraudas");
            produto.setPeso(0.0);
            produto.setValor(199.99);
            produto.setFabricante("Huggies");
            produto.setQuantidadeEstoque(50);
            produto.setImagemPrincipal("huggies1.webp");
            produto.setStatus(Status.ATIVO);
            produto.setAvaliacao(5.0);
            produto.setDescricao("Pacote com 160 fraudas");
            Produto prod = produtoRepositorio.save(produto);
            imagemProdutoServico.cadastrarPadrao(prod);
            System.out.println("Produto - Huggies criado");
        }

        exist = produtoRepositorio.existsByNome("Neosaldina");
        if (!exist){
            Produto produto = new Produto();
            produto.setNome("Neosaldina");
            produto.setCategoria("Comprimidos");
            produto.setPeso(0.0);
            produto.setValor(35.0);
            produto.setFabricante("Neosaldina");
            produto.setQuantidadeEstoque(50);
            produto.setImagemPrincipal("neosaldina1.webp");
            produto.setStatus(Status.ATIVO);
            produto.setAvaliacao(5.0);
            produto.setDescricao("Pacote com 20 Drágeas");
            Produto prod = produtoRepositorio.save(produto);
            imagemProdutoServico.cadastrarPadrao(prod);
            System.out.println("Produto - Neosaldina criado");
        }

        exist = produtoRepositorio.existsByNome("Novalgina");
        if (!exist){
            Produto produto = new Produto();
            produto.setNome("Novalgina");
            produto.setCategoria("Comprimidos");
            produto.setPeso(0.0);
            produto.setValor(14.99);
            produto.setFabricante("Neosaldina");
            produto.setQuantidadeEstoque(50);
            produto.setImagemPrincipal("novalgina1.png");
            produto.setStatus(Status.ATIVO);
            produto.setAvaliacao(5.0);
            produto.setDescricao("Pacote com 20 comprimidos");
            Produto prod = produtoRepositorio.save(produto);
            imagemProdutoServico.cadastrarPadrao(prod);
            System.out.println("Produto - Novalgina criado");
        }

        exist = produtoRepositorio.existsByNome("Shampoo Clear Men Sports - CR7");
        if (!exist){
            Produto produto = new Produto();
            produto.setNome("Shampoo Clear Men Sports - CR7");
            produto.setCategoria("Shampoo");
            produto.setPeso(400d);
            produto.setValor(14.90);
            produto.setFabricante("Clean Men");
            produto.setQuantidadeEstoque(50);
            produto.setImagemPrincipal("clear-men1.jpg");
            produto.setStatus(Status.ATIVO);
            produto.setAvaliacao(5.0);
            produto.setDescricao("Anti caspas");
            Produto prod = produtoRepositorio.save(produto);
            imagemProdutoServico.cadastrarPadrao(prod);
            System.out.println("Produto - Shampoo Clear Men Sports - CR7 criado");
        }

    }

}
