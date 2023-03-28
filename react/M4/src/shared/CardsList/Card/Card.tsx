import React from 'react';
import styles from './card.css';
import { Controls } from './Controls';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { TextContent } from './TextContent';

export function Card() {
  return (
    <a href="#post-url">
      <div className={styles.card}>
        <TextContent></TextContent>
        <Preview></Preview>
        <Controls></Controls>
        <Menu></Menu>
    </div>
    </a>
    
  );
}
