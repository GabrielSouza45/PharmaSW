package br.com.pharmasw.api.servico.site.Interfaces;

import br.com.pharmasw.api.modelo.ViaCepEndereco;

public interface IViaCepAPI {

    public ViaCepEndereco consultar(String cep);
}
