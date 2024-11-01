package br.com.pharmasw.api.servico.backoffice.interfaces;

import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Produto;
import br.com.pharmasw.api.modelo.Retorno.ProdutoCardDTO;
import br.com.pharmasw.api.modelo.Retorno.ProdutoDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImagemProdutoServico {

    public final String PASTA_IMAGEM = "uploads/imagens/produtos/";

    public ResponseEntity<?> listarImagensProduto(Produto produto);

    public List<ProdutoCardDTO> getImagensCardDTO(List<ProdutoDTO> produtosDTO);

    public List<byte[]> getImagensPorIdProduto(Long idProduto);

    public void cadastrar(Produto produtoSalvo, List<MultipartFile> imagens);

    public void alterar(Produto produto, ImagemProduto[] imagemProdutos);

    public ResponseEntity<?> excluirImagem(Long imagemId);
}
