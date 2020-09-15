package com.financiapp.repository;

import com.financiapp.domain.Gasto;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GastoRepository extends JpaRepository<Gasto, Long> {

    List<Gasto> findByUsuarioIdAndFechaBetweenOrderByFechaDesc(Long usuarioId, LocalDate fechaInicio, LocalDate fechaFin);
    
    List<Gasto> findByUsuarioId(Long usuarioId);

    Optional<Gasto> findByIdAndUsuarioUsername(Long gastoId, String nombreUsuario);
    
    List<Gasto> findByGastoId(Long id);
}
