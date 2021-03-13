import React from "react";
import Header from "./layout-header";
import { FlexWrapper } from "../flex-wrapper";

const Layout = ({children}) => {

    return (
        <>
            <FlexWrapper
                position="fixed"
                justifyContent="center"
                height="54px"
                width="100%"
                other={{ background: "#fff", borderBottom: "solid 1px #dbdbdb", zIndex: 3 }}
            >
                <Header />
            </FlexWrapper>

            <FlexWrapper
                flexDirection="column"
                justifyContent="center"
                width="100%"
                maxWidth="975px"
                top="54px"
                margin="0 auto"
                padding="30px 20px 0 20px"
            >
                {children}
            </FlexWrapper>
        </>
    )
}

export default Layout