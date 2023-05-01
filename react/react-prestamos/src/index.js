import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Componentes
import Navbar from './components/Navbar/Navbar';
import ClienteList from './components/Cliente/ClienteList';
import ClienteForm from './components/Cliente/ClienteForm';

import EmpleadoList from './components/Empleado/EmpleadoList';
import EmpleadoForm from './components/Empleado/EmpleadoForm';

import PrestamoList from './components/Prestamos/PrestamoList';
import PrestamoForm from './components/Prestamos/PrestamoForm';

import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Navbar/>
        <div className='container my-4'>
            <Switch>
                <Route exact path='/' component={ClienteList}/>
                <Route path='/clienteForm' component={ClienteForm}/>
                <Route path='/updateCliente/:id' component={ClienteForm}/>
                
                <Route exact path='/empleadoList' component={EmpleadoList}/>
                <Route path='/EmpleadoForm' component={EmpleadoForm}/>
                <Route path='/updateEmpleado/:id' component={EmpleadoForm}/>

                <Route exact path='/prestamoList' component={PrestamoList}/>
                <Route path='/Prestamoform' component={PrestamoForm}/>
                <Route path='/updatePrestamo/:id' component={PrestamoForm} />
            </Switch>
         </div>
    </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
