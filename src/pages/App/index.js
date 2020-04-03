import React, { useReducer } from 'react';
import './App.css';
import AppContext from '../../utils/context'
import AppReducer from '../../utils/reducer'
import Tools from '../../components/Tools'
import EditorPane from '../../components/EditorPane'
import logo from './logo.svg';

function App() {
  const [state, dispatch] = useReducer(AppReducer, { els: [], activeUUID: '' });
  return (
    <AppContext.Provider value={{
      state,
      dispatch
    }}>
      <div className="App">
        <header className="AppHeader"><img className="AppLogo" src={logo} alt="logo" />ReactDemo</header>
        <div className="AppBody">
          <Tools />
          <EditorPane />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
