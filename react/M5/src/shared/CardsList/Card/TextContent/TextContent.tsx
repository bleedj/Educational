import React from 'react';
import { Autor } from './Autor';
import styles from './textcontent.css';
import { Title } from './Title';

export function TextContent() {
  return (
    <div className={styles.textContent}>
      <Autor/>
      <Title/>
    </div>
  );
}
