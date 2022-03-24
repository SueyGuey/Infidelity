package infidelity.api.filter;

import infidelity.api.security.CognitoIdTokenProcessor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
@Slf4j
public class CognitoJwtAuthFilter extends GenericFilterBean {

    private final CognitoIdTokenProcessor idTokenProcessor;

    @Autowired
    public CognitoJwtAuthFilter(CognitoIdTokenProcessor idTokenProcessor) {
        this.idTokenProcessor = idTokenProcessor;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        try {
            Authentication authentication = idTokenProcessor.authenticate(request);
            if (authentication != null) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            log.error("Unable to process Cognito ID token", e);
            SecurityContextHolder.clearContext();
        }

        chain.doFilter(servletRequest, servletResponse);
    }
}
