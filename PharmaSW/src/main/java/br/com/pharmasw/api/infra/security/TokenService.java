package br.com.pharmasw.api.infra.security;

import br.com.pharmasw.api.modelo.Pessoa;
import br.com.pharmasw.api.modelo.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${API.SECURITY.TOKEN.SECRET}")
    private String secret;

    public String gerarToken(Pessoa usuario) {
        try {

            Algorithm algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("pharmasw-api")
                    .withSubject(usuario.getEmail())
                    .withExpiresAt(this.gerarDataDeExpiracao())
                    .sign(algorithm);

        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao autenticar.", e);
        }
    }

    public String validarToken(String token) {
        try {

            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("pharmasw-api")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (TokenExpiredException e) {
            // Token expirou
            throw new TokenExpiredException("Token expirado", Instant.now());

        }catch (JWTVerificationException e) {
            return null;
        }
    }

    private Instant gerarDataDeExpiracao(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-3"));
    }
}
