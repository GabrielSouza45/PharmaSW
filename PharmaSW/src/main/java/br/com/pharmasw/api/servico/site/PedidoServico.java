package br.com.pharmasw.api.servico.site;

import br.com.pharmasw.api.modelo.*;
import br.com.pharmasw.api.modelo.Retorno.ClienteDTO;
import br.com.pharmasw.api.modelo.Retorno.PedidoDTO;
import br.com.pharmasw.api.modelo.enums.MetodoPagamento;
import br.com.pharmasw.api.modelo.enums.StatusPedido;
import br.com.pharmasw.api.repositorio.*;
import br.com.pharmasw.api.servico.backoffice.helpers.DataHelper;
import br.com.pharmasw.api.servico.responseBuilder.ResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.List;

@Service
public class PedidoServico {

    @Autowired
    private ClienteRepositorio clienteRepositorio;
    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private PedidoRepositorio pedidoRepositorio;
    @Autowired
    private EnderecoRepositorio enderecoRepositorio;
    @Autowired
    private MetodosPagamentoRepositorio metodosPagamentoRepositorio;

    public ResponseEntity<?> cadastrarPedido(Pedido pedido) {

        Cliente cliente = clienteRepositorio.findById(pedido.getIdCliente()).orElse(null);
        if (cliente == null)
            return new ResponseBuilder().build("Cliente não encontrado.", HttpStatus.NOT_FOUND);

        Endereco endereco = enderecoRepositorio.findById(pedido.getIdEndereco()).orElse(null);
        if (endereco == null)
            return new ResponseBuilder().build("Endereço não encontrado.", HttpStatus.NOT_FOUND);

        MetodosPagamento pagamento = metodosPagamentoRepositorio.findById(pedido.getIdMetodoPagamento()).orElse(null);
        if (pagamento == null)
            return new ResponseBuilder().build("Método de pagamento não encontrado.", HttpStatus.NOT_FOUND);

        pedido.setCliente(cliente);
        pedido.setEndereco(endereco);
        pedido.setStatusPedido(StatusPedido.AGUARDANDO_PAGAMENTO);
        pedido.setDataCompra(LocalDate.now());
        pedido.setMetodosPagamento(pagamento);

        String erroItem = setaItemPedido(pedido);
        if (!erroItem.isEmpty())
            return new ResponseBuilder().build(erroItem, HttpStatus.BAD_REQUEST);

        Pedido retorno = pedidoRepositorio.save(pedido);

        PedidoDTO dto = new PedidoDTO(retorno.getId(), retorno.getTotal(), retorno.getStatusPedido());
        return new ResponseBuilder().build(dto, HttpStatus.CREATED);

    }


    private String setaItemPedido(Pedido pedido) {

        String erro = "";

        List<ItemPedido> itemPedido = pedido.getItemsPedido();

        for (ItemPedido item : itemPedido) {

            Produto produto = produtoRepositorio.findById(item.getIdProduto()).orElse(null);
            if (produto == null) {
                erro = "Um dos produtos requisitados não existe.";
                break;
            }

            int quantidadeCompra = item.getQtdProdutos();
            if (quantidadeCompra > produto.getQuantidadeEstoque()) {
                erro = "Produto: " + produto.getNome() + " tem estoque de " + produto.getQuantidadeEstoque() + " unidades. \n Por favor, altere a quantidade de compra";
                break;
            }

            item.setProduto(produto);
            item.setValorUnitario(produto.getValor());
            item.setCodigoProduto(produto.getId().toString());

        }

        return erro;

    }

    public ResponseEntity<?> listarPorCliente(Long idCliente) {

        List<Pedido> pedidos = pedidoRepositorio.findAllByClienteIdOrderByIdDesc(idCliente);

        return new ResponseBuilder().build(pedidos, HttpStatus.OK);

    }


    public ResponseEntity<?> detalharPedido(Long idPedido) {
        Pedido pedido = pedidoRepositorio.findById(idPedido).orElse(null);
        return ResponseEntity.ok(pedido);
    }
}
