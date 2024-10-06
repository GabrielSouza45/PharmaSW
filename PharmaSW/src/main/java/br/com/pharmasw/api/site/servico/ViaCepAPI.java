package br.com.pharmasw.api.site.servico;

import br.com.pharmasw.api.modelo.Endereco;
import br.com.pharmasw.api.modelo.ViaCepEndereco;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ViaCepAPI {

    public static ViaCepEndereco consultar(String cep){
        if (cep.isBlank())
            return null;

        final String URL = "https://viacep.com.br/ws/"+cep+"/json/";

        ViaCepEndereco endereco = null;
        Gson gson = new Gson();

        try {
            HttpClient client = HttpClient.newHttpClient();

            // Criação da requisição
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(URL))
                    .GET()
                    .build();

            // Envio da requisição e obtenção da resposta
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();

            // Verifica se não houve erro na consulta
            if (response.statusCode() == 200) {
                JsonObject json = JsonParser.parseString(responseBody).getAsJsonObject();

                if (json.has("erro")) {
                    return null;
                } else {
                    endereco = gson.fromJson(responseBody, ViaCepEndereco.class);
                    return endereco;
                }
            } else {
                System.out.println("Erro na consulta: " + response.statusCode());
            }

        } catch (IOException | InterruptedException e ){
            System.out.println("Erro ao consultar CEP, " + e);
        }

        return null;
    }
}
