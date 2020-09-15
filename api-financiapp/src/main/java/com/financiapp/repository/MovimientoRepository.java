package com.financiapp.repository;

import com.financiapp.domain.Movimiento;
import com.financiapp.domain.TipoMoneda;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {

    List<Movimiento> findByUsuarioUsernameOrderByFecha(String nombreUsuario);

    List<Movimiento> findByUsuarioUsername(String nombreUsuario);

    List<Movimiento> findByUsuarioUsernameAndActivoIdOrderByFecha(String nombreUsuario, Long activoId);
    
    List<Movimiento> findTop10ByUsuarioUsernameAndActivoIdOrderByFechaDesc(String nombreUsuario, Long activoId);
    
    
    List<Movimiento> findByUsuarioUsernameAndActivoTipoMoneda(String nombreUsuario, TipoMoneda tipoMoneda);

    Optional<Movimiento> findByActivoIdAndFechaAndUsuarioUsername(Long activoId, LocalDate fecha, String nombreUsuario);

    List<Movimiento> findByFecha(LocalDate fecha);

    List<Movimiento> findByActivoIdAndUsuarioUsername(Long activoId, String nombreUsuario);
}
