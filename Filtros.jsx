const Filtros = ({ filtros, setFiltros, fincas }) => {
  return (
    <div className="mb-4 flex gap-4">
      <select
        value={filtros.finca}
        onChange={(e) => setFiltros({ ...filtros, finca: e.target.value })}
        className="border rounded p-2"
      >
        <option value="todas">Todas las fincas</option>
        {fincas.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      {/* Aquí puedes agregar filtros de fecha */}
    </div>
  );
};

export default Filtros;
