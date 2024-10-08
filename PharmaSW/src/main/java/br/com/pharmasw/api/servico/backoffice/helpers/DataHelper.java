package br.com.pharmasw.api.servico.backoffice.helpers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DataHelper {

    public static Date getDataHora(){

        try {
            Calendar calendar = Calendar.getInstance();
            Date data = calendar.getTime();

            SimpleDateFormat pattern = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dataFormatadaString = pattern.format(data);

            return pattern.parse(dataFormatadaString);

        } catch (ParseException e) {
            System.out.println("Erro ao formatar data - DataHelper.");
            e.getMessage();

            return null;
        }
    }

}
