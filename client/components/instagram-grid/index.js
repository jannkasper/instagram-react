import React from "react";
import Wrapper from "../wrapper";
import { FlexWrapper } from "../flex-wrapper";
import Item from "./item";
import TabGroup from "./tab-group";
import EmptyGallery from "./empty-gallery";
import { Label } from "../Text";


const InstagramGrid = ({ mediaArray, title, setCurrentFeed, useTabGroup }) => {

    const Content = [];
    if (mediaArray && mediaArray.length > 0) {
        for (let index = 0; index <= mediaArray.length; index += 3 ) {
            Content.push(
                <FlexWrapper
                    key={index}
                    justifyContent="space-between"
                    margin="0 0 28px 0"
                >
                    {mediaArray.slice(index, index + 3).map((element, index) => <Item key={index} mediaData={element}/>)}
                </FlexWrapper>
            )
        }
    } else {
        Content.push( <EmptyGallery /> )
    }

    return (
        <Wrapper>
            { useTabGroup ?
                <TabGroup setCurrentFeed={setCurrentFeed} />
                : <Label color="#8e8e8e" additionalStyle={{marginBottom: 20}} >{title}</Label>
            }
            <FlexWrapper
                flexDirection="column"
                justifyContent="center"
            >
                { Content }
            </FlexWrapper>
        </Wrapper>
    )
}
export default InstagramGrid