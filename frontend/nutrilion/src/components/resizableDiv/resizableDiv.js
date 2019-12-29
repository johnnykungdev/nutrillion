import React from 'react';

import classes from './resizableDiv.module.scss';

const resizableDiv = (props) => {
    const resizeContainer = (event) => {
        
    }

    return (
        <div className={classes.Container}>
            <div className={classes.resizers}>
                <div className={`${classes.resizer} ${classes.topLeft}`}></div>
                <div className={`${classes.resizer} ${classes.topRight}`}></div>
                <div className={`${classes.resizer} ${classes.bottomLeft}`}></div>
                <div className={`${classes.resizer} ${classes.bottomRight}`}></div>
            </div>
        </div>
    )
}

export default resizableDiv;