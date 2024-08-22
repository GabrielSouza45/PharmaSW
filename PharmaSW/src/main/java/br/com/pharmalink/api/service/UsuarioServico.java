package br.com.pharmalink.api.service;

import org.springframework.beans.factory.annotation.Autowired;
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
    
}