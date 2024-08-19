package br.com.pharmalink.api.backoffice;

import br.com.pharmalink.api.helpers.Scan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TelaLogado {

    @Autowired
    private Scan sc;


    private void menuLogado(){
        sc.mensagem("Bem vindo à Área Logada!");

    }

    public void menu(){
        menuLogado();

    }

    public void menuAdministrador(){
        menuLogado();

    }

}
