package br.com.pharmasw.api.servico.site;

import br.com.pharmasw.api.modelo.*;
import br.com.pharmasw.api.modelo.enums.MetodoPagamento;
import br.com.pharmasw.api.modelo.enums.StatusPedido;
import br.com.pharmasw.api.repositorio.*;
import br.com.pharmasw.api.servico.backoffice.helpers.DataHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
            return new ResponseEntity<>("Cliente não encontrado.", HttpStatus.NOT_FOUND);

        Endereco endereco = enderecoRepositorio.findById(pedido.getIdEndereco()).orElse(null);
        if (endereco == null)
            return new ResponseEntity<>("Endereço não encontrado.", HttpStatus.NOT_FOUND);

        MetodosPagamento pagamento = metodosPagamentoRepositorio.findById(pedido.getIdMetodoPagamento()).orElse(null);
        if (pagamento == null)
            return new ResponseEntity<>("Método de pagamento não encontrado.", HttpStatus.NOT_FOUND);

        pedido.setCliente(cliente);
        pedido.setEndereco(endereco);
        pedido.setStatusPedido(StatusPedido.AGUARDANDO_PAGAMENTO);
        pedido.setDataCompra(LocalDate.now());
        pedido.setMetodosPagamento(pagamento);

        String erroItem = setaItemPedido(pedido);
        if (!erroItem.isEmpty())
            return new ResponseEntity<>(erroItem, HttpStatus.BAD_REQUEST);

        String erroValor = validaValoresCompra(pedido);
        if (!erroValor.isEmpty())
            return new ResponseEntity<>(erroValor, HttpStatus.BAD_REQUEST);

        pedidoRepositorio.save(pedido);

        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    private String validaValoresCompra(Pedido pedido) {

        final double TOTAL = pedido.getTotal();
        final double SUB_TOTAL = pedido.getSubTotal();
        final double FRETE = pedido.getFrete();

        List<ItemPedido> itemsPedido = pedido.getItemsPedido();
        double valorFinalProdutos = 0d;

        for (ItemPedido item : itemsPedido) {
            valorFinalProdutos += item.getProduto().getValor();
        }

        if (valorFinalProdutos != SUB_TOTAL)
            return "Valor total dos produtos é diferente do valor informado.";

        double valorTotalComFrete = valorFinalProdutos + FRETE;
        if (valorTotalComFrete != TOTAL)
            return "Valor total da compra é diferente do valor informado.";


        return "";
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
}
