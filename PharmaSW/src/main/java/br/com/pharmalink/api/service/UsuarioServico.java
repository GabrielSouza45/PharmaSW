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

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private Sessao sessao;

    //lista todos os usuários
    public Iterable<Usuario> listar(){
        return usuarioRepositorio.findAll();
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

        if(admin.getEmail().equals("")){
            //colocar para validar se ja existe email
            // colocar para validar sem tem @ e .com
        }else if(admin.getCpf() == 0){
            // validar se tem 11 digitos e se sao so numero, caso nao seja, fazer conversao de String para long
        } else {
        }
}

    private ResponseEntity<?> validarEmail(String email) {

        Scan scan = new Scan();

        Usuario usuario = null;
        // Verificar formato do email
        Pattern pattern = null;
        if (!pattern.matcher(email).matches()) {
            return new ResponseEntity<>("Email inválido! Precisa conter '@' e '.com'", HttpStatus.BAD_REQUEST);
        }
        // Verificar se o email já está em uso
        else if (usuario.getEmail().equals(email)) {
            scan.mensagem("O email já está em uso.");
        }
        return null;
    }
    //Método de validação das condições necessárias para ter o "@" e ".com"
    private boolean isValidEmail(String email) {
        String emailRegex = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }
}