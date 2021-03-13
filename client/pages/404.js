import Link from 'next/link'
import Layout from "../components/layout";
import Wrapper from "../components/wrapper";

export default function FourOhFour() {
    return <Layout>
        <Wrapper
            padding="20px"
            other={{ textAlign: "center"}}
        >
            <h2>Sorry, this page isn't available.</h2>
            <Link href="/">
                <p style={{marginTop: '40px', cursor: 'pointer'}}>
                    The link you followed may be broken, or the page may have been removed. Go back to Instagram.
                </p>
            </Link>
        </Wrapper>

    </Layout>
}