import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/navbar.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

function navlogo(){
  return (
    <div className={styles.navlogo}><Image priority src="/../public/images/bannerlogo.png" width={300} height={70} alt="Banner Logo with text 'LDNELSON16' and 'Portfolio'"></Image></div>
  );
}

function button(link,linktext,dropdown,dropdowncontents){
  return (
    <div className={styles.option}>
      <Link href={link}>&nbsp;&nbsp;{dropdown?<>{linktext}&#9660;</>:<>{linktext}</>}&nbsp;&nbsp;</Link>
      {dropdown?
        (<>
          <div className={styles.dropdown}>
            {dropdowncontents.map((content)=>(<><Link href={content[1]}>{content[0]}</Link>{content[2]?(<div className={styles.subdropdown}>{content[3].map((con)=>(<Link href={con[1]}>{con[0]}</Link>))}</div>):(<></>)}</>))}
          </div>
        </>):
        (<></>)
      }
    </div>
  );
}


export default function Navbar() {
  return (
    <div className={styles.bar}>
      {navlogo()}
      {button("../pages/cfbrecruiting/sortable.js/","CFB Recruiting",true,[["Sortable Recruits Data","/cfbrecruiting/sortable/"],["Recruits Scraper","/cfbrecruiting/myocomposite/"],["Create Your Own Composite","/",true,[["HI","/"]]]])}
      {button("/posts/first-post","Search Algorithms")}
      {button("/aboutme","About Me",true,[["Portfolio","/"],["About Me","/"],["GitHub Links","/"]])}
    </div>
  )
}