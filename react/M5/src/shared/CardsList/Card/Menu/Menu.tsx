import React, { useEffect, useRef } from 'react';
import { Dropdown } from '../../../Dropdown';
import styles from './menu.css';
import { CommentButton } from './Options/CommentButton';
import { HideButton } from './Options/HideButton';
import { ReportButton } from './Options/ReportButton';
import { SaveButton } from './Options/SaveButton';
import { ShareButton } from './Options/ShareButton';



export function Menu(): JSX.Element {
  const [isOpen, SetIsOpen] = React.useState(false)
  const handler = () => {
    SetIsOpen(!isOpen)
  }
  return (
    <div>
      <div className={styles.menuDiv} onClick={handler}>
          <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="17.5" cy="2.5" r="2.5" transform="rotate(90 17.5 2.5)" fill="#D9D9D9"/>
          <circle cx="10" cy="2.5" r="2.5" transform="rotate(90 10 2.5)" fill="#D9D9D9"/>
          <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(90 2.5 2.5)" fill="#D9D9D9"/>
          </svg>
      </div>
      {isOpen && <Dropdown onClick={handler}></Dropdown>}
    </div>
  );
}
