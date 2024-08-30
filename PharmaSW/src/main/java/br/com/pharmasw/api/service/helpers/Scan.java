package br.com.pharmasw.api.service.helpers;

import org.springframework.stereotype.Service;

import java.util.Scanner;

@Service
public class Scan {

    private Scanner sc = new Scanner(System.in);

    public void mensagem(String msg) {
        System.out.println(msg);
    }

    public String getString(String msg){
        mensagem(msg);
        return sc.nextLine();
    }

    public String getString(){
        return sc.nextLine();
    }

    public int getInt(String msg){
        mensagem(msg);
        int retorno =  sc.nextInt();
        sc.next();
        return retorno;
    }

    public int getInt(){
        int retorno =  sc.nextInt();
        sc.next();
        return retorno;
    }

    public void limpar(){
        mensagem("\n\n\n\n\n\n");
    }
}
