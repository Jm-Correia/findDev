import React, {useState} from 'react';

//componente: Bloco isolado de html, css, js onde não interfere no restante da aplicação.
//propriedade: |props| {props.title}. Informação que um componente PAI passa pros filhos.
//estado: 
//fragmento: <> </> em volta dos componentes

function App() {

  const [count, setCounter] = useState(0);
    
  function incrementar(){
    setCounter(count+1);
  }


  return (
    <div className="App">
        <h1>Contador: {count}</h1>
        <button onClick={incrementar}>Incrementar</button>    
    </div>
  );
}

export default App;
