import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types'


const Formulario = ({busqueda, guardarBusqueda, guardarConsulta}) => {

    
   

    const [error, guardarError] = useState(false);

    //Extraer ciudad y país
    const { ciudad, pais } = busqueda;

    //Funcióin para colocar los elementos en el state
    const handleChange = e => {
        //Actualzar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    //Evento al dar click en botón submit en form
    const handleSubmit = e => {
        e.preventDefault();

        //Validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //Pasarlo al componente principal
        guardarConsulta(true);
    }


    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Debes completar todos los campos"/> : null};
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12">
                <select 
                name="pais" 
                id="pais"  
                value={pais} 
                onChange={handleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CH">Chile</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label htmlFor="pais">Pais: </label>
            </div>

            <div className="input-field col s12">
                <input 
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    />
            </div>
        </form>
     );
}
 
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsulta: PropTypes.func.isRequired
}
 
export default Formulario;