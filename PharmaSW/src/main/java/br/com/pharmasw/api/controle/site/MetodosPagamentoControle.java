package br.com.pharmasw.api.controle.site;

import br.com.pharmasw.api.servico.site.MetodosPagamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/metodos-pagamento")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MetodosPagamentoControle {

    @Autowired
    private MetodosPagamentoService metodosService;

    @GetMapping("/get-metodos")
    public ResponseEntity<?> getMetodosPagamento(){
        return metodosService.getMetodosPagamento();
    }

}
