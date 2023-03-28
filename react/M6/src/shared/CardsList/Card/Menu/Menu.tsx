import React, { useEffect, useRef } from 'react';
import { Dropdown } from '../../../Dropdown';
import { MenuIcon } from '../../../icons';
import styles from './menu.css';



export function Menu(): JSX.Element {
  const [isOpen, SetIsOpen] = React.useState(false)
  const handler = () => {
    SetIsOpen(!isOpen)
  }
  return (
    <div>
      <div className={styles.menuDiv} onClick={handler}>
          <MenuIcon/>
      </div>
      {isOpen && <Dropdown onClick={handler} ></Dropdown>}
    </div>
  );
}
