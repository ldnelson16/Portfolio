import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/byotable.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { useState } from 'react';
import * as playerdata from '../data/classof2024data.json';

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
    const handlePercentages = () => {
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
        console.log("% Data after percentChange ");
        console.log(percentdata);
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
    const sortComposite = () => {
        console.log("Sorting by composite");
        setSort("Composite");
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
            <div className={styles.compositeInfo} onClick={sortComposite}>
                <em>Composite</em>
            </div>
        </div>
    );
} 

function calculateComposite(percentdata,ranks,mins){
    const {ron3,r247,respn,rrivals} = percentdata;
    var total = Number(ron3)+Number(r247)+Number(respn)+Number(rrivals);
    total = total.toFixed(2);
    if(total!=100){return "";}
    ranks.map((ele,i)=>{if((ele)=="-"){if(i!=3){ranks[i]=mins[i]-1;}else{ranks[i]=mins[i]-.1}}});
    const val = ranks[0]*ron3/100+ranks[1]*r247/100+ranks[2]*respn/100+(ranks[3]-2.1)*rrivals/4;
    return val.toFixed(3);
}

const PlayerCell = ({data,key,index,percentdata,mins}) => {
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
                {calculateComposite(percentdata,[data["ON3 Rating"][index],data["247 Rating"][index],data["ESPN Rating"][index],data["Rivals Rating"][index]],mins)}
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
    //Find mins for composite processing
    var mins = [100,100,100,6.1];
    ["ON3 Rating","247 Rating","ESPN Rating","Rivals Rating"].map((item,i)=>{
        data.map((ele)=>{
            if(ele[item][value]!="-"&&Number(ele[item][value])<mins[i]){mins[i]=Number(ele[item][value]);}
        })
    });
    if(sort!="Composite"){var newdata = data.slice().sort((a,b)=>playersort(a,b,sort,value));}
    else{var newdata=data.slice().sort((a,b)=>calculateComposite(percentdata,[b["ON3 Rating"][value],b["247 Rating"][value],b["ESPN Rating"][value],b["Rivals Rating"][value]],mins)-calculateComposite(percentdata,[a["ON3 Rating"][value],a["247 Rating"][value],a["ESPN Rating"][value],a["Rivals Rating"][value]],mins))}
    newdata=newdata.filter((obj)=>obj["ON3 Rating"][value]!="-"||obj["247 Rating"][value]!="-"||obj["ESPN Rating"][value]!="-"||obj["Rivals Rating"][value]!="-");
    console.log("Sorted by "+sort);
    console.log("% Data in PlayerData");

    return(
        <>
            {newdata.map((datum,i)=>(<PlayerCell data={datum} index={value} key={i} percentdata={percentdata} mins={mins}></PlayerCell>))}
        </>
    );
};

export default function ByoTable(){
    const [value,setValue] = useState(0);
    const [sorttype,setSort] = useState("name");
    const [percentdata,setPercent] = useState({ron3:0,r247:0,respn:0,rrivals:0});
    const [mins,setMins] = useState({ron3:100,r247:100,respn:100,rrivals:6.1});
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