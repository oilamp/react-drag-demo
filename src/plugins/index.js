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