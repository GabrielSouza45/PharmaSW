//package br.com.pharmalink.api.security;
//
//import br.com.pharmalink.api.modelo.Usuario;
//import br.com.pharmalink.api.modelo.enums.Status;
//import br.com.pharmalink.api.repositorio.UsuarioRepositorio;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.Collections;
//
//@Component
//public class SecurityFilter extends OncePerRequestFilter {
//
//    @Autowired
//    TokenService tokenService;
//    @Autowired
//    UsuarioRepositorio usuarioRepositorio;
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        var token = this.recoverToken(request);
//        var login = tokenService.validarToken(token);
//
//        if (login != null) {
//            Usuario usuario = usuarioRepositorio.findUsuarioByEmailAndStatus(
//                    login, Status.ATIVO
//            );
//            var autorizacoes = Collections.singletonList(new SimpleGr)
//        }
//
//    }
//}
