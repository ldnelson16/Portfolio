import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';

function button(link,linktext,dropdown,dropdowncontents,dropdownlinks){
  return (
    <div className={styles.option}>
      <Link href={link}>&nbsp;&nbsp;{dropdown?<>{linktext}&#9660;</>:<>{linktext}</>}&nbsp;&nbsp;</Link>
      {dropdown?(<div className={styles.dropdown}>{dropdowncontents.map((content,index)=><Link href={dropdownlinks[index]}>{content}</Link>)}</div>):(<></>)}
    </div>
  );
}


export default function Navbar() {
  return (
    <div className={styles.bar}>
      {button("/","CFB Recruiting",true,["Recruits Scraper","Create Your Own Composite"],["/","/"])}
      {button("/","Option 2",false)}
    </div>
  )
}