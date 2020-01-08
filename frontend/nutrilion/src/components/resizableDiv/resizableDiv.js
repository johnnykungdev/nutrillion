import React, { useRef, useEffect } from 'react';

import classes from './resizableDiv.module.scss';

const ResizableDiv = (props) => {
    console.log(props);
    
    const old_div_width_px = props.width.replace('%', '') / 100 * props.image_width;
    const old_div_height_px = props.height.replace('%', '') / 100 * props.image_height;
    const old_div_left_px = props.left.replace('%', '') / 100 * props.image_width;
    const old_div_top_px = props.top.replace('%', '') / 100 * props.image_height;
    const resizableContainer = useRef();

    let browser_width = document.documentElement.clientWidth;
    let browser_height = document.documentElement.clientHeight;
    let touch_start_x = 0;
    let touch_start_y = 0;
    let resDiv = document.querySelector(`.${classes.Container}`);

    const touch_end = {
        height: props.height,
        width: props.width,
        left: props.left,
        top: props.top
    }

    const setInitailTags = (target) => {
        target.style.width = props.width;
        target.style.height = props.height;
        console.log(props.height);
        target.style.top = props.top;
        target.style.left = props.left;
        console.log(props.width);
        console.log('22');
        console.log(target.style.width);
        console.log(target.style.height);
    };

    if (resDiv){
        setInitailTags(resDiv);
    }
 
    useEffect(() => {
        resDiv = resizableContainer.current;
        
        console.log('1');

    }, [props])

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

        if (direction === 'topLeft'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;

            const new_width = old_div_width_px - changed_distance;
            const new_height = old_div_height_px - changed_distance_y;
            const new_left = old_div_left_px + changed_distance;
            const new_top = old_div_top_px + changed_distance_y;

            resDiv.style.width = new_width / props.image_width * 100 + '%';
            resDiv.style.left = new_left / props.image_width * 100 + '%';
            resDiv.style.top = new_top / props.image_height * 100 + '%';
            resDiv.style.height = new_height / props.image_height * 100 + '%';

            touch_end.left = new_left / props.image_width * 100 + '%';
            touch_end.width = new_width / props.image_width * 100 + '%';
            touch_end.height = new_height / props.image_height * 100 + '%';
            touch_end.top = new_top / props.image_height * 100 + '%';
        } 
        else if (direction === 'topRight'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;

            const new_width = old_div_width_px + changed_distance;
            const new_height = old_div_height_px - changed_distance_y;
            const new_top = old_div_top_px + changed_distance_y;
            console.log('new_left:', old_div_left_px + changed_distance);
            console.log('new_width:', new_width);

            resDiv.style.width = new_width / props.image_width * 100 + '%';
            resDiv.style.top = new_top / props.image_height * 100 + '%';
            resDiv.style.height = new_height / props.image_height * 100 + '%';

            touch_end.width = new_width / props.image_width * 100 + '%';
            touch_end.height = new_height / props.image_height * 100 + '%';
            touch_end.top = new_top / props.image_height * 100 + '%';
        } 
        else if (direction === 'bottomLeft'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;
            console.log('changed_distance', changed_distance);

            const new_width = old_div_width_px - changed_distance;
            const new_left = old_div_left_px + changed_distance;
            const new_height = old_div_height_px + changed_distance_y;
            console.log('new_left:', old_div_left_px + changed_distance);
            console.log('new_width:', new_width);

            resDiv.style.width = new_width / props.image_width * 100 + '%';
            resDiv.style.left = (old_div_left_px + changed_distance) / props.image_width * 100 + '%';
            resDiv.style.height = new_height / props.image_height * 100 + '%';

            touch_end.left = new_left / props.image_width * 100 + '%';
            touch_end.width = new_width / props.image_width * 100 + '%';
            touch_end.height = new_height / props.image_height * 100 + '%';
        } 
        else if (direction === 'bottomRight'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;
            console.log('changed_distance', changed_distance);

            const new_width = old_div_width_px + changed_distance;
            const new_height = old_div_height_px + changed_distance_y;
            console.log('new_left:', old_div_left_px + changed_distance);
            console.log('new_width:', new_width);

            resDiv.style.width = new_width / props.image_width * 100 + '%';
            resDiv.style.height = new_height / props.image_height * 100 + '%';

            touch_end.width = new_width / props.image_width * 100 + '%';
            touch_end.height = new_height / props.image_height * 100 + '%';
        }
    }

    const onTouchEnd = (e, box_id) => {
        e.preventDefault();
        touch_end.image_height = props.image_height;
        props.setTagPos(box_id, touch_end);
    }

    const resDivStyle = {
        'border': '2px solid green',
        'boxSizing': 'border-box',
        'position': 'absolute',
        'zIndex': '100',
        'width': `${props.width}`,
        'height': `${props.height}`,
        'top': `${props.top}`,
        'left': `${props.left}`
    }

    return (
        <div ref={resizableContainer} className={classes.Container} style={resDivStyle}>
            <div className={classes.resizers}>
                <div className={classes.TagTitle}>new Tag</div>
                <div 
                    className={`${classes.resizer} ${classes.topLeft}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'topLeft')}
                    onTouchEnd={(e) => onTouchEnd(e, props.box_id)}>
                </div>
                <div 
                    className={`${classes.resizer} ${classes.topRight}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'topRight')}
                    onTouchEnd={(e) => onTouchEnd(e, props.box_id)}>
                </div>
                <div 
                    className={`${classes.resizer} ${classes.bottomLeft}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'bottomLeft')}
                    onTouchEnd={(e) => onTouchEnd(e, props.box_id)}>
                </div>
                <div className={`${classes.resizer} ${classes.bottomRight}`}
                    onTouchStart={(e) => onToucStart(e)}
                    onTouchMove={(e) => onTouchMove(e, 'bottomRight')}
                    onTouchEnd={(e) => onTouchEnd(e, props.box_id)}>
                </div>
            </div>
        </div>
    )
}

export default ResizableDiv;