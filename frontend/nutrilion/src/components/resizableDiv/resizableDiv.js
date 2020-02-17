import React, { useRef, useEffect } from 'react';

import Aux from '../../hoc/Aux/Aux';

import classes from './resizableDiv.module.scss';

//in normal modes, resizing function should be disabled.
//(the dots on the corner should be disable as well);
const ResizableDiv = (props) => {
    console.log(props);
    const resizableContainer = useRef();

    let resDiv = null;

    useEffect(() => {
        resDiv = resizableContainer.current;
        console.log(resDiv);
        console.log(props);

        const setInitailTags = (target) => {
            target.style.width = props.width + 'px';
            target.style.height = props.height + 'px';
    
            target.style.top = props.top + 'px';
            target.style.left = props.left + 'px';
            target.style.position = 'absolute';
            target.style.border = '2px solid green';
        };

        setInitailTags(resDiv);

    }, [props])
    
    const old_div_width_px = props.width;
    const old_div_height_px = props.height;
    const old_div_left_px = props.left;
    const old_div_top_px = props.top;

    let browser_width = document.documentElement.clientWidth;
    let browser_height = document.documentElement.clientHeight;
    let touch_start_x = 0;
    let touch_start_y = 0;

    // const resDiv = document.querySelector(`.${classes.Container}`);
    console.log(resDiv);

    const touch_end = {
        height: props.height,
        width: props.width,
        left: props.left,
        top: props.top
    }

    const onToucStart = (e) => {
        touch_start_x = e.touches[0].pageX;
        touch_start_y = e.touches[0].pageY;
    }

    const onTouchMove = (e, direction) => {
        const touchmove_to_x = e.touches[0].pageX;
        const touchmove_to_y = e.touches[0].pageY;

        if (touchmove_to_x > props.img_onDevice_width + props.img_onDevice_left || touchmove_to_x < props.img_onDevice_left){
            console.log('too wide');
            return;
        } else if (touchmove_to_y < props.img_onDevice_top || touchmove_to_y > props.img_onDevice_top + props.img_onDevice_height){
            console.log('too top');
            return;
        }

        if (direction === 'topLeft'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;

            const new_width = old_div_width_px - changed_distance;
            const new_height = old_div_height_px - changed_distance_y;
            const new_left = old_div_left_px + changed_distance;
            const new_top = old_div_top_px + changed_distance_y;

            resDiv.style.width = new_width + 'px';
            resDiv.style.left = new_left + 'px';
            resDiv.style.top = new_top + 'px';
            resDiv.style.height = new_height + 'px';

            // if (new_left < 0){
            //     if (new_top > 0){
            //         resDiv.style.top = new_top + 'px';
            //         resDiv.style.height = new_height + 'px';
            //     }
            //     console.log('new_left < 0');
            // } else if (new_top < 0){
            //     if (new_left){
            //         resDiv.style.width = new_width + 'px';
            //         resDiv.style.left = new_left + 'px';
            //     }
            //     console.log('new_top < 0');
            // } else {
            //     console.log('1111');

            // }
        } 
        else if (direction === 'topRight'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;

            const new_width = old_div_width_px + changed_distance;
            const new_height = old_div_height_px - changed_distance_y;
            const new_top = old_div_top_px + changed_distance_y;

            resDiv.style.width = new_width + 'px';
            resDiv.style.top = new_top + 'px';
            resDiv.style.height = new_height + 'px';

            // touch_end.width = new_width / props.image_width * 100 + '%';
            // touch_end.height = new_height / props.image_height * 100 + '%';
            // touch_end.top = new_top / props.image_height * 100 + '%';
        } 
        else if (direction === 'bottomLeft'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;
            console.log('changed_distance', changed_distance);

            const new_width = old_div_width_px - changed_distance;
            const new_left = old_div_left_px + changed_distance;
            const new_height = old_div_height_px + changed_distance_y;

            resDiv.style.width = new_width + 'px';
            resDiv.style.left = old_div_left_px + changed_distance + 'px';
            resDiv.style.height = new_height + 'px';

            // touch_end.left = new_left / props.image_width * 100 + '%';
            // touch_end.width = new_width / props.image_width * 100 + '%';
            // touch_end.height = new_height / props.image_height * 100 + '%';
        } 
        else if (direction === 'bottomRight'){
            const changed_distance = touchmove_to_x - touch_start_x;
            const changed_distance_y = touchmove_to_y - touch_start_y;
            console.log('changed_distance_y', changed_distance_y);

            const new_width = old_div_width_px + changed_distance;
            console.log('old_height', old_div_height_px);
            const new_height = old_div_height_px + changed_distance_y;
            console.log(new_height);

            resDiv.style.width = new_width + 'px';
            resDiv.style.height = new_height + 'px';

            // touch_end.width = new_width;
            // touch_end.height = new_height;
        }
    }

    const onTouchEnd = (e) => {
        e.preventDefault();

        if (resDiv.style.top.replace('px', '') / props.img_onDevice_height < 0){
            resDiv.style.top = 0;
        } else if (resDiv.style.left.replace('px', '') / props.img_onDevice_width < 0){
            resDiv.style.left = 0;
        }

        const tag = {
            name: props.name,
            location: {
                left: resDiv.style.left.replace('px', '') / props.img_onDevice_width,
                top: resDiv.style.top.replace('px', '') / props.img_onDevice_height,
                width: resDiv.style.width.replace('px', '') / props.img_onDevice_width,
                height: resDiv.style.height.replace('px', '') / props.img_onDevice_height
            },
            tag_id: props.tag_id
        }

        props.resizeEndHandler(tag);
    }

    let resizers = null;
    if (props.enableResize){
        resizers = (
            // <div className={classes.resizers}>
            //     <div className={classes.TagTitle}>new Tag</div>
            <Aux>
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
                    onTouchEnd={(e) => onTouchEnd(e)}>
                </div>
            </Aux>
            // </div>
        )
    }

    return (
        <div 
            ref={resizableContainer} 
            className={classes.Container}>
            <div className={classes.resizers}>
                <div className={classes.TagTitle}>{props.name}</div>
                {resizers}
            </div>
        </div>
    )
}

export default ResizableDiv;