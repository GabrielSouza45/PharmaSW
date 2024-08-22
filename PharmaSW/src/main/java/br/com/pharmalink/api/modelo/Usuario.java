package br.com.pharmalink.api.modelo;

import br.com.pharmalink.api.modelo.enums.Status;
import br.com.pharmalink.api.modelo.enums.Grupo;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "usuario")
public class Usuario {

    //ATRIBUTOS PADRÃO
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Date dataIni;
    private Date dataAlt;
    private Date dataFim;

    private String nome;
    private String email;
    private String senha;
    private Long cpf;

    @Enumerated(EnumType.STRING)
    private Grupo grupo;


    public Usuario() {

    }


    public Long getId() {
        return id;
    }

//    public void setId(Long id) {
//        this.id = id;
//    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getDataIni() {
        return dataIni;
    }

    public void setDataIni(Date dataIni) {
        this.dataIni = dataIni;
    }

    public Date getDataAlt() {
        return dataAlt;
    }

    public void setDataAlt(Date dataAlt) {
        this.dataAlt = dataAlt;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public Long getCpf() { return cpf;}

    public void setCpf(Long cpf) { this.cpf = cpf;}
}
