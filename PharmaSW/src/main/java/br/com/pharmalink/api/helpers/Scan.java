package br.com.pharmalink.api.helpers;

import java.util.Scanner;

public class Scan {

    private Scanner sc = new Scanner(System.in);

    public void mensagem(String msg) {
        System.out.println(msg);
    }

    public String getString(String msg){
        mensagem(msg);
        return sc.nextLine();
    }

    public int getInt(String msg){
        mensagem(msg);
        int retorno =  sc.nextInt();
        sc.next();
        return retorno;
    }
}
