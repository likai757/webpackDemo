/**************************************************
 * Created by kaili on 2017/12/27 下午3:38.
 **************************************************/
import React, { PureComponent } from 'react'
import styles from './Greeter.css'

//url-loader set limit 8192 byte file to convert DataURL image
import DataURLImage from '../assets/logo-7k.png'
//More than 8192 byte file convert File and generate a File URL
import URLImage from '../assets/logo-26k.png'

class Greeter extends PureComponent {
  render() {
    return (
      <div className={styles.greeter}>
        <span>{'Hi there and greetings!'}</span>
        <span>this is a DataURL Image</span>
        <img src={DataURLImage} width={50} height={50}/>
        <span>this is a URL Image</span>
        <img src={URLImage} width={400} height={300}/>
      </div>
    )
  }
}

export default Greeter