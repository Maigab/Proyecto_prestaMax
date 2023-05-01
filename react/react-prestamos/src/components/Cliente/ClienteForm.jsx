import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

import * as ClienteServer from "./ClienteServer";

const ClienteForm=()=>{
    const history=useHistory();
    const params = useParams();

    const initialState={id:0,name:"",apellidos:"",fechaNacimiento:"",rfc:"",correo:"",telefono:"", password:"", rol:2};

    const [ cliente, setCliente ]=useState(initialState);

    const handleInputChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const mostrarAlerta=()=>{
      swal("Error", "Error en la conexión con la base de datos");
    }
    const mostrarAlerta2=()=>{
      swal("Error", "Usuario ya registrado!");
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let res;
        if (!params.id) {
          res = await ClienteServer.registerCliente(cliente);
          const data = await res.json();
          if (data.message === "Success") {
            setCliente(initialState);
            swal("Seccess", "Usuario registrado!");
          } else{
            mostrarAlerta2();
            history.push("/");
          }
        } else {
          await ClienteServer.updateCliente(params.id, cliente);
        }
        history.push("/");
      } catch (error) {
        //console.log(error);
        mostrarAlerta();
        history.push("/");
      }
    };

    const getCliente = async (clienteId) => {
      try {
        const res = await ClienteServer.getCliente(clienteId);
        const data = await res.json();
        console.log(data);
        const {name, apellidos, fechaNacimiento, rfc, correo, telefono , password,rol} = data.clientes;
        setCliente({ name,  apellidos, fechaNacimiento, rfc, correo, telefono , password, rol });
        
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (params.id) {
        getCliente(params.id);
      }
      // eslint-disable-next-line
    }, []);


    return (<div className="col-md-3 mx-auto">
    <h2 className="mb-3 text-center">Cliente</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" value={cliente.name} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Apellidos</label>
        <input type="text" name="apellidos" value={cliente.apellidos} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de Nacimiento</label>
        <input type="date" name="fechaNacimiento" value={cliente.fechaNacimiento} data-date-format="yyyy-mm-dd" onChange={handleInputChange} className="form-control" maxLength="100" required />
      </div>
      <div className="mb-3">
        <label className="form-label">RFC</label>
        <input type="text" name="rfc" value={cliente.rfc} onChange={handleInputChange} className="form-control" minLength="13" maxLength="13" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" name="correo" value={cliente.correo} onChange={handleInputChange} className="form-control" maxLength="100" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Telefono</label>
        <input type="text" name="telefono" value={cliente.telefono} onChange={handleInputChange} className="form-control" minLength="10" maxLength="10" required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="text" name="password" value={cliente.password} onChange={handleInputChange} className="form-control" minLength="8" maxLength="8" required />
      </div>
      <div className="d-grid gap-2">
          {params.id ? (
            <button type="submit" className="btn btn-block btn-primary">
              Modificar
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              Registrar
            </button>
          )}
        </div>
        <script type="text/javascript">
</script>
    </form>
  </div>
  );
};

export default ClienteForm;