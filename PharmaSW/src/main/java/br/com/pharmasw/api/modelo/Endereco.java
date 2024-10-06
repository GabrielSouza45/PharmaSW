package br.com.pharmasw.api.modelo;

import br.com.pharmasw.api.modelo.enums.TipoEndereco;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity(name = "enderecos")
@Table(name = "enderecos")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Transient
    private Long idClienteCadastro;

    @NotBlank(message = "CEP é obrigatório")
    private String cep;
    private String logradouro;

    @NotBlank(message = "Número é obrigatório")
    private String numero;

    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private boolean padrao;

    @NotNull(message = "Tipo de endereço é obrigatório")
    @Enumerated(EnumType.STRING)
    private TipoEndereco tipoEndereco;


    public Endereco() {
    }

    public Endereco(ViaCepEndereco apiEndereco) {
        this.logradouro = apiEndereco.getLogradouro();
        this.bairro = apiEndereco.getBairro();
        this.cidade = apiEndereco.getLocalidade();
        this.uf = apiEndereco.getUf();
    }


    public Long getId() {
        return id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Long getIdClienteCadastro() {
        return idClienteCadastro;
    }

    public void setIdClienteCadastro(Long idClienteCadastro) {
        this.idClienteCadastro = idClienteCadastro;
    }

    public @NotBlank(message = "CEP é obrigatório") String getCep() {
        return cep;
    }

    public void setCep(@NotBlank(message = "CEP é obrigatório") String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public @NotBlank(message = "Número é obrigatório") String getNumero() {
        return numero;
    }

    public void setNumero(@NotBlank(message = "Número é obrigatório") String numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public boolean isPadrao() {
        return padrao;
    }

    public void setPadrao(boolean padrao) {
        this.padrao = padrao;
    }

    public @NotNull(message = "Tipo de endereço é obrigatório") TipoEndereco getTipoEndereco() {
        return tipoEndereco;
    }

    public void setTipoEndereco(@NotNull(message = "Tipo de endereço é obrigatório") TipoEndereco tipoEndereco) {
        this.tipoEndereco = tipoEndereco;
    }
}
