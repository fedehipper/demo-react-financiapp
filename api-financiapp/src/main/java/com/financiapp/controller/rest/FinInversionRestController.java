package com.financiapp.controller.rest;

import com.financiapp.service.FinInversionService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FinInversionRestController {

    private final FinInversionService finInversionService;

    public FinInversionRestController(FinInversionService finInversionService) {
        this.finInversionService = finInversionService;
    }

    @DeleteMapping("/api/activo/{idActivo}")
    public void finalizarInversion(@PathVariable Long idActivo) {
        finInversionService.finalizarInversion(idActivo);
    }

}
