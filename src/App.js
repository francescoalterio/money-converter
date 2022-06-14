import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [monedas, setMonedas] = useState([]);
  const [moneda1, setMoneda1] = useState('USD');
  const [moneda2, setMoneda2] = useState('EUR');
  const [monto, setMonto] = useState(undefined);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/currencies`)
      .then((resp) => resp.json())
      .then((data) => {
        setMonedas(Object.keys(data));
      });
  }, []);

  useEffect(() => {
    setMonto('')
    setResult('')
  }, [moneda1, moneda2])

  const handleConvert = () => {
    if (moneda1 !== moneda2) {
      const host = 'api.frankfurter.app';
      fetch(
        `https://${host}/latest?amount=${monto}&from=${moneda1}&to=${moneda2}`
      )
        .then((resp) => resp.json())
        .then((data) => {setResult(data.rates[moneda2])});
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="selects-container">
          <select
            value={moneda1}
            name="moneda-1"
            id="moneda-1"
            onChange={(e) => setMoneda1(e.target.value)}
          >
            {monedas.map((moneda) => (
              <option value={moneda}>{moneda}</option>
            ))}
          </select>
          <select
            value={moneda2}
            name="moneda-2"
            id="moneda-2"
            onChange={(e) => setMoneda2(e.target.value)}
          >
            {monedas.map((moneda) => (
              <option value={moneda}>{moneda}</option>
            ))}
          </select>
        </div>
        <div className="inputs-container">
          <input
            className=""
            type="text"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />
          <p className=""> {moneda2}: {result}</p>
        </div>
        <div>
          <button onClick={handleConvert}>Convertir</button>
        </div>
      </div>
    </div>
  );
}
