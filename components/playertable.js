import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/playertable.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import playerdata from '../data/classof2025data.json'

function playerCell(data,key){
    return(
        <div className={styles.playerCell} id={key}>
            <div className={styles.playerinfo}>
                {data["name"]+data["Pos"]}
            </div>
            {data["name"]+data["ON3 Rating"]}
        </div>
    );
}

export default function Playertable(){
    let data = playerdata["players"];
    return(
        <div className={styles.playerTable}>
            {console.log("DATA processing from JSON file")}
            {data.map((datum,i)=>playerCell(datum,i))}
        </div>
    )    
}