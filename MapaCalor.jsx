import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Solucionar problema de iconos por defecto de leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapaCalor = ({ poligonos, puntos, resumen }) => {
  // Función para asignar color según severidad promedio de la finca (de los puntos recientes)
  const getColor = (fincaNombre) => {
    // Buscar en resumen el promedio de hojas adultas para esa finca (podríamos promediar todos los bloques)
    const fincaResumen = resumen.filter(r => r.finca_normalizada === fincaNombre);
    if (fincaResumen.length === 0) return '#888'; // gris
    const promedio = fincaResumen.reduce((acc, r) => acc + r.promedio_hojas_adultas, 0) / fincaResumen.length;
    if (promedio < 30) return '#00ff00'; // verde
    if (promedio < 60) return '#ffff00'; // amarillo
    if (promedio < 80) return '#ffa500'; // naranja
    return '#ff0000'; // rojo
  };

  const stylePoligono = (feature) => {
    const fincaNombre = feature.properties.name;
    return {
      fillColor: getColor(fincaNombre),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  return (
    <MapContainer center={[19.65, -71.29]} zoom={14} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        attribution='&copy; Google Maps'
      />
      {/* Polígonos de fincas */}
      <GeoJSON data={poligonos} style={stylePoligono} />
      
      {/* Puntos de monitoreo */}
      {puntos.map((punto) => (
        <Marker key={punto.id} position={[punto.lat, punto.lon]}>
          <Popup>
            <b>Finca:</b> {punto.finca}<br/>
            <b>Bloque:</b> {punto.bloque}<br/>
            <b>Hojas adultas:</b> {punto.severidad_hojas_adultas.toFixed(1)}%<br/>
            <b>Brotes:</b> {punto.severidad_brotes.toFixed(1)}%<br/>
            <b>Observaciones:</b> {punto.observaciones}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaCalor;
