import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/playertable.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useState } from 'react';
import * as playerdata from '../data/classof2025data.json';

void function changeDates(value,index){
    console.log("Changing dates to "+value);

}

const DatesDropdown = ({dates,setValue}) => {
    const handleDropSelection = (event) => {
        console.log("Changed dropdown selection to collect data from "+event.target.options[event.target.selectedIndex].text);
        setValue(event.target.value);
    }
    return(
        <select className={styles.datedropdown} onChange={handleDropSelection}>
            {dates.map((date,i)=>(<option value={i}>{date}</option>))}
        </select>
    );
}

const HeaderCell = ({}) => {
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

const PlayerCell = ({data,key,index}) => {
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
                {data["ON3 Rating"][index]}
            </div>
            <div className={styles.r247}>
                {data["247 Rating"][index]}
            </div>
            <div className={styles.respn}>
                {data["ESPN Rating"][index]}
            </div>
            <div className={styles.rrivals}>
                {data["Rivals Rating"][index]}
            </div>
            {data["Commit Status"]==false?<div className={styles.commitInfo}>Uncommitted</div>:<div className={styles.commitInfo}><b>{data["Commit Status"]}</b></div>}
        </div>
    );
};

export default function Playertable(){
    const [value,setValue] = useState(0);
    return(
        <div className={styles.playerTable}>
            <DatesDropdown dates={playerdata["dates"]} setValue={setValue}></DatesDropdown>
            {console.log("DATA processing from JSON file")}
            <HeaderCell></HeaderCell>
            {playerdata["players"].map((datum,i)=>(<PlayerCell data={datum} key={i} index={value}></PlayerCell>))}
        </div>
    )    
}