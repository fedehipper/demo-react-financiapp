package com.financiapp.controller;

import com.financiapp.service.CotizacionDolarService;
import java.io.IOException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GastoController {

    private final CotizacionDolarService cotizacionDolarService;

    public GastoController(CotizacionDolarService cotizacionDolarService) {
        this.cotizacionDolarService = cotizacionDolarService;
    }

    @GetMapping("/gasto")
    public ModelAndView gasto(ModelAndView modelAndView) throws IOException {
        modelAndView.addObject("cotizacionDolar", cotizacionDolarService.buscarCotizacion().getLibre());
        modelAndView.setViewName("gasto");
        return modelAndView;
    }

}
