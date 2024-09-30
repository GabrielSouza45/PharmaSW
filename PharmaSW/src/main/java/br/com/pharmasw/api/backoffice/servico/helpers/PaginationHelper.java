package br.com.pharmasw.api.backoffice.servico.helpers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaginationHelper<T> {
    public final int TAMANHO = 10;

    public int getOffet(int page){
        return page * TAMANHO;
    }

    public Page<T> transformarEmPage(List<T> itens, int page, long total) {
        return new PageImpl<>(itens, this.getPageable(page), total);
    }

    private Pageable getPageable(int page){
        int pagina = page;

        return PageRequest.of(pagina, TAMANHO);
    }

}
