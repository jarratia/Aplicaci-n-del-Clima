import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';





function App() {
  //state del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  //Controlando la consulta
  const [consulta, guardarConsulta ] = useState(false);

  const [resultado, guardarResultado] = useState({});

  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if(consulta) {
        const appId = '33d2c392f7b5a180615736a60f7455ad';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        guardarResultado(resultado);
        guardarConsulta(false);
      }
      //Lógica para detectar resultados correctos en la consulta
      if(resultado.cod === '404'){
        guardarError(true);
      }else{
        guardarError(false);
      }
    }
    consultarAPI();
  }, [consulta] );

  //Carga condicional de componentes
  let componente;
  if(error){
    componente = <Error mensaje="no hay resultados" />
  }else{
    componente = <Clima
                  resultado={resultado}
                />
  }


  return (
    <Fragment>
      <Header titulo = 'Clima React App'>

      </Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
