import React from 'react';
import Text from './Text';

const components = {
    EdText: Text
}

export function getPlugins (el) {
    const CustomComponents = getPluginsClass(el.name);
    return <CustomComponents config={el.propsValue}/>;
}

export function getPluginsClass (elName) {
    return components[elName];
}

export function getPluginProps (elName) {
    let elComponentData = getPluginsClass(elName);
    if (!elComponentData) return {};
    let props = {}
    const { defaultPorps } = elComponentData;
    for (let key in defaultPorps) {
      props[key] = defaultPorps[key];
    }
    return props;
  }