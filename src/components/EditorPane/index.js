import React, { useContext, useEffect } from 'react';
import './EditorPane.css';
import AppContext from '../../utils/context';
import EditorShape from '../EditorShape';
import { getPlugins } from '../../plugins';

function EditorPane() {
  const { state, dispatch } = useContext(AppContext);

  function resize (uuid, pos) {
    if (!pos) return;
    const el = state.els.find(item => item.uuid === uuid);
    if (!el) return;
    el.commonStyle = {...pos};
    dispatch({type: 'els_change', el});
  }

  useEffect(() => {
    // Update the document title using the browser API
    function handleDelete(e) {
      e.preventDefault();
      if (e.keyCode === 46 && !!state.activeUUID) {
        dispatch({type: 'els_remove', uuid: state.activeUUID});
        dispatch({type: 'uuid_change', uuid: ''});
      }
    }
    document.addEventListener('keyup', handleDelete);
    return function cleanup () {
      document.removeEventListener('keyup', handleDelete);
    }
  });

  return (
    <div className="EditorPane" onClick={() => dispatch({ type: 'uuid_change', uuid: '' })}>
      <div className="EditorPaneInner">
        <div className="EditorPaneMain">{ state.els.map(el => <EditorShape resize={resize} name={el.name} defaultStyle={el.commonStyle} uuid={el.uuid} key={el.uuid}>{getPlugins(el)}</EditorShape>) }</div>
      </div>
    </div>
  );
}

export default EditorPane;
