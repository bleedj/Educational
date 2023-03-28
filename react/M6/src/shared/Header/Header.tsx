import React from 'react';
import styles from './header.css';
import { Navbar } from './Navbar';
import { SearchBlock } from './SearchBlock';
import { SortBlock } from './SortBlock';
import { ThreadTitle } from './ThreadTitle';

export function Header() {
  return (
    <header className={styles.header}>
      <SearchBlock />
      <ThreadTitle></ThreadTitle>
      <SortBlock></SortBlock>
      <Navbar></Navbar>
    </header>
  );
}
