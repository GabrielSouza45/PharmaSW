package br.com.pharmasw.api.service.site.Interfaces;

import br.com.pharmasw.api.model.ViaCepEndereco;

public interface IViaCepAPI {

    public ViaCepEndereco consultar(String cep);
}
