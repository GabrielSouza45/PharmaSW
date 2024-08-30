package br.com.pharmasw.api.modelo.enums;

public enum Grupo {
    ADMINISTRADOR("admin"),
    ESTOQUISTA("estoque");

    private String grupo;

    Grupo(String grupo){
        this.grupo= grupo;
    }

    public String getGrupo() {
        return grupo;
    }
}
