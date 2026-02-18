const TablaResumen = ({ resumen, filtros }) => {
  // Filtrar resumen por finca si es necesario
  const resumenFiltrado = filtros.finca === 'todas' 
    ? resumen 
    : resumen.filter(r => r.finca_normalizada === filtros.finca);

  // Determinar prioridad según umbrales
  const getPrioridad = (promedio) => {
    if (promedio < 30) return 'Baja';
    if (promedio < 60) return 'Media';
    if (promedio < 80) return 'Alta';
    return 'Crítica';
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Resumen por Bloque</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Finca</th>
            <th>Bloque</th>
            <th>Hojas Adultas (%)</th>
            <th>Brotes (%)</th>
            <th>Muestras</th>
            <th>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {resumenFiltrado.map((item, idx) => (
            <tr key={idx}>
              <td>{item.finca_normalizada}</td>
              <td>{item['5_BloqueSector']}</td>
              <td>{item.promedio_hojas_adultas.toFixed(1)}</td>
              <td>{item.promedio_brotes.toFixed(1)}</td>
              <td>{item.cantidad_muestras}</td>
              <td>
                <span className={`px-2 py-1 rounded text-white ${
                  getPrioridad(item.promedio_hojas_adultas) === 'Baja' ? 'bg-green-500' :
                  getPrioridad(item.promedio_hojas_adultas) === 'Media' ? 'bg-yellow-500' :
                  getPrioridad(item.promedio_hojas_adultas) === 'Alta' ? 'bg-orange-500' : 'bg-red-500'
                }`}>
                  {getPrioridad(item.promedio_hojas_adultas)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaResumen;
