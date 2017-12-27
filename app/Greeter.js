/**************************************************
 * Created by kaili on 2017/12/27 下午3:38.
 **************************************************/
import React, { PureComponent } from 'react'
import styles from './Greeter.css'

class Greeter extends PureComponent {
  render() {
    return (
      <div className={styles.greeter}>
        {'Hi there and greetings!'}
      </div>
    )
  }
}

export default Greeter