package com.financiapp.domain.vo.validation;

import java.util.HashMap;
import java.util.Map;

public class MensajesError {

    public static Map<String, String> mensajesErrorParaPassword() {
        Map<String, String> mensajes = new HashMap<>();

        mensajes.put("TOO_SHORT", "la contraseña debe tener al menos %1$s caracteres");
        mensajes.put("TOO_LONG", "la contraseña debe tener como mucho %2$s caracteres");
        mensajes.put("ILLEGAL_WHITESPACE", "la contraseña no debe tener espacios en blanco entre los caracteres");
        return mensajes;
    }

}
