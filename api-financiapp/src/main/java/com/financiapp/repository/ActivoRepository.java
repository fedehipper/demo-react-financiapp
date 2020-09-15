package com.financiapp.repository;

import com.financiapp.domain.Activo;
import com.financiapp.domain.TipoMoneda;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivoRepository extends JpaRepository<Activo, Long> {

    List<Activo> findByUsuarioUsername(String nombreUsuario);
    
    List<Activo> findByUsuarioUsernameAndTipoMoneda(String nombreUsuario, TipoMoneda tipoMoneda);

    Activo findByIdAndUsuarioUsername(Long id, String nombreUsuario);
}
