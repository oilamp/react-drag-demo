import React, { useContext } from 'react';
import './ComponentItem.css';
import AppContext from '../../utils/context'

export default function ComponentItem (props) {
  const {dispatch } = useContext(AppContext);
  const { data } = props;

  function handleOnDrop (e) {
    e.preventDefault();
    if (e.target.className === 'EditorPaneMain') {
      props.itemClick(props.data);
    }
    document.removeEventListener('drop', handleOnDrop);
  }

  function handleOnDragStart (e) {
    dispatch({ type: 'drag_el_change', el: data.item });
    document.addEventListener('drop', handleOnDrop);
  }

  function handleOnDragEnd (e) {
    dispatch({ type: 'drag_el_change', el: null });
  }

  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  return <div className="ComponentItem" draggable="true" onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd} onClick={() => props.itemClick(props.data)}>
    <div className="ComponentItemWrap">
      <img className="ComponentIcon" src={data.icon} alt="组件图标"/>
      <p className="ComponentTitle">{data.title}</p>
    </div>
  </div>
};
