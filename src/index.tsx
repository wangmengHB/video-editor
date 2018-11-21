import * as React from 'react';
import * as ReactDOM from 'react-dom';
import VideoEditor from './video-editor';


const rootContainer = document.createElement('div');
rootContainer.id = 'react-content';
document.body.appendChild(rootContainer);



ReactDOM.render(
  <VideoEditor/>,
  rootContainer
)




