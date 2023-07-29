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

const DatesDropdown = ({dates,setValue,date}) => {
    const handleDropSelection = (event) => {
        console.log("Changed dropdown selection to collect data from "+event.target.options[event.target.selectedIndex].text);
        setValue(event.target.value);
    }
    return(
        <>
            <h2>
                Recruiting Site Data from {date}
            </h2>
            <select className={styles.datedropdown} onChange={handleDropSelection}>
                {dates.map((date,i)=>(<option value={i}>{date}</option>))}
            </select>
        </>
    );
}

const HeaderCell = ({setSort}) => {
    const handleClick = (event) => {
        console.log("Now sorting based on "+event.currentTarget.dataset.value);
        setSort(event.currentTarget.dataset.value);
    }
    return(
        <div className={styles.headerCell} id="header">
            <div className={styles.playerInfo}>
                <em>Player Info</em>
            </div>
            <div className={styles.ron3} data-value="ON3 Rating" onClick={handleClick}>
                <em>ON3</em>
            </div>
            <div className={styles.r247} data-value="247 Rating" onClick={handleClick}>
                <em>247</em>
            </div>
            <div className={styles.respn} data-value="ESPN Rating" onClick={handleClick}>
                <em>ESPN</em>
            </div>
            <div className={styles.rrivals} data-value="Rivals Rating" onClick={handleClick}>
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

function playersort(a,b,sort,value){
    return -1;
}

const PlayerData = ({data,value,sort}) => {
    const newdata = data.slice().sort((a,b)=>playersort(a,b,sort,value));
    console.log("Sorted by "+sort);

    return(
        <>
            {newdata.map((datum,i)=>(<PlayerCell data={datum} index={value} key={i}></PlayerCell>))}
        </>
    );
};

export default function Playertable(){
    const [value,setValue] = useState(0);
    const [sorttype,setSort] = useState("name")
    return(
        <div className={styles.playerTable}>
            <DatesDropdown dates={playerdata["dates"]} setValue={setValue} date={playerdata["dates"][value]}></DatesDropdown>
            {console.log("DATA processing from JSON file")}
            <HeaderCell setSort={setSort}></HeaderCell>
            <PlayerData data={playerdata["players"]} value={value} sort={sorttype}></PlayerData>
        </div>
    )    
}