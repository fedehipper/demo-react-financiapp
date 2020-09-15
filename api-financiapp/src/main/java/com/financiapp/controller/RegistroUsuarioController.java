package com.financiapp.controller;

import com.financiapp.domain.vo.UsuarioVo;
import com.financiapp.service.UsuarioService;
import javax.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Controller
public class RegistroUsuarioController implements WebMvcConfigurer {

    private final UsuarioService usuarioService;

    public RegistroUsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/registro")
    public String registro(UsuarioVo usuarioVo) {
        return "registro";
    }

    @PostMapping("/registro")
    public String registrar(@Valid UsuarioVo usuarioVo, BindingResult bindingResult) {
        verificarUsuarioExistente(bindingResult, usuarioVo.getUsername(), usuarioVo.getEmail());

        if (bindingResult.hasErrors()) {
            return "registro";
        } else {
            usuarioService.registrar(usuarioVo);
            return "redirect:/resultado";
        }
    }

    private void verificarUsuarioExistente(BindingResult bindingResult, String usernameSolicitado, String emailSolicitado) {
        if (usuarioService.verificarExistenciaPorUsername(usernameSolicitado)) {
            bindingResult.rejectValue("username", null, "este nombre de usuario ya está en uso");
        }
        if (usuarioService.verificarExistenciaPorEmail(emailSolicitado)) {
            bindingResult.rejectValue("email", null, "este email ya está en uso");
        }
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/resultado").setViewName("resultado");
    }

}
