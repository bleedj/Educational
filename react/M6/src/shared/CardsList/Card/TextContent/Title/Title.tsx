import React from 'react';
import styles from './title.css';

export function Title() {
  return (
    <h2 className={styles.title}>
      <a href="#post-url">
        Следует отметить, что новая модель организационной деятельности...
      </a>
    </h2>
  );
}
