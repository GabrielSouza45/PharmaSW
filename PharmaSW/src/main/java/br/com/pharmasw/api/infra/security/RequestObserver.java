package br.com.pharmasw.api.infra.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;


@Component
public class RequestObserver extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        ContentCachingRequestWrapper wrappedRequest = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper(response);

        // Continue com a cadeia de filtros
        filterChain.doFilter(wrappedRequest, wrappedResponse);

        // Log do endpoint acessado
        String endpoint = wrappedRequest.getRequestURI();
        System.out.println("\n" + endpoint);

        // Log do corpo da requisição
        String requestBody = getRequestBody(wrappedRequest);

        System.out.println("request -> " + requestBody);

        // Log do corpo da resposta (opcional)
        String responseBody = getResponseBody(wrappedResponse);
        System.out.println("response -> " + responseBody);

        // Copia o conteúdo da resposta de volta para o original
        wrappedResponse.copyBodyToResponse();
    }

    private String getRequestBody(ContentCachingRequestWrapper request) {
        byte[] buf = request.getContentAsByteArray();
        return new String(buf, 0, buf.length, StandardCharsets.UTF_8);
    }

    private String getResponseBody(ContentCachingResponseWrapper response) {
        byte[] buf = response.getContentAsByteArray();
        return new String(buf, 0, buf.length, StandardCharsets.UTF_8);
    }
}
