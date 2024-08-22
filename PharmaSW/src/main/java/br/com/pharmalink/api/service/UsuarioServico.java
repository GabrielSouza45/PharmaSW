package br.com.pharmalink.api.service;

import br.com.pharmalink.api.helpers.Scan;
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

    //lista todos os usuários
    public Iterable<Usuario> listar(){
        return us.findAll();
    }


    public ResponseEntity<?> cadastrar(Usuario admin){
        Scan rm = new Scan();
        if(admin.getEmail().equals("")){
            rm.mensagem("O email usuário é obrigatório");
            return new ResponseEntity<UsuarioRepositorio>((UsuarioRepositorio) rm, HttpStatus.BAD_REQUEST);
        }else if(admin.getCpf() == null){
            rm.mensagem("O cpf é obrigatório");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(us.save(admin), HttpStatus.CREATED);
        }
}
}