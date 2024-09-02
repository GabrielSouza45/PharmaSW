package br.com.pharmasw.api.infra.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;


@Component
public class RequestObserver implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Inicialização do filtro, se necessário
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);
        ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper((HttpServletResponse) response);

        // Continua a cadeia de filtros
        chain.doFilter(wrappedRequest, wrappedResponse);

        // Log do endpoint acessado
        String endpoint= wrappedRequest.getRequestURI();

        // Captura e log do corpo da requisição
        byte[] requestBody = wrappedRequest.getContentAsByteArray();
        if (requestBody.length > 0) {
            String requestBodyString = new String(requestBody, wrappedRequest.getCharacterEncoding());
            requestBodyString = requestBodyString.trim(); // Remove espaços no início e no fim
            requestBodyString = requestBodyString.replaceAll("\\s+", " "); // Remove quebras de linha e múltiplos espaços
            System.out.println(endpoint + " ==> " + requestBodyString);
        }

        // Log da resposta
        byte[] responseBody = wrappedResponse.getContentAsByteArray();
        if (responseBody.length > 0) {
            String responseBodyString = new String(responseBody, wrappedResponse.getCharacterEncoding());
            responseBodyString = responseBodyString.trim(); // Remove espaços no início e no fim
            responseBodyString = responseBodyString.replaceAll("\\s+", " "); // Remove quebras de linha e múltiplos espaços
            System.out.println("Response Body: " + responseBodyString);
        }

        // Passa a resposta para o cliente
        wrappedResponse.copyBodyToResponse();
    }

    @Override
    public void destroy() {
        // Destruição do filtro, se necessário
    }

}
