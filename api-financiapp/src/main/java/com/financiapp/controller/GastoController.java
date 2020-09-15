package com.financiapp.controller;

import com.financiapp.repository.CotizacionDolarRepository;
import java.io.IOException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GastoController {

    private final CotizacionDolarRepository cotizacionDolarRepository;

    public GastoController(CotizacionDolarRepository cotizacionDolarRepository) {
        this.cotizacionDolarRepository = cotizacionDolarRepository;
    }

    @GetMapping("/gasto")
    public ModelAndView gasto(ModelAndView modelAndView) throws IOException {
        modelAndView.addObject("cotizacionDolar", cotizacionDolarRepository.buscarCotizacionDolar().getLibre());
        modelAndView.setViewName("gasto");
        return modelAndView;
    }

}
