import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import Navbar from '../../components/navbar';
import utilStyles from '../../styles/utils.module.css';
import playerTable from '../../components/playertable'

export default function Page(){
    return(
        <>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Navbar></Navbar>
            <h1>Heading</h1>
            <playerTable></playerTable>
            
        </>
    );
}