package br.com.pharmasw.api.infra.security;

import br.com.pharmasw.api.modelo.enums.Status;
import br.com.pharmasw.api.repositorio.UsuarioRepositorio;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        Gson gson = new Gson();
        String tokenExpirado = gson.toJson(new MensagemErro("Token Expirado."));
        String tokenInvalido = gson.toJson(new MensagemErro("Token inválido."));

        try {
            var token = this.recoverToken(request);
            if (token != null) {
                var login = tokenService.validarToken(token);
                System.out.println("LOGIN AUTH TOKEN -> " + login);
                System.out.println("AUTH TOKEN -> " + token);
                UserDetails user = usuarioRepositorio.findByEmailAndStatus(login, Status.ATIVO);

                var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (TokenExpiredException e) {
            System.out.println(gson.toJson(tokenExpirado));
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(tokenExpirado);
            response.getWriter().flush();
            return;
        } catch (JWTDecodeException ex) {
            System.out.println(tokenInvalido);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write(tokenInvalido);
            response.getWriter().flush();
            return;
        }
    }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }

    // Cria uma classe interna
    private static class MensagemErro{
        private String menssagem;

        public MensagemErro(String message) {
            this.menssagem = message;
        }

        public String getMessage() {
            return menssagem;
        }

        public void setMessage(String message) {
            this.menssagem = message;
        }
    }
}
