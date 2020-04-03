import React, { useContext } from 'react';
import './Tools.css';
import AppContext from '../../utils/context';
import ComponentItem from '../ComponentItem';
import { getPluginsClass } from '../../plugins';
import { getElementConfig } from '../../plugins/pluginConfig';
import textLogo from './text.svg';

const componentList = [
  {
    name: 'EdText',
    title: '文字',
    icon: textLogo
  }
];

function Tools() {
  const { state, dispatch } = useContext(AppContext);

  function getPluginProps (elName) {
    let elComponentData = getPluginsClass(elName);
    if (!elComponentData) return {};
    let props = {}
    const { defaultPorps } = elComponentData;
    for (let key in defaultPorps) {
      props[key] = defaultPorps[key];
    }
    return props;
  }

  function handleItemClick (item) {
    let props = getPluginProps(item.name);
    let el = getElementConfig({...item, needProps: props }, {zIndex: state.els.length + 1})
    dispatch({type: 'uuid_change', uuid: el.uuid});
    dispatch({ type: 'els_add', el });
  }

  return (
    <div className="Tools">
      <h4>组件库</h4>
      <div className="ComponentList">{ componentList.map(item => <ComponentItem key={item.name} itemClick={handleItemClick} data={item}></ComponentItem>) }</div>
    </div>
  );
}

export default Tools;
