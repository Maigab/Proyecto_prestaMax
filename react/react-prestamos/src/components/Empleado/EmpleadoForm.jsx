import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

import * as EmpleadoServer from "./EmpleadoServer";

const EmpleadoForm=()=>{
    const history=useHistory();
    const params = useParams();

    const initialState={id:0,name:"",apellidos:"",fechaNacimiento:"",rfc:"",correo:"",telefono:"", password:"", rol:1};

    const [ empleado, setEmpleado ]=useState(initialState);

    const handleInputChange = (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
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
          res = await EmpleadoServer.registerEmpleado(empleado);
          const data = await res.json();
          if (data.message === "Success") {
            setEmpleado(initialState);
            swal("Seccess", "Usuario registrado!");
          } else{
            mostrarAlerta2();
            history.push("/");
          }
        } else {
          await EmpleadoServer.updateEmpleado(params.id, empleado);
        }
        history.push("/empleadoList");
      } catch (error) {
        //console.log(error);
        mostrarAlerta();
        history.push("/empleadoList");
      }
    };

    const getEmpleado = async (empleadoId) => {
      try {
        const res = await EmpleadoServer.getEmpleado(empleadoId);
        const data = await res.json();
        console.log(data);
        const {name, apellidos, fechaNacimiento, rfc, correo, telefono , password,rol} = data.empleados;
        setEmpleado({ name,  apellidos, fechaNacimiento, rfc, correo, telefono , password, rol });
        
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (params.id) {
        getEmpleado(params.id);
      }
      // eslint-disable-next-line
    }, []);


    return (<div className="col-md-3 mx-auto">
    <h2 className="mb-3 text-center">Empleado</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" value={empleado.name} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Apellidos</label>
        <input type="text" name="apellidos" value={empleado.apellidos} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de Nacimiento</label>
        <input type="date" name="fechaNacimiento" value={empleado.fechaNacimiento} data-date-format="yyyy-mm-dd" onChange={handleInputChange} className="form-control" maxLength="100" required />
      </div>
      <div className="mb-3">
        <label className="form-label">RFC</label>
        <input type="text" name="rfc" value={empleado.rfc} onChange={handleInputChange} className="form-control" minLength="13" maxLength="13" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input type="email" name="correo" value={empleado.correo} onChange={handleInputChange} className="form-control" maxLength="100" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Telefono</label>
        <input type="text" name="telefono" value={empleado.telefono} onChange={handleInputChange} className="form-control" minLength="10" maxLength="10" required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="text" name="password" value={empleado.password} onChange={handleInputChange} className="form-control" minLength="8" maxLength="8" required />
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

export default EmpleadoForm;