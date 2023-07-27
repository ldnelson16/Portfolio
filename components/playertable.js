import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/playertable.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import playerdata from '../data/classof2025data.json'

function playerCell(data,key){
    return(
        <div className={styles.playerCell} id={key}>
            <div className={styles.playerInfo}>
                <div className={styles.nameInfo}>
                    {data["name"]}
                </div>
                <div className={styles.relatedInfo}>
                    {data["name"]+data["ON3 Rating"]}
                </div>
            </div>
            <div className={styles.ron3}>
                {data["ON3 Rating"]}
            </div>
            <div className={styles.r247}>
                {data["247 Rating"]}
            </div>
            <div className={styles.respn}>
                {data["ESPN Rating"]}
            </div>
            <div className={styles.rrivals}>
                {data["Rivals Rating"]}
            </div>
        </div>
    );
}

export default function Playertable(){
    let data = playerdata["players"];
    return(
        <div className={styles.playerTable}>
            {console.log("DATA processing from JSON file")}
            {playerCell({"name":"Name","ON3 Rating":"ON3","247 Rating":"247","ESPN Rating":"ESPN","Rivals Rating":"Rivals","Pos":"Pos:","City":"City","State":"State","Committ Status":"Commit"},-1)}
            {data.map((datum,i)=>playerCell(datum,i))}
        </div>
    )    
}