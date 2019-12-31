import React, { useState }from 'react';

import trialImg from './trial_img_1.jpg';
import ResizableDiv from '../../../components/resizableDiv/resizableDiv';

import classes from './PictureContainer.module.scss';

const PictureContainer = (props) => {
    const [ isTagging, setIsTaggin ] = useState(false);

    const getClickPos = (event) => {
        const e = event || window.event;
        console.log(`x: ${e.pageX}`, `y: ${e.pageY}`)
    }
    

    return (
        <div onClick={(e) => getClickPos(e)}className={classes.PictureContainer}>
            <img src={trialImg} className={classes.Image}/>
            <div className={classes.tagBox}></div>
            <ResizableDiv />
        </div>
    )
}

export default PictureContainer;