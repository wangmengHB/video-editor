import * as React from 'react';
import { debug } from 'util';
const VIDEO_SRC = require('../../assets/test.mp4');
const IMG_1 = require('../../assets/img_1.jpg');
const IMG_2 = require('../../assets/img_2.png');

const style = require('./index.less');

const WIDTH = 400;
const HEIHGT = 300;


export default class VideoEditor extends React.Component {

  timer = null;
  currentTime = 0;

  componentDidMount () {
    const {layer1, layer2, layer3, img1, img2, video} = this.refs;

    img1.addEventListener('load', this.imageLoad.bind(this, img1, layer1));
    img2.addEventListener('load', this.imageLoad.bind(this, img2, layer2))

    window._layer2 = layer2;
    window._layer1 = layer1;
    window._video = video;

    video.addEventListener('playing', this.videoPlay.bind(this, video, layer3));
    video.addEventListener('pause', this.videoPause.bind(this, video, layer3));
  }

  imageLoad = (node, target) => {
    const context = target.getContext('2d');
    context.drawImage(node, 0, 0, WIDTH, HEIHGT);
  }

  videoPlay = (node, target) => {
    const context = target.getContext('2d');
    this.timer = setInterval(() => {
      context.drawImage(node, 0, 0, WIDTH, HEIHGT);
      blankCenterZone(target);
    }, 10)
  }

  videoPause = (node, target) => {
    const context = target.getContext('2d');
    clearInterval(this.timer);
    this.timer = null;

  }



  render () {
    return (
      <div className={style.container}>
        <div className={style.source}>
          <video ref="video" controls width={WIDTH} height={HEIHGT} src={VIDEO_SRC}/>
          <img ref="img1" width={WIDTH} height={HEIHGT} src={IMG_1}/>
          <img ref="img2" width={WIDTH} height={HEIHGT} src={IMG_2}/>
        </div>
        <div className={style.display}>
          <canvas className={style.layer} width={WIDTH} height={HEIHGT} ref="layer1"/>
          <canvas className={style.layer} width={WIDTH} height={HEIHGT} ref="layer2"/>
          <canvas className={style.layer} width={WIDTH} height={HEIHGT} ref="layer3"/>
        </div>

      </div>
    )
  }
}

const THRED = 20;

function blankCenterZone (layer) {
  const context = layer.getContext('2d');
  const imageData = context.getImageData(0, 0, WIDTH, HEIHGT);
  

  for (let y = 0; y < HEIHGT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let index = y * WIDTH * 4 + x * 4
      
      if (imageData.data[index] < THRED &&
        imageData.data[index + 1] < THRED &&
        imageData.data[index + 2] < THRED
        
      ) {
        // imageData.data[index] = 0;
        // imageData.data[index + 1] = 0;
        // imageData.data[index + 2] = 0;
        imageData.data[index + 3] = 0;
      }

    }
  }

  context.putImageData(imageData, 0, 0);

}

window._blank = blankCenterZone;
