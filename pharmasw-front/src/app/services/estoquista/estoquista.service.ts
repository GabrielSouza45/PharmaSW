import { from, Observable } from "rxjs";
import { Pedido } from "../../modelo/Pedido";
import { CrudService } from "../crud-service/crud-service.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { CarrinhoService } from "../carrinho/carrinho.service";
import { AuthService } from "../../infra/auth/auth.service";
import { EnderecoService } from "../endereco/endereco.service";
import { MetodosPagamentoService } from "../metodos-pagamento/metodos-pagamento.service";
import { Router } from "@angular/router";
import { StateService } from "../state-share/state.service";

@Injectable({
  providedIn: 'root'
})
export class EstoquistaService extends CrudService<Pedido>{

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private carrinhoService: CarrinhoService,
    private auth: AuthService,
    private enderecoService: EnderecoService,
    private metodosPagamentoService: MetodosPagamentoService,
    private router: Router,
    private stateService: StateService
  ) {
      super(http, '/pedido-estoquista-controle', toastr);
  }

  listarTodos(): Observable<Pedido[]> {
    return this.listarGet(`/listar-todos`);
  }
}
