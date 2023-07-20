import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React from 'react';

function button(link,linktext,dropdown,dropdowncontents){
  return (
    <div className={styles.option}>
      <Link href={link}>&nbsp;&nbsp;{dropdown?<>{linktext}&#9660;</>:<>{linktext}</>}&nbsp;&nbsp;</Link>
      {dropdown?(<><div className={styles.dropdown}>{dropdowncontents.map((content)=>(<><Link href={content[1]}>{content[0]}</Link><>{content[2]?(<div className={styles.subdropdown}>{content[3].map((con)=>(<Link href={con[1]}>{con[0]}</Link>))}</div>):(<></>)}</></>))}</div><></></>):(<></>)}
    </div>
  );
}


export default function Navbar() {
  return (
    <div className={styles.bar}>
      {button("/","CFB Recruiting",true,[["Recruits Scraper","/"],["Create Your Own Composite","/",true,["HI","ii"]]])}
      {button("/posts/first-post","Search Algorithms",false)}
    </div>
  )
}