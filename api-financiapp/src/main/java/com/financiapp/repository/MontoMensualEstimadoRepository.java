package com.financiapp.repository;

import com.financiapp.domain.MontoMensualEstimado;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MontoMensualEstimadoRepository extends JpaRepository<MontoMensualEstimado, Long> {

    Optional<MontoMensualEstimado> findByUsuarioIdAndAnioAndMes(Long usuarioId, String anio, String mes);

}
