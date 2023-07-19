import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

function button(link,linktext,dropdown,dropdowncontents,dropdownlinks){
  return (
    <div className={styles.option}>
      <Link href={link}>{linktext}</Link>
      <div class
      {dropdown?(<div className="dropdown">)+dropdowncontents.map((content,index) => (<Link href={dropdownlinks[index]}>{content}</Link>)</div>):(<></>)}
    </div>
  );
}


export default function Navbar() {
  return (
    <div className={styles.bar}>
      {button("/","Option 1")}
    </div>
  )
}