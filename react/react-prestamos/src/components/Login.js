import axios from "axios";
import {Navigate} from "react-router-dom";
import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/login/";

export const Login = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();

        const {data} = await axios.post('login', {
            correo, password
        }, {withCredentials: true});

        //axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;

        setNavigate(true);
    }
    
    if (navigate) {
        return <Navigate to="/"/>;
    }

    return (<div className="col-md-3 mx-auto">
    <h2 className="mb-3 text-center">Login</h2>
    <form onSubmit={handleSubmit}>
       <div className="mb-3">
        <label className="form-label">Status</label>
        <input type="text" name="correo" value={correo} onChange={handleInputChange} className="form-control" minLength="5" maxLength="10" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Monto</label>
        <input type="text" name="password" value={password} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
      </div>  
      <div className="d-grid gap-2">
            <button type="submit" className="btn btn-block btn-success">
              Login
            </button>
          
        </div>
        <script type="text/javascript">
</script>
    </form>
  </div>
    );
};
export default Login;