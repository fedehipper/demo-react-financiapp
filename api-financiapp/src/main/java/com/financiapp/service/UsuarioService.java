package com.financiapp.service;

import com.financiapp.domain.Rol;
import com.financiapp.domain.Usuario;
import com.financiapp.domain.vo.UsuarioVo;
import com.financiapp.repository.RolRepository;
import com.financiapp.repository.UsuarioRepository;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UsuarioService {


    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    public UsuarioService(UsuarioRepository usuarioRepository, RolRepository rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    public boolean verificarExistenciaPorEmail(String email) {
        return usuarioRepository
                .findByEmail(email)
                .isPresent();
    }

    public boolean verificarExistenciaPorUsername(String username) {
        return usuarioRepository
                .findByUsername(username)
                .isPresent();
    }

    public void registrar(UsuarioVo usuarioVo) {
        var usuario = new Usuario();
        usuario.setUsername(usuarioVo.getUsername());
        usuario.setEmail(usuarioVo.getEmail());
        usuario.setNombreCompleto(usuarioVo.getNombreCompleto());
        usuario.setEnabled(true);  // por ahora hasta que haya una confirmacion de registro de usuario por mail
        usuario.setRol(crearRolSiNoExiste());
        usuarioRepository.save(usuario);
    }

    public Usuario buscarUsuarioLogueado() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setEnabled(true);
        usuario.setUsername("hipper");
        
        return usuario;
    }

    public String getUsuarioLogueado() {
        return "hipper";
    }

    private Rol crearRolSiNoExiste() {
        var rolUsuario = "ROLE_USUARIO";
        return rolRepository
                .findByNombre(rolUsuario)
                .orElseGet(() -> {
                    var nuevoRol = new Rol();
                    nuevoRol.setNombre(rolUsuario);
                    return rolRepository.save(nuevoRol);
                });
    }

}
