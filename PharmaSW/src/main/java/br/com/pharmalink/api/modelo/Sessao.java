package br.com.pharmalink.api.modelo;

import br.com.pharmalink.api.modelo.enums.Grupo;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton")
public class Sessao {
    private Usuario usuarioLogado;
    private Grupo grupo;

    public Usuario getUsuarioLogado() {
        return usuarioLogado;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setUsuarioLogado(Usuario usuario) {
        this.usuarioLogado = usuario;
        this.grupo = usuario.getGrupo();
    }

    public void encerrarSessao() {
        this.usuarioLogado = null;
        this.grupo = null;
    }
}
