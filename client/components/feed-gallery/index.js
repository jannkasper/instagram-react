import React from "react";
import Item from "./item-gallery";
import TabGroup from "./tab-group";
import EmptyGallery from "./empty-gallery";
import { Label } from "../text";

import styles from "./page-gallery.module.css";

const FeedGallery = ({ mediaArray, title, setCurrentFeed, useTabGroup }) => {

    const Content = [];
    if (mediaArray && mediaArray.length > 0) {
        for (let index = 0; index <= mediaArray.length; index += 3 ) {
            Content.push(
                <div key={index} className={styles.feedGallery_row}>
                    {mediaArray.slice(index, index + 3).map((element, index) => <Item key={index} mediaData={element}/>)}
                </div>
            )
        }
    } else {
        Content.push( <EmptyGallery /> )
    }

    return (
        <div className={styles.feedGalleryContainer}>
            { useTabGroup ?
                <TabGroup setCurrentFeed={setCurrentFeed} />
                : <Label color="#8e8e8e" additionalStyle={{marginBottom: 20}} >{title}</Label>
            }
            <div className={styles.feedGalleryContent}>
                { Content }
            </div>

        </div>
    )
}
export default FeedGallery