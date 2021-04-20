import {render} from 'react-dom';
import {createElement} from 'react'
import {Boot} from './boot'

const main = document.querySelector('#app');

if (main){
  render(createElement(Boot, {}), main);
}
