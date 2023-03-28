import React from 'react';
import { TimeMark } from './TimeMark';
import styles from './autor.css';

export function Autor() {
  return (
    <div className={styles.autor}>
      <div className={styles.imgDiv}>
      </div>
      <a className={styles.link} href="#user-url">Владимир Петров</a>
      <TimeMark></TimeMark>
    </div>
  );
}
