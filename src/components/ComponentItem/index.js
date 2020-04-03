import React from 'react';
import './ComponentItem.css';

export default function ComponentItem (props) {
  const { data } = props;

  return <div className="ComponentItem" onClick={() => props.itemClick(props.data)}>
    <div className="ComponentItemWrap">
      <img className="ComponentIcon" src={data.icon} alt="组件图标"/>
      <p className="ComponentTitle">{data.title}</p>
    </div>
  </div>
};
