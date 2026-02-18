import { useState, useEffect } from 'react';
import MapaCalor from '../components/MapaCalor';
import TablaResumen from '../components/TablaResumen';
import Filtros from '../components/Filtros';

const Dashboard = () => {
  const [poligonos, setPoligonos] = useState(null);
  const [datos, setDatos] = useState({ puntos: [], resumen: [] });
  const [filtros, setFiltros] = useState({ finca: 'todas', fechaInicio: null, fechaFin: null });

  useEffect(() => {
    // Cargar polígonos
    fetch('/data/Campos_fincas.json')
      .then(res => res.json())
      .then(data => setPoligonos(data));

    // Cargar datos de monitoreo
    fetch('/data/datos_monitoreo.json')
      .then(res => res.json())
      .then(data => setDatos(data));
  }, []);

  // Aplicar filtros (simplificado)
  const puntosFiltrados = datos.puntos.filter(p => {
    if (filtros.finca !== 'todas' && p.finca !== filtros.finca) return false;
    // Aquí irían filtros de fecha (pendiente)
    return true;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Monitoreo de Ácaros</h1>
      <Filtros filtros={filtros} setFiltros={setFiltros} fincas={[...new Set(datos.puntos.map(p => p.finca))]} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {poligonos && (
            <MapaCalor poligonos={poligonos} puntos={puntosFiltrados} resumen={datos.resumen} />
          )}
        </div>
        <div>
          <TablaResumen resumen={datos.resumen} filtros={filtros} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
