import React, {useEffect, useState} from 'react';
import api from './services/api';
import List from './componentes/Item/List';
import Formdev from './componentes/form/Formdev';

import './global.css';
import './App.css';
import './Siderbar.css';
import './Main.css';

//componente: Bloco isolado de html, css, js onde não interfere no restante da aplicação.
//propriedade: |props| {props.title}. Informação que um componente PAI passa pros filhos.
//estado: informações mantidas pelo componente.
//fragmento: <> </> em volta dos componentes

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();

  },[]);
  
  async function handlerDev(data){
    const response = await api.post('/devs', data);
     setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <Formdev onSubmit={handlerDev} />
      </aside>
      <main>
        <ul>
          {devs.map(d => (
            <List key={d._id} dev={d}/>
          ))}
        </ul>

      </main>
    </div> 

  );
}

export default App;
