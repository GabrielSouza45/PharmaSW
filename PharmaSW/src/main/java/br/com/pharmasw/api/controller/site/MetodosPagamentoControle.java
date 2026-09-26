package br.com.pharmasw.api.controller.site;

import br.com.pharmasw.api.service.site.MetodosPagamentoService;
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
