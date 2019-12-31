import React, { useRef, useEffect } from 'react';

import classes from './resizableDiv.module.scss';

const ResizableDiv = (props) => {
    const resizableContainer = useRef();

    let browser_width = document.documentElement.clientWidth;
    let browser_height = document.documentElement.clientHeight;
    let touch_start_x = 0;
    let touch_start_y = 0;
    let resDiv = null;
    let old_div_width_px = null;
    let old_div_height_px = null;
    let old_div_left_px = null;
    let old_div_right_px = null;
    let old_div_top_px = null;
    let old_div_bottom_px = null;

    let div_end_left = null;
    let div_end_width = null;
    let div_end_right = null;
    let div_end_top = null;
    let div_end_height = null;

    useEffect(() => {
        resDiv = resizableContainer.current;
        old_div_width_px = resDiv.getBoundingClientRect().width;
        old_div_height_px = resDiv.getBoundingClientRect().height;
        old_div_left_px = resDiv.getBoundingClientRect().left - 0.1 * browser_width;
        old_div_right_px = resDiv.getBoundingClientRect().left - 0.9 * browser_width;
        old_div_top_px = resDiv.getBoundingClientRect().top;
        console.log(old_div_top_px);
        console.log(browser_height);
    }, [])

    const onToucStart = (e) => {

        touch_start_x = e.touches[0].pageX;
        touch_start_y = e.touches[0].pageY;
        console.log(touch_start_x);
        console.log(old_div_width_px);

        let last_move_x = null;
        
        resDiv = resizableContainer.current;
    }

    const onTouchMove = (e, direction) => {
        const touchmove_to_x = e.touches[0].pageX;
        const touchmove_to_y = e.touches[0].pageY;
        
        console.log(old_div_width_px);
        console.log('old_div_left', old_div_left_px);

        if (direction === 'topLeft'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;

            const new_width = old_div_width_px - changed_distance;
            const new_height = old_div_height_px - changed_distance_y;
            const new_left = old_div_left_px + changed_distance;
            const new_top = old_div_top_px + changed_distance_y;

            resDiv.style.width = new_width / browser_width * 100 + 'vw';
            resDiv.style.left = new_left / browser_width * 100 + 'vw';
            resDiv.style.top = new_top / browser_height * 100 + 'vh';
            resDiv.style.height = new_height / browser_height * 100 + 'vh';

            div_end_left = new_left;
            div_end_width = new_width;
            div_end_height = new_height;
            div_end_top = new_top;
        } else if (direction === 'topRight'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;
            console.log('changed_distance', changed_distance);

            const new_width = old_div_width_px + changed_distance;
            const new_height = old_div_height_px - changed_distance_y;
            const new_top = old_div_top_px + changed_distance_y;
            console.log('new_left:', old_div_left_px + changed_distance);
            console.log('new_width:', new_width);

            resDiv.style.width = new_width / browser_width * 100 + 'vw';
            resDiv.style.top = new_top / browser_height * 100 + 'vh';
            resDiv.style.height = new_height / browser_height * 100 + 'vh';

            div_end_left = old_div_left_px;
            div_end_width = new_width;
            div_end_height = new_height;
            div_end_top = new_top;
        } else if (direction === 'bottomLeft'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;
            console.log('changed_distance', changed_distance);

            const new_width = old_div_width_px - changed_distance;
            const new_left = old_div_left_px + changed_distance;
            const new_height = old_div_height_px + changed_distance_y;
            console.log('new_left:', old_div_left_px + changed_distance);
            console.log('new_width:', new_width);

            resDiv.style.width = new_width / browser_width * 100 + 'vw';
            resDiv.style.left = (old_div_left_px + changed_distance) / browser_width * 100 + 'vw';
            resDiv.style.height = new_height / browser_height * 100 + 'vh';

            div_end_left = new_left;
            div_end_width = new_width;
            div_end_height = new_height;
            div_end_top = old_div_top_px;
        } else if (direction === 'bottomRight'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;
            console.log('changed_distance', changed_distance);

            const new_width = old_div_width_px + changed_distance;
            const new_height = old_div_height_px + changed_distance_y;
            console.log('new_left:', old_div_left_px + changed_distance);
            console.log('new_width:', new_width);

            resDiv.style.width = new_width / browser_width * 100 + 'vw';
            resDiv.style.height = new_height / browser_height * 100 + 'vh';


            div_end_left = old_div_left_px;
            div_end_width = new_width;
            div_end_height = new_height;
            div_end_top = old_div_top_px;
        }
    }

    const onTouchEnd = () => {
        old_div_left_px = div_end_left;
        old_div_top_px = div_end_top;
        old_div_width_px = div_end_width;
        old_div_height_px = div_end_height;
        console.log('1');
    }

    return (
        <div ref={resizableContainer} className={classes.Container}>
            <div className={classes.resizers}>
                <div 
                    className={`${classes.resizer} ${classes.topLeft}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'topLeft')}
                    onTouchEnd={() => onTouchEnd()}>
                </div>
                <div 
                    className={`${classes.resizer} ${classes.topRight}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'topRight')}
                    onTouchEnd={() => onTouchEnd()}>
                </div>
                <div 
                    className={`${classes.resizer} ${classes.bottomLeft}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'bottomLeft')}
                    onTouchEnd={() => onTouchEnd()}>
                </div>
                <div className={`${classes.resizer} ${classes.bottomRight}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'bottomRight')}
                    onTouchEnd={() => onTouchEnd()}>
                </div>
            </div>
        </div>
    )
}

export default ResizableDiv;

//zzsd