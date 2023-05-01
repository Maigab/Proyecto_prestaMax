import React, { useEffect, useState } from "react";

// Components:
import ClienteItem from "./ClienteItem";

import * as ClienteServer from "./ClienteServer";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  const listClientes = async () => {
    try {
      const res = await ClienteServer.listClientes();
      const data = await res.json();
      setClientes(data.clientes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listClientes();
  }, []);

  return (
    <div className="row">
      {clientes.map((cliente) => (
        <ClienteItem key={cliente.id} cliente={cliente} listClientes={listClientes} />
      ))}
    </div>
  );
};

export default ClienteList;