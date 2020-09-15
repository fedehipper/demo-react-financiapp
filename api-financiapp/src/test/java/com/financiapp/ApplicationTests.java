package com.financiapp;

import com.financiapp.domain.Rol;
import com.financiapp.domain.Usuario;
import com.financiapp.repository.RolRepository;
import com.financiapp.repository.UsuarioRepository;
import javax.transaction.Transactional;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class ApplicationTests {

    @Autowired
    protected UsuarioRepository usuarioRepository;

    @Autowired
    protected RolRepository rolRepository;

    protected Usuario unUsuario;
    protected Rol unRol;

    @Before
    public void setUp() {
        unUsuario = new Usuario();
        unUsuario.setEnabled(true);
        unUsuario.setUsername("username");
        unUsuario.setPassword("una contrasenia hasheada");
        unUsuario.setEmail("email@valido.com");

        unRol = new Rol();
        unRol.setNombre("ROLE_USUARIO");
        rolRepository.save(unRol);

        usuarioRepository.save(unUsuario);
    }

    @Test
    public void contextLoads() {
    }

    protected Usuario guardarOtroUsuario() {
        var otroUsuario = new Usuario();
        otroUsuario.setEnabled(true);
        otroUsuario.setUsername("otroUsuario");
        otroUsuario.setPassword("una contrasenia hasheada");

        var rolOtroUsuario = new Rol();
        rolOtroUsuario.setNombre("ROLE_USUARIO");
        rolRepository.save(rolOtroUsuario);

        return usuarioRepository.save(otroUsuario);
    }

}
