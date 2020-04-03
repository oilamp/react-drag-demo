import React, { useContext } from 'react';
import AppContext from '../../utils/context'
import './EditorShape.css';
import { throttle } from '../../utils/util';
import { getCommonStyle } from '../../plugins/pluginConfig';

const pointList = ['lt', 'rt', 'lb', 'rb', 'l', 'r', 't', 'b'];
const directionKey = {
  t: 'n',
  b: 's',
  l: 'w',
  r: 'e'
};

function EditorShape(props) {
  const { state, dispatch } = useContext(AppContext);

  function getPointStyle (point) {
    const pos = props.defaultStyle;
    const height = pos.height;
    const width = pos.width;
    let hasT = /t/.test(point);
    let hasB = /b/.test(point);
    let hasL = /l/.test(point);
    let hasR = /r/.test(point);
    let newLeft = 0;
    let newTop = 0;
    if (point.length === 2) {
      newLeft = hasL ? 0 : width;
      newTop = hasT ? 0 : height;
    } else {
      if (hasT || hasB) {
        newLeft = width / 2;
        newTop = hasT ? 0 : height;
      }
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width;
        newTop = height / 2 - 5;
      }
    }
    const style = {
      marginLeft: (hasL || hasR) ? '-5px' : 0,
      marginTop: (hasT || hasB) ? '-5px' : 0,
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: point.split('').reverse().map(m => directionKey[m]).join('') + '-resize'
    }
    return style;
  }

  function handleTopWrapperClick (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function handleMouseDownOnElement (e) {
    dispatch({type: 'uuid_change', uuid: props.uuid});
    const pos = {...props.defaultStyle};
    let startY = e.clientY;
    let startX = e.clientX;
    let startTop = pos.top;
    let startLeft = pos.left;
    let firstTime='',lastTime='';
    firstTime = new Date().getTime();
    let move = throttle(moveEvent => {
      moveEvent.stopPropagation();
      moveEvent.preventDefault();

      let currX = moveEvent.clientX;
      let currY = moveEvent.clientY;
      pos.top = currY - startY + startTop;
      pos.left = currX - startX + startLeft;
      props.resize(props.uuid, pos);
    }, 10)
    let up = () => {
      lastTime = new Date().getTime();
      if( (lastTime - firstTime) > 200){
        props.resize(props.uuid, pos);
      }
      document.removeEventListener('mousemove', move, true);
      document.removeEventListener('mouseup', up, true);
    }
    document.addEventListener('mousemove', move, true);
    document.addEventListener('mouseup', up, true);
    return true;
  }

  function handleMouseDownOnPoint (point, e) {
    let downEvent = e;
    dispatch({type: 'uuid_change', uuid: props.uuid});
    downEvent.stopPropagation();
    downEvent.preventDefault();
    const pos = {...props.defaultStyle};
    let height = pos.height;
    let width = pos.width;
    let top = pos.top;
    let left = pos.left;
    let startX = downEvent.clientX;
    let startY = downEvent.clientY;
    let move = throttle(moveEvent => {
      moveEvent.stopPropagation();
      moveEvent.preventDefault();
      let currX = moveEvent.clientX;
      let currY = moveEvent.clientY;
      let disY = currY - startY;
      let disX = currX - startX;
      let hasT = /t/.test(point);
      let hasB = /b/.test(point);
      let hasL = /l/.test(point);
      let hasR = /r/.test(point);
      let newHeight = +height + (hasT ? -disY : hasB ? disY : 0);
      let newWidth = +width + (hasL ? -disX : hasR ? disX : 0);
      pos.height = newHeight > 0 ? newHeight : 0;
      pos.width = newWidth > 0 ? newWidth : 0;
      pos.left = +left + (hasL ? disX : 0);
      pos.top = +top + (hasT ? disY : 0);
      props.resize(props.uuid, pos);
    }, 10)
    let up = () => {
      props.resize(props.uuid, pos);
      document.removeEventListener('mousemove', move, true);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', move, true);
    document.addEventListener('mouseup', up);
  }

  const shapeStyle = getCommonStyle(props.defaultStyle);

  return (
    <div 
      className={`EditorShape ${state.activeUUID === props.uuid ? "active" : ""}`} 
      onClick={(e) => handleTopWrapperClick(e)}
      onMouseDown={(e) => handleMouseDownOnElement(e)}
      style={shapeStyle}>
      {
        pointList.map(item => <div className="EditShapePoint" onMouseDown={(e) => handleMouseDownOnPoint(item, e)} key={item} style={getPointStyle(item)} />)
      }
      { props.children }
    </div>
  );
}

export default EditorShape;
