package com.financiapp.controller;

import com.financiapp.service.CotizacionDolarService;
import java.io.IOException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class CarteraController {

    private final CotizacionDolarService cotizacionDolarService;

    public CarteraController(CotizacionDolarService cotizacionDolarService) {
        this.cotizacionDolarService = cotizacionDolarService;
    }

    @GetMapping(value = "/cartera")
    public ModelAndView cartera(ModelAndView modelAndView) throws IOException {
        modelAndView.addObject("cotizacionDolar", cotizacionDolarService.buscarCotizacion().getLibre());
        modelAndView.setViewName("cartera");
        return modelAndView;
    }

    @GetMapping("/")
    public RedirectView home() {
        return new RedirectView("cartera");
    }

}
