import React, { useState } from 'react';

import classes from './TagPage.module.scss';

import PictureContainer from './PictureContainer/PictureContainer';

const TagPage = (props) => {
    return (
        <div className={classes.TagPage}>
            <PictureContainer />
            <div className={classes.buttonDiv}>
                <button>下一步</button>
            </div>
        </div>
    )
}

export default TagPage;