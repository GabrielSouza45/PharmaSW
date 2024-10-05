package br.com.pharmasw.api.modelo;

import lombok.Data;

public class Cliente {
    private String email;
    private String cpf;
    private String enderecoPagamento;
    private String [] enderecoEntrega;
    private String nome;
    private Data dataNascimento;
    private String genero;
    private String senha;
}
