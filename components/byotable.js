import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/byotable.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useState } from 'react';
import * as playerdata from '../data/classof2025data.json';

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

const CompositeWeight = ({percentdata,setPercent}) => {
    const handlePercentages = (event) => {
        console.log("Percentages submitted");
        const {ron3,r247,respn,rrivals} = percentdata;
        var total = Number(ron3)+Number(r247)+Number(respn)+Number(rrivals);
        total = total.toFixed(2);
        if(total==100){console.log("Percents Valid");}
        else{console.log("Percents Invalid");}
    }
    const percentChange = (event) => {
        console.log("Percent changed");
        const{name,value}=event.target;
        setPercent((percentdata)=>({...percentdata,[name]:value}));
    }

    return(
        <>
            <div className={styles.weightSelection}>
                <input type="number" id="ON3 Weight" name="ron3" min="0" max="100" step="0.1" placeholder="ON3" onChange={percentChange}></input>
                <input type="number" id="247 Weight" name="r247" min="0" max="100" step="0.1" placeholder="247" onChange={percentChange}></input>
                <input type="number" id="ESPN Weight" name="respn" min="0" max="100" step="0.1" placeholder="ESPN" onChange={percentChange}></input>
                <input type="number" id="Rivals Weight" name="rrivals" min="0" max="100" step="0.1" placeholder="Rivals" onChange={percentChange}></input>
                <button onClick={handlePercentages}>Submit</button>
            </div>
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
            <div className={styles.playerInfo} data-value="name" onClick={handleClick}>
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
            <div className={styles.compositeInfo}>
                <em>Composite</em>
            </div>
        </div>
    );
} 

function calculateComposite(percentdata,ron3,r247,respn,rrivals){
    const {rron3,rr247,rrespn,rrrivals} = percentdata;
    if(rron3==0)
    var total = Number(rron3)+Number(rr247)+Number(rrespn)+Number(rrrivals);
    //total = total.toFixed(2);
    if(total!=100){return ""}
    return 100;
}

var min = 100;

const PlayerCell = ({data,key,index,percentdata}) => {
    if(data["ON3 Rating"][index]!="-"&&Number(data["ON3 Rating"][index]<min)){min=Number(data["ON3 Rating"][index]);}
    console.log("min="+min);
    
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
            {data["Commit Status"][index]==false?<div className={styles.commitInfo}>Uncommitted</div>:data["Commit Status"][index]=="No Data Yet"?<div className={styles.commitInfo}>No Data</div>:<div className={styles.commitInfo}><b>{data["Commit Status"][index]}</b></div>}
            <div className={styles.compositeInfo}>
                {calculateComposite(percentdata,data["ON3 Rating"],data["247 Rating"],data["ESPN Rating"],data["Rivals Rating"])}
            </div>
        </div>
    );
};

function playersort(a,b,sort,value,reverse=false){
    let ret;
    if(a[sort][value]=="-" && b[sort][value]=="-"){ret=0;}
    else if (a[sort][value]=="-"){ret=1}
    else if (b[sort][value]=="-"){ret=-1}
    else {ret=b[sort][value]-a[sort][value];}
    if(!reverse){return ret}
    else{return -ret}
}

const PlayerData = ({data,value,sort,percentdata}) => {
    var newdata = data.slice().sort((a,b)=>playersort(a,b,sort,value));
    newdata=newdata.filter((obj)=>obj["ON3 Rating"][value]!="-"||obj["247 Rating"][value]!="-"||obj["ESPN Rating"][value]!="-"||obj["Rivals Rating"][value]!="-");
    console.log("Sorted by "+sort);

    return(
        <>
            {newdata.map((datum,i)=>(<PlayerCell data={datum} index={value} key={i} percentdata={percentdata}></PlayerCell>))}
        </>
    );
};

export default function ByoTable(){
    const [value,setValue] = useState(0);
    const [sorttype,setSort] = useState("name");
    const [percentdata,setPercent] = useState({ron3:0,r247:0,respn:0,rrivals:0});
    return(
        <div className={styles.playerTable}>
            <DatesDropdown dates={playerdata["dates"]} setValue={setValue} date={playerdata["dates"][value]}></DatesDropdown>
            <CompositeWeight percentdata={percentdata} setPercent={setPercent}></CompositeWeight>
            {console.log("DATA processing from JSON file")}
            <HeaderCell setSort={setSort}></HeaderCell>
            <PlayerData data={playerdata["players"]} value={value} sort={sorttype} percentdata={percentdata}></PlayerData>
        </div>
    )    
}