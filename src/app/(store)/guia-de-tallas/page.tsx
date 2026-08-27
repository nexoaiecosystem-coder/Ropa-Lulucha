const CLOTHING_TABLE = [
  { size: "S", pecho: "94-99", largo: "68" },
  { size: "M", pecho: "100-105", largo: "70" },
  { size: "L", pecho: "106-111", largo: "72" },
  { size: "XL", pecho: "112-117", largo: "74" },
  { size: "XXL", pecho: "118-124", largo: "76" },
];

const SHOE_TABLE = [
  { size: "36", cm: "22.5" },
  { size: "37", cm: "23.5" },
  { size: "38", cm: "24" },
  { size: "39", cm: "24.5" },
  { size: "40", cm: "25.5" },
  { size: "41", cm: "26" },
  { size: "42", cm: "27" },
  { size: "43", cm: "27.5" },
  { size: "44", cm: "28.5" },
  { size: "45", cm: "29" },
];

export default function GuiaDeTallasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl tracking-wide">Guía de Talles</h1>

      <section className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Ropa</h2>
        <p className="mt-2 text-muted text-sm">
          Nuestras prendas tienen calce oversize/boxy fit. Si estás entre dos talles, te
          recomendamos elegir el más chico para un calce más ajustado.
        </p>
        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="py-2">Talle</th>
              <th className="py-2">Contorno de pecho (cm)</th>
              <th className="py-2">Largo (cm)</th>
            </tr>
          </thead>
          <tbody>
            {CLOTHING_TABLE.map((row) => (
              <tr key={row.size} className="border-b border-border">
                <td className="py-3 font-semibold">{row.size}</td>
                <td className="py-3">{row.pecho}</td>
                <td className="py-3">{row.largo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Championes</h2>
        <p className="mt-2 text-muted text-sm">
          Los talles de championes son equivalentes al numerado chileno/europeo. Medí tu pie
          descalzo desde el talón hasta el dedo más largo para comparar con el largo en cm.
        </p>
        <table className="mt-4 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="py-2">Talle</th>
              <th className="py-2">Largo de pie (cm)</th>
            </tr>
          </thead>
          <tbody>
            {SHOE_TABLE.map((row) => (
              <tr key={row.size} className="border-b border-border">
                <td className="py-3 font-semibold">{row.size}</td>
                <td className="py-3">{row.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
