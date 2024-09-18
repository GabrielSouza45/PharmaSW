package br.com.pharmasw.api.servico;

import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ImagemProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class ImagemProdutoServico {

    @Autowired
    private ImagemProdutoRepositorio imagemProdutoRepositorio;

    private static final String PASTA_IMAGEM = "uploads/imagens/produtos/";

    // LISTAR IMAGENS
    public ResponseEntity<?> listarImagensProduto(Produto produto) {
        System.out.println("Entrou acola");

        List<ImagemProduto> imagens = imagemProdutoRepositorio.findByProdutoId(produto.getId());

        for (ImagemProduto imagem : imagens) {
            String caminhoImagem = imagem.getCaminho();

            try {

                byte[] conteudoImagem = getConteudoImagem(caminhoImagem);
                imagem.setImagem(conteudoImagem);

            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("Erro ao carregar byte da imagem.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return ResponseEntity.ok(imagens);
    }


    // CADASTRAR IMAGENS PRODUTOS
    public void cadastrar(Produto produtoSalvo, List<MultipartFile> imagens) throws IOException {

        Path pastaProduto = Paths.get(PASTA_IMAGEM + produtoSalvo.getId());
        Files.createDirectories(pastaProduto);

        for (MultipartFile imagem : imagens) {
            String nomeImagem = UUID.randomUUID().toString() + ".jpg";
            Path caminhoImagem = pastaProduto.resolve(nomeImagem);

            Files.copy(imagem.getInputStream(), caminhoImagem, StandardCopyOption.REPLACE_EXISTING);

            ImagemProduto imagemProduto = new ImagemProduto();
            imagemProduto.setCaminho(caminhoImagem.toString());
            imagemProduto.setPrincipal(produtoSalvo.getImagemPrincipal().equals(imagem.getOriginalFilename()));
            imagemProduto.setProduto(produtoSalvo);
            imagemProduto.setStatus(Status.ATIVO);

            imagemProdutoRepositorio.save(imagemProduto);
        }

    }

    //método para excluir imagem na pasta e no banco de dados
    public ResponseEntity<?> excluirImagem(Long imagemId) {

        // Busca a imagem no banco de dados pelo ID
        ImagemProduto imagem = imagemProdutoRepositorio.findById(imagemId).orElse(null);

        if (imagem == null) {
            return new ResponseEntity<>("Imagem não encontrada!", HttpStatus.NOT_FOUND);
        }

        // Caminho da imagem no sistema de arquivos
        String caminhoImagem = imagem.getCaminho();
        Path caminho = Paths.get(caminhoImagem);

        try {
            // Exclui a imagem da pasta se o arquivo existir
            if (Files.exists(caminho)) {
                Files.delete(caminho);
            } else {
                return new ResponseEntity<>("Arquivo de imagem não encontrado no sistema de arquivos!", HttpStatus.NOT_FOUND);
            }

            // Exclui a imagem do banco de dados
            imagemProdutoRepositorio.delete(imagem);

            return new ResponseEntity<>("Imagem excluída com sucesso!", HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao excluir a imagem no sistema de arquivos!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Método para alterar o status da imagem entre ATIVO e INATIVO
    public ResponseEntity<?> alterarStatusImagem(Long imagemId) {

        // Busca a imagem no banco de dados pelo ID
        ImagemProduto imagem = imagemProdutoRepositorio.findById(imagemId).orElse(null);

        if (imagem == null) {
            return new ResponseEntity<>("Imagem não encontrada!", HttpStatus.NOT_FOUND);
        }

        // Verifica o status atual e alterna
        if (imagem.getStatus() == Status.ATIVO) {
            imagem.setStatus(Status.INATIVO); // Desativa se estiver ativo
        } else {
            imagem.setStatus(Status.ATIVO); // Ativa se estiver inativo
        }

        // Atualiza o status no banco de dados
        imagemProdutoRepositorio.save(imagem);

        return new ResponseEntity<>("Status da imagem alterado com sucesso!", HttpStatus.OK);
    }



    private byte[] getConteudoImagem(String caminhoImagem) throws IOException {
        Path caminho = Paths.get(caminhoImagem);
        return Files.readAllBytes(caminho);
    }
}
