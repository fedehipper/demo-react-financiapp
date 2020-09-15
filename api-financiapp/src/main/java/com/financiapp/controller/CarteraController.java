package com.financiapp.controller;

import com.financiapp.repository.CotizacionDolarRepository;
import java.io.IOException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class CarteraController {

    private final CotizacionDolarRepository cotizacionDolarRepository;

    public CarteraController(CotizacionDolarRepository cotizacionDolarRepository) {
        this.cotizacionDolarRepository = cotizacionDolarRepository;
    }

    @GetMapping(value = "/cartera")
    public ModelAndView cartera(ModelAndView modelAndView) throws IOException {
        modelAndView.addObject("cotizacionDolar", cotizacionDolarRepository.buscarCotizacionDolar().getLibre());
        modelAndView.setViewName("cartera");
        return modelAndView;
    }

    @GetMapping("/")
    public RedirectView home() {
        return new RedirectView("cartera");
    }

}
