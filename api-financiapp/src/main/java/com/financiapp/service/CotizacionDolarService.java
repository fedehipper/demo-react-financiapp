package com.financiapp.service;

import com.financiapp.domain.vo.CotizacionDolarVo;
import com.financiapp.repository.CotizacionDolarRepository;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CotizacionDolarService {

    @Value("${com.financiapp.impuesto.dolar}")
    private String IMPUESTO_DOLAR;

    private final CotizacionDolarRepository cotizacionDolarRepository;

    public CotizacionDolarService(CotizacionDolarRepository cotizacionDolarRepository) {
        this.cotizacionDolarRepository = cotizacionDolarRepository;
    }

    public CotizacionDolarVo buscarCotizacion() throws IOException {
        var cotizacionDolar = cotizacionDolarRepository.buscarCotizacionDolar();
        cotizacionDolar.setLibre(cotizacionDolar.getLibre().multiply(new BigDecimal(IMPUESTO_DOLAR)).setScale(2, RoundingMode.CEILING));
        return cotizacionDolar;
    }

}
