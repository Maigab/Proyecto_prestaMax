import React, { useEffect, useState } from "react";

// Components:
import EmpleadoItem from "./EmpleadoItem";

import * as EmpleadoServer from "./EmpleadoServer";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);

  const listEmpleados = async () => {
    try {
      const res = await EmpleadoServer.listEmpleados();
      const data = await res.json();
      setEmpleados(data.empleados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listEmpleados();
  }, []);

  return (
    <div className="row">
      {empleados.map((empleado) => (
        <EmpleadoItem key={empleado.id} empleado={empleado} listEmpleados={listEmpleados} />
      ))}
    </div>
  );
};

export default EmpleadoList;