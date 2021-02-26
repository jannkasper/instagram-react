import Link from 'next/link'
import Layout from "../components/layout";

export default function FourOhFour() {
    return <Layout>
        <div style={{
            padding: '20px',
            textAlign: 'center',
        }}>
            <h2>Sorry, this page isn't available.</h2>
            <Link href="/barked">
                <p style={{marginTop: '40px', cursor: 'pointer'}}>
                    The link you followed may be broken, or the page may have been removed. Go back to Instagram.
                </p>
            </Link>
        </div>

    </Layout>
}