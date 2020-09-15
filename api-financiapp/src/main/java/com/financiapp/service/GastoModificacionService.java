package com.financiapp.service;

import com.financiapp.domain.Gasto;
import com.financiapp.domain.vo.GastoVo;
import com.financiapp.repository.GastoRepository;
import java.math.BigDecimal;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class GastoModificacionService {

    public final GastoRepository gastoRepository;
    public final GastoService gastoService;
    public final UsuarioService usuarioService;

    public GastoModificacionService(GastoRepository gastoRepository, GastoService gastoService, UsuarioService usuarioService) {
        this.gastoRepository = gastoRepository;
        this.usuarioService = usuarioService;
        this.gastoService = gastoService;
    }

    public void modificarNecesidad(long gastoId) {
        gastoRepository
                .findByIdAndUsuarioUsername(gastoId, getUsuarioLogueado())
                .map(gasto -> {
                    gasto.setNecesario(!gasto.isNecesario());
                    return gasto;
                });
    }

    public void modificarUnGastoPorId(GastoVo gastoVo, Long gastoId) {
        gastoRepository
                .findByIdAndUsuarioUsername(gastoId, getUsuarioLogueado())
                .map(gasto -> {
                    gasto.setConcepto(gastoVo.getConcepto());
                    gasto.setFecha(gastoVo.getFecha());
                    gasto.setValor(new BigDecimal(gastoVo.getValor()));
                    return gasto;
                })
                .get();
    }

    public void eliminarPorId(Long gastoId) {
        var gastoPrimerCuotaId = gastoRepository
                .findByIdAndUsuarioUsername(gastoId, getUsuarioLogueado())
                .map(gasto -> buscarGastoPrimerCuotaId(gasto))
                .get();
        gastoRepository
                .deleteAll(gastoRepository.findByGastoId(gastoPrimerCuotaId));
        gastoRepository
                .deleteById(gastoPrimerCuotaId);
    }

    private Long buscarGastoPrimerCuotaId(Gasto gastoAEliminar) {
        return gastoAEliminar.getGasto() == null ? gastoAEliminar.getId() : gastoAEliminar.getGasto().getId();
    }
    
    private String getUsuarioLogueado() {
        return usuarioService.getUsuarioLogueado();
    }
}
