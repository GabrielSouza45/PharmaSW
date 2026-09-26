package br.com.pharmasw.api.service.backoffice.interfaces;

import br.com.pharmasw.api.model.ImagemProduto;
import br.com.pharmasw.api.model.Produto;
import br.com.pharmasw.api.model.dto.ProdutoCardDTO;
import br.com.pharmasw.api.model.dto.ProdutoDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IImagemProdutoServico {

    public ResponseEntity<?> listarImagensProduto(Produto produto);

    public List<ProdutoCardDTO> getImagensCardDTO(List<ProdutoDTO> produtosDTO);

    public List<byte[]> getImagensPorIdProduto(Long idProduto);

    public void cadastrar(Produto produtoSalvo, List<MultipartFile> imagens);

    public void alterar(Produto produto, ImagemProduto[] imagemProdutos);

    public ResponseEntity<?> excluirImagem(Long imagemId);
}
