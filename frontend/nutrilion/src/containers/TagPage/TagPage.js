import React, { useState } from 'react';

import classes from './TagPage.module.scss';

import PictureContainer from './PictureContainer/PictureContainer';

const TagPage = (props) => {
    return (
        <div className={classes.TagPage}>
            <PictureContainer />
        </div>
    )
}

export default TagPage;