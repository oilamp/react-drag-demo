
import React from 'react';

const defaultPorps = {
    text: '我是一段文字',
    defaultStyle: { height: 40 }
};

class EdText extends React.Component {
    render() {
        const config = this.props.config || defaultPorps;
        return <div className="EdText EditorPlugin">{config.text}</div>;
    }
}

EdText.defaultPorps = defaultPorps;
export default EdText;