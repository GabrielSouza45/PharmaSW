package br.com.pharmalink.api.service;

import br.com.pharmalink.api.helpers.DataHelper;
import br.com.pharmalink.api.helpers.Scan;
import br.com.pharmalink.api.modelo.Sessao;
import br.com.pharmalink.api.modelo.enums.Grupo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.pharmalink.api.modelo.Usuario;
import br.com.pharmalink.api.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio us;

    @Autowired
    private Sessao sessao;

    //lista todos os usuários
    public Iterable<Usuario> listar(){
        return us.findAll();
    }


    public void cadastrar(Usuario admin){

        if (sessao.getGrupo().equals(Grupo.ESTOQUISTA)){
            return;
        }

        DataHelper.getDataHora();
        //colocar o DataHelper dentro do DataIni la do usuario
        //nao permitir cadastro de email 2x
        //nao permitir cadastro de cpf 2x
        //cadastrar o grupo do usuario
        //fazer cada metodo de validacao separado
        // criar um metodo de cadastrar e a cada cadastro ja validar.
        //fazer em um laco de repeticao
        //validar a senha 2x para ver se esta igual
        //colocar o setStatus automatico como ativo

        Scan rm = new Scan();
        if(admin.getEmail().equals("")){
            rm.mensagem("O email usuário é obrigatório");
            //colocar para validar se ja existe email
            // colocar para validar sem tem @ e .com
        }else if(admin.getCpf() == 0){
            rm.mensagem("O cpf é obrigatório");
            // validar se tem 11 digitos e se sao so numero, caso nao seja, fazer conversao de String para long
        } else {
        }
}
}