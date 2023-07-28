import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/playertable.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import * as playerdata from '../data/classof2025data.json';

function headerCell(){
    return(
        <div className={styles.headerCell} id="header">
            <div className={styles.playerInfo}>
                <em>Player Info</em>
            </div>
            <div className={styles.ron3}>
                <em>ON3</em>
            </div>
            <div className={styles.r247}>
                <em>247</em>
            </div>
            <div className={styles.respn}>
                <em>ESPN</em>
            </div>
            <div className={styles.rrivals}>
                <em>Rivals</em>
            </div>
            <div className={styles.commitInfo}>
                <em>Commit Status</em>
            </div>
        </div>
    );
}

function playerCell(data,key){
    return(
        <div className={styles.playerCell} id={key}>
            <div className={styles.playerInfo}>
                <div className={styles.posInfo}>
                    {data["Pos"]}
                </div>
                <div className={styles.locationInfo}>
                    {data["City"]+", "+data["State"]}
                </div>
                <div className={styles.nameInfo}>
                    {data["name"]}
                </div>
            </div>
            <div className={styles.ron3}>
                {data["ON3 Rating"][0]}
            </div>
            <div className={styles.r247}>
                {data["247 Rating"][0]}
            </div>
            <div className={styles.respn}>
                {data["ESPN Rating"][0]}
            </div>
            <div className={styles.rrivals}>
                {data["Rivals Rating"][0]}
            </div>
            {data["Commit Status"]==false?<div className={styles.commitInfo}>Uncommitted</div>:<div className={styles.commitInfo}><b>{data["Commit Status"]}</b></div>}
        </div>
    );
}

export default function Playertable(){
    let data = playerdata["players"];
    return(
        <div className={styles.playerTable}>
            {console.log("DATA processing from JSON file")}
            {headerCell()}
            {data.map((datum,i)=>playerCell(datum,i))}
        </div>
    )    
}