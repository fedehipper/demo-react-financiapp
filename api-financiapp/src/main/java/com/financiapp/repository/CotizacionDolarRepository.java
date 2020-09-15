package com.financiapp.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.financiapp.domain.vo.CotizacionDolar;
import java.io.IOException;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

@Repository
public class CotizacionDolarRepository {

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    public CotizacionDolarRepository(ObjectMapper objectMapper, RestTemplate restTemplate) {
        this.objectMapper = objectMapper;
        this.restTemplate = restTemplate;
    }

    public CotizacionDolar buscarCotizacionDolar() throws IOException {
        var uri = "http://ws.geeklab.com.ar/dolar/get-dolar-json.php";
        return objectMapper
                .readValue(restTemplate.getForObject(uri, String.class), CotizacionDolar.class);
    }

}
