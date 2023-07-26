import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/playertable.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import playerdata from '../data/classof2025data.json'

function playerCell(data,key){
    return(
        <div className={styles.playerCell} id={key}>
            {data["name"]+data["ON3 Rating"]}
        </div>
    );
}

export default function playerTable(){
    return(
        {playerdata["players"].map((object,i)=>playerCell(object,i))}
    );    
}