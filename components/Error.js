import React from 'react';
import styles from './style.js';

export default Error = (props) => {
    return(
      <div style={styles.error} dangerouslySetInnerHTML={{ __html: props.children }}></div>
    );
}
