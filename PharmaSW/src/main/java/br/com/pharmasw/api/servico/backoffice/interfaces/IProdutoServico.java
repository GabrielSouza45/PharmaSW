package br.com.pharmasw.api.servico.backoffice.interfaces;

import br.com.pharmasw.api.modelo.Filtros;
import br.com.pharmasw.api.modelo.ImagemProduto;
import br.com.pharmasw.api.modelo.Produto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProdutoServico {

    public ResponseEntity<?> listarProdutosPagination(Filtros filtros);

    public ResponseEntity<?> listarProdutos(Filtros filtros);

    public ResponseEntity<?> cadastrarProduto(Produto produto, List<MultipartFile> imagens);

    public ResponseEntity<?> alterarStatusProduto(Produto produtorequest);

    public ResponseEntity<?> alterarQuantidade(Produto produtoRequest);

    public ResponseEntity<?> alterarProduto(Produto produtoRequest, ImagemProduto[] imagemProduto, List<MultipartFile> imagens);


}
