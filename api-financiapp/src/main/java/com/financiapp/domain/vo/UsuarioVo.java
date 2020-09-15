package com.financiapp.domain.vo;

import com.financiapp.domain.vo.validation.PasswordValidation;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class UsuarioVo {

    @NotEmpty
    @Size(min = 6, max = 16)
    private String username;

    @NotEmpty
    @Size(max = 50)
    private String nombreCompleto;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    @PasswordValidation
    private String password;

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String usuario) {
        this.username = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
