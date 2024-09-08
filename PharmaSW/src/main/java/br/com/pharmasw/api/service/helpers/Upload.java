package br.com.pharmasw.api.service.helpers;

import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

public class Upload {
    public static boolean uploadImagem (MultipartFile imagem){
        boolean sucesso = false;

        if (imagem.isEmpty()){
            String imagemArquivo = imagem.getOriginalFilename();
            try {
                //criando diretorio da imagem
                String pastaImagem = "C:\\Users\\ns480\\Desktop\\PharmaSW\\pharmasw-front\\src\\assets\\images";
                File dir = new File(pastaImagem);
                if(!dir.exists()){
                    dir.mkdirs();
                }

                //criando o arquivo no diretorio
                File serverFile = new File(dir.getAbsoluteFile() + File.separator
                + imagemArquivo);

                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(imagem.getBytes());

                System.out.println("Armazenado em: " + serverFile.getAbsolutePath());
                System.out.println("Você fez o upload do arquivo: " + imagemArquivo + " com sucesso!");
            }catch (Exception e){
                e.getMessage();
            }
        }
        return sucesso;
    }
}
