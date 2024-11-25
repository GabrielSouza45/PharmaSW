package br.com.pharmasw.api.servico.backoffice;

import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoCardDTO;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.ImagemProdutoRepositorio;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImagemProdutoServico {

    @Autowired
    private ImagemProdutoRepositorio imagemProdutoRepositorio;

    private static final String PASTA_IMAGEM = "uploads/imagens/produtos/";

    // LISTAR IMAGENS
    public ResponseEntity<?> listarImagensProduto(Produto produto) {
        List<ImagemProduto> imagens = imagemProdutoRepositorio.findByProdutoIdOrderByPrincipalDesc(produto.getId());

        for (ImagemProduto imagem : imagens) {
            String caminhoImagem = imagem.getCaminho();

            try {

                byte[] conteudoImagem = getConteudoImagem(caminhoImagem);
                imagem.setImagem(conteudoImagem);

            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseBuilder().build("Erro ao carregar byte da imagem.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return ResponseEntity.ok(imagens);
    }

    public List<ProdutoCardDTO> getImagensCardDTO(List<ProdutoDTO> produtosDTO) {
        List<ProdutoCardDTO> produtosCardDTO = new ArrayList<>();

        produtosDTO.forEach(prod -> {
            ImagemProduto imagemProduto =
                    imagemProdutoRepositorio.findByProdutoIdAndPrincipal(prod.id(), true);

            byte[] img = null;
            if (imagemProduto != null) {
                try {
                    // Pega o conteudo da imagem em Base64
                    img = this.getConteudoImagem(imagemProduto.getCaminho());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
            produtosCardDTO.add(new ProdutoCardDTO(img, prod));
        });

        return produtosCardDTO;
    }

    public List<byte[]> getImagensPorIdProduto(Long idProduto) {
        List<byte[]> imagens = new ArrayList<>();

        List<ImagemProduto> imagensProd =
                imagemProdutoRepositorio.findByProdutoIdOrderByPrincipalDesc(idProduto);
        if (imagensProd != null) {
            imagensProd.forEach(img -> {
                try {
                    imagens.add(this.getConteudoImagem(img.getCaminho()));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }

        return imagens;
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
            imagemProduto.setNomeOriginal(imagem.getOriginalFilename());
            imagemProduto.setPrincipal(produtoSalvo.getImagemPrincipal().equals(imagem.getOriginalFilename()));
            imagemProduto.setProduto(produtoSalvo);
            imagemProduto.setStatus(Status.ATIVO);

            imagemProdutoRepositorio.save(imagemProduto);
        }

    }

    //alterar imagem produto
    public void alterar(Produto produto, ImagemProduto[] imagemProdutos) {


        for (ImagemProduto imagem : imagemProdutos) {
            ImagemProduto imagemProduto = imagemProdutoRepositorio.findById(imagem.getId()).orElse(null);
            if (imagemProduto == null) {
                continue;
            }
            if (!produto.getImagemPrincipal().isBlank()) {
                imagemProduto.setPrincipal(produto.getImagemPrincipal().equals(imagem.getNomeOriginal()));
            }
            imagemProdutoRepositorio.save(imagemProduto);

        }

    }

    //excluir imeagem ndo carrossel
    public ResponseEntity<?> excluirImagem(Long imagemId) {
        // Busca a imagem no banco de dados pelo ID
        ImagemProduto imagem = imagemProdutoRepositorio.findById(imagemId).orElse(null);

        if (imagem == null) {
            return new ResponseBuilder().build("Imagem não encontrada!", HttpStatus.NOT_FOUND);
        }

        // Caminho da imagem no sistema de arquivos
        String caminhoImagem = imagem.getCaminho(); // atributo que guarda o caminho do arquivo
        Path caminho = Paths.get(caminhoImagem);

        try {
            // Exclui a imagem da pasta se o arquivo existir
            if (Files.exists(caminho)) {
                Files.delete(caminho);
            } else {
                return new ResponseBuilder().build("Arquivo de imagem não encontrado no sistema de arquivos!", HttpStatus.NOT_FOUND);
            }

            // Exclui a imagem do banco de dados
            imagemProdutoRepositorio.delete(imagem);

            return new ResponseBuilder().build("Imagem excluída com sucesso!", HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseBuilder().build("Erro ao excluir a imagem no sistema de arquivos!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private byte[] getConteudoImagem(String caminhoImagem) throws IOException {
        Path caminho = Paths.get(caminhoImagem);
        return Files.readAllBytes(caminho);
    }


    public void cadastrarPadrao(Produto produtoSalvo) throws IOException {

        // Caminho da pasta onde as imagens estão localizadas no seu projeto
        Path pastaImagensOriginais = Paths.get("uploads_imgs_banner/" + produtoSalvo.getNome()); // Caminho da pasta com as imagens originais

        // Pasta onde as imagens serão copiadas para salvar as imagens no projeto
        Path pastaProduto = Paths.get(PASTA_IMAGEM + produtoSalvo.getId());
        Files.createDirectories(pastaProduto); // Cria o diretório do produto, caso não exista

        // Obtendo todos os arquivos na pasta de imagens originais
        Files.walkFileTree(pastaImagensOriginais, new SimpleFileVisitor<>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                // Verifica se o arquivo é uma imagem
                if (file.toString().endsWith(".jpg") || file.toString().endsWith(".png") || file.toString().endsWith(".webp")) {
                    String nomeImagem = UUID.randomUUID().toString() + ".jpg";  // Renomeia a imagem com UUID
                    Path caminhoImagem = pastaProduto.resolve(nomeImagem);  // Caminho final para salvar a imagem no diretório do produto

                    // Copia o arquivo da pasta original para o diretório do produto
                    Files.copy(file, caminhoImagem, StandardCopyOption.REPLACE_EXISTING);

                    // Cria um novo objeto ImagemProduto
                    ImagemProduto imagemProduto = new ImagemProduto();
                    imagemProduto.setCaminho(caminhoImagem.toString());
                    imagemProduto.setNomeOriginal(file.getFileName().toString()); // Obtém o nome original da imagem
                    imagemProduto.setPrincipal(produtoSalvo.getImagemPrincipal().equals(file.getFileName().toString()));
                    imagemProduto.setProduto(produtoSalvo);
                    imagemProduto.setStatus(Status.ATIVO);

                    // Salva a imagem no repositório
                    imagemProdutoRepositorio.save(imagemProduto);
                }
                return FileVisitResult.CONTINUE;
            }
        });
    }
}
