package com.financiapp.repository;

import com.financiapp.domain.MetaInversion;
import com.financiapp.domain.TipoMoneda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MetaInversionRepository extends JpaRepository<MetaInversion, Long> {

    MetaInversion findByUsuarioIdAndTipoMoneda(Long usuarioId, TipoMoneda tipoMoneda);

    void deleteByUsuarioIdAndTipoMoneda(Long usuarioId, TipoMoneda tipoMoneda);
    
}
