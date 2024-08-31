package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.Grupo;

public class UsuarioRetorno {

    private String nome;
    private String email;
    private Grupo grupo;

    public UsuarioRetorno(String nome, String email, Grupo grupo) {
        this.nome = nome;
        this.email = email;
        this.grupo = grupo;
    }


}
