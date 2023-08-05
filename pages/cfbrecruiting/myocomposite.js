import Head from 'next/head';
import { siteTitle } from '../../components/layout';
import Navbar from '../../components/navbar';
import utilStyles from '../../styles/utils.module.css';
import ByoTable from '../../components/byotable';

export default function Page(){
    return(
        <>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Navbar></Navbar>
            <h1>
                Build Your Own Recruiting Composite
            </h1>
            <ByoTable></ByoTable>
        </>
    )
}