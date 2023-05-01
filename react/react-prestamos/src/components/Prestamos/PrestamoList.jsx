import React, { useEffect, useState } from "react";

// Components:
import PrestamoItem from "./PrestamoItem";

import * as PrestamoServer from "./PrestamoServer";

const PrestamoList = () => {
  const [prestamos, setPrestamos] = useState([]);

  const listPrestamos = async () => {
    try {
      const res = await PrestamoServer.listPrestamos();
      const data = await res.json();
      setPrestamos(data.prestamos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPrestamos();
  }, []);

  return (
    <div className="row">
      {prestamos.map((prestamo) => (
        <PrestamoItem key={prestamo.id} prestamo={prestamo} listPrestamos={listPrestamos} />
      ))}
    </div>
  );
};

export default PrestamoList;