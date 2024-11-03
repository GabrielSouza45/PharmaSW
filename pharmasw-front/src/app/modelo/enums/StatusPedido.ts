export enum StatusPedido {
  AGUARDANDO_PAGAMENTO = "AGUARDANDO_PAGAMENTO",
  PAGAMENTO_REJEITADO = "PAGAMENTO_REJEITADO",
  PAGAMENTO_COM_SUCESSO = "PAGAMENTO_COM_SUCESSO",
  AGUARDANDO_RETIRADA = "AGUARDANDO_RETIRADA",
  EM_TRANSITO = "EM_TRANSITO",
  ENTREGUE = "ENTREGUE"
}

// Mapeamento de descrições
export const StatusPedidoDescricao = {
  [StatusPedido.AGUARDANDO_PAGAMENTO]: "Aguardando Pagamento",
  [StatusPedido.PAGAMENTO_REJEITADO]: "Pagamento Rejeitado",
  [StatusPedido.PAGAMENTO_COM_SUCESSO]: "Pagamento com Sucesso",
  [StatusPedido.AGUARDANDO_RETIRADA]: "Aguardando Retirada",
  [StatusPedido.EM_TRANSITO]: "Em Trânsito",
  [StatusPedido.ENTREGUE]: "Entregue",
};
