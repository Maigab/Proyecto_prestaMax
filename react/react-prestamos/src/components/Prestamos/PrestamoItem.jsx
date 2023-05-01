import React from "react";
import { useHistory } from "react-router-dom";

import * as PrestamoServer from "./PrestamoServer";

const PrestamoItem=({ prestamo, listPrestamos })=>{
    const history = useHistory();

    const handleDelete = async (prestamoId) =>  { 
        await PrestamoServer.deletePrestamo(prestamoId);
        listPrestamos();
    };

    return (
        <div className="col-md-4">
            <div className="card card-body">
                <h3 className="card-title">{prestamo.name}
                <button onClick={() => history.push(`/updatePrestamo/${prestamo.id}`)} className="ms-2 btn btn-sm btn-info">
                    Modificar
                </button>
                </h3>
                <p className="card-text">Status: <strong>{prestamo.status}</strong></p>
                <p className="card-text">Monto: <strong>{prestamo.monto}</strong></p>
                <p className="card-text">Tipo de pago: <strong>{prestamo.pagos}</strong></p>
                <p className="card-email">Cliente: <strong>{prestamo.cliente_id}</strong></p>
                <button onClick={() =>prestamo.id && handleDelete(prestamo.id)} className="btn btn-danger my-2" >Eliminar</button>
            
            </div>
        </div>
    );
};

export default PrestamoItem;