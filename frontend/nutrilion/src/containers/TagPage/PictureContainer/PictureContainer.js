import React, { useRef, useState, useEffect } from 'react';

import trialImg from './trial_img_1.jpg';
import ResizableDiv from '../../../components/resizableDiv/resizableDiv';

import classes from './PictureContainer.module.scss';

const PictureContainer = (props) => {
    console.log(props);
    const [ addedTag, setAddedTag ] = [ props.addedTag, props.setAddedTag ] ;

    const [ editedTag, setEditedTag ] = [ props.editedTag, props.setEditedTag ] ;

    const img_real_width = props.MLR.img_width;
    const img_real_height = props.MLR.img_height;

    const image_info = document.querySelector(`.${classes.Image}`);
    console.log(image_info);

    const imageRef = useRef();


    const resizeEndHandler = (tag_obj) => {
        if (props.mode === 'adding'){
            setAddedTag(tag_obj);
        } else if (props.mode === 'editing'){
            setEditedTag(tag_obj);
            const edited_tag_id = editedTag.tag_id;
            const cloned_MLR = {...props.MLR};
            // const target_tag = cloned_MLR.foods.find(tag => tag.tag_id === editedTag.tag_id);
            const target_tag_index = cloned_MLR.foods.findIndex(tag => tag.tag_id === editedTag.tag_id);
            // target_tag = tag_obj;
            cloned_MLR.foods[target_tag_index] = tag_obj;
            props.setMLR(cloned_MLR);
        }
    }

    const generateTagBoxs = (mode) => {
        if (mode === 'normal'){
            const foods = props.MLR.foods;

            if (foods){
                const tagBoxs = foods.map(food => {
                    const img_onDevice_height = image_info.getBoundingClientRect().height;
                    const img_onDevice_width = image_info.getBoundingClientRect().width;

                    //the unit px should be added in resizableDiv component to display 
                    const height = food.location.height * img_onDevice_height;
                    const width = food.location.width * img_onDevice_width;
                    const top = food.location.top * img_onDevice_height;
                    const left = food.location.left * img_onDevice_width;

                    console.log(food.location.height);
                    console.log(img_onDevice_height);
                    console.log(height);
    
                    if (food.location.x + food.location.width > img_real_width || food.location.y + food.location.height > img_real_height){
                        return false;
                    }

                    return (
                        <ResizableDiv 
                            name={food.name}
                            height={height}
                            width={width}
                            top={top}
                            left={left}
                            enableResize={false} 
                            img_onDevice_height={img_onDevice_height}
                            img_onDevice_width={img_onDevice_width} />
                    );
                });
                return tagBoxs;
            } else {
                return ;
            }
        } else if (mode === 'adding'){
            if (addedTag){
                const img_onDevice_height = image_info.getBoundingClientRect().height;
                const img_onDevice_width = image_info.getBoundingClientRect().width;
                const img_onDevice_left = image_info.getBoundingClientRect().left;
                const img_onDevice_top = image_info.getBoundingClientRect().top

                const height = addedTag.location.height * img_onDevice_height ;
                const width = addedTag.location.width * img_onDevice_width;
                const top = addedTag.location.top * img_onDevice_height;
                const left = addedTag.location.left * img_onDevice_width;

                const tagBox = (
                    <ResizableDiv 
                        name={addedTag.name}
                        height={height}
                        width={width}
                        top={top}
                        left={left}
                        tag_id={addedTag.tag_id}
                        enableResize={true}
                        img_onDevice_width={img_onDevice_width}
                        img_onDevice_height={img_onDevice_height}
                        img_onDevice_left={img_onDevice_left}
                        img_onDevice_top={img_onDevice_top}
                        resizeEndHandler={resizeEndHandler} />
                )

                return tagBox;
            };
        } else if (mode === 'editing'){
            if (editedTag){
                const img_onDevice_height = image_info.getBoundingClientRect().height;
                const img_onDevice_width = image_info.getBoundingClientRect().width;
                const img_onDevice_left = image_info.getBoundingClientRect().left;
                const img_onDevice_top = image_info.getBoundingClientRect().top

                const height = editedTag.location.height * img_onDevice_height ;
                const width = editedTag.location.width * img_onDevice_width;
                const top = editedTag.location.top * img_onDevice_height;
                const left = editedTag.location.left * img_onDevice_width;

                console.log(editedTag.location.height);
                console.log(img_onDevice_height);
                console.log(height);
                const tagBox = (
                    <ResizableDiv
                        name={editedTag.name}
                        height={height}
                        width={width}
                        top={top}
                        left={left}
                        tag_id={editedTag.tag_id}
                        enableResize={true}
                        img_onDevice_width={img_onDevice_width}
                        img_onDevice_height={img_onDevice_height}
                        img_onDevice_left={img_onDevice_left}
                        img_onDevice_top={img_onDevice_top}
                        resizeEndHandler={resizeEndHandler} />
                )

                return tagBox;
            }
        }
    }

    const addNewTag = (event) => {
        if (props.mode === 'adding' && (!addedTag)){
            const e = event || window.event;

            const browser_width = document.documentElement.clientWidth;
            const browser_height = document.documentElement.clientHeight;
            const img_onDevice_height = image_info.getBoundingClientRect().height;
            const img_onDevice_width = image_info.getBoundingClientRect().width;

            const image_top = image_info.getBoundingClientRect().top;


            const new_tagBox_top = ( e.pageY - image_top - img_onDevice_height * 0.1 ) / img_onDevice_height;
            const new_tagBox_left = ( e.pageX - browser_width * 0.05 - img_onDevice_width * 0.05 ) / img_onDevice_width;
            const new_tagBox_height = 0.1;
            const new_tagBox_width = 0.1;
            

            const new_tagBox = {
                name: '',
                location: {
                    left: new_tagBox_left,
                    top: new_tagBox_top,
                    height: new_tagBox_height,
                    width: new_tagBox_width
                },
                tag_id: 'tag' + props.MLR.foods.length + 1
            }

            setAddedTag(new_tagBox);    
        };
    };


    // const addNewTag = (event) => {
    //     if (tagAdded){
    //         return ;
    //     }
    //     const e = event || window.event;
    //     console.log(`x: ${e.pageX}`, `y: ${e.pageY}`);
    //     const browser_width = document.documentElement.clientWidth;
    //     const browser_height = document.documentElement.clientHeight;

    //     const image_top = image_info.getBoundingClientRect().top;

    //     if (props.isTagging){
    //         const cloned_tagBoxs = [...tagBoxs];
    //         const new_tagBox_id = Math.floor(Math.random() * 100000);
    //         const new_tagBox_top = ( e.pageY - image_top - image_info_height * 0.05 ) / image_info_height * 100 + '%';
    //         const new_tagBox_left = ( e.pageX - browser_width * 0.05 - image_info_width * 0.05 ) / image_info_width * 100 + '%';

    //         console.log(new_tagBox_top);
    //         console.log(new_tagBox_left);

    //         const new_tagBox = {
    //             id: new_tagBox_id,
    //             width: '10%',
    //             height: '10%',
    //             top: new_tagBox_top,
    //             left: new_tagBox_left
    //         }

    //         cloned_tagBoxs.push(new_tagBox);

    //         setTagBoxs(cloned_tagBoxs);
    //     } else {
    //         return ;
    //     }

    //     setTagAdded(true);
    // }

    // const setTagPos = (box_id, pos_obj) => {
    //     console.log(pos_obj);
    //     const cloned_tagBoxs = [...tagBoxs];
    //     console.log(cloned_tagBoxs);

    //     const selected_tagBox = cloned_tagBoxs.findIndex(tagBox => {
            
    //         console.log(tagBox.id, box_id);
    //         return tagBox.id === box_id;
    //     });

    //     console.log(selected_tagBox);

    //     cloned_tagBoxs[selected_tagBox].width = pos_obj.width;
    //     cloned_tagBoxs[selected_tagBox].height = pos_obj.height;
    //     cloned_tagBoxs[selected_tagBox].top = pos_obj.top;
    //     cloned_tagBoxs[selected_tagBox].left = pos_obj.left;

    //     setTagBoxs(cloned_tagBoxs);
    // }

    let resizableTags = null;
    
    if (props.mode === 'adding'){
        return (
            <div 
                className={classes.PictureContainer}
                onClick={(e) => addNewTag(e)}>
                <img  ref={imageRef} src={trialImg} className={classes.Image}/>
                {generateTagBoxs(props.mode)}
            </div>
        )
    } else {
        return (
            <div 
                className={classes.PictureContainer}>
                <img ref={imageRef} src={trialImg} className={classes.Image}/>
                {generateTagBoxs(props.mode)}
            </div>
        )
    }
}

export default PictureContainer;