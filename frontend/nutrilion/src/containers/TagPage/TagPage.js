import React, { useState, useEffect } from 'react';

import classes from './TagPage.module.scss';

import PictureContainer from './PictureContainer/PictureContainer';
import TagInfoDiv from '../../components/TagInfoDiv/TagInfoDiv';
import Button from '../../UI/Button/Button';

//result of foods indentified from the backend will be send to this page and store in the state.

const TagPage = (props) => {
    //mode:
    //1. normal as recieve result from backend
    //2. adding as enableadding new tag
    //3. editing as edit existed tags
    const [ mode, setMode ] = useState('normal');
    //MLR = Machine Learning Result
    const [ MLR, setMLR ] = useState(false);
    const [ tagEditing, setTagEdting ] = useState(false);

    const [ addedTag, setAddedTag ] = useState();
    const [ editedTag, setEditedTag ] = useState();
    

    useEffect(() => {
        const meals = {
            img_height: 381,
            img_width: 640,
            foods: [
                { 
                    name: 'john',
                    location: {
                        x: 80,
                        y: 80,
                        height: 130,
                        width: 200
                    }
                },
                { 
                    name: 'Jayce',
                    location: {
                        x: 275,
                        y: 60,
                        height: 115,
                        width: 145
                    }
                }
            ]
        }

        const converted_meals = {
            ...meals,
            foods: meals.foods.map((food, index) => {
                return {
                    name: food.name,
                    location: {
                        //convert real coordinate to ratio.
                        top: food.location.y / meals.img_height,
                        left: food.location.x / meals.img_width,
                        height: food.location.height / meals.img_height,
                        width: food.location.width / meals.img_width
                    },
                    tag_id: 'tag' + index
                }
            })
        }

        setMLR(converted_meals);
    }, [])

    const modeHandler = (mode) => {
        setMode(mode);
    }

    const tagEditingHandler = (e, tag_id) => {
        if (e.target.id === 'input' || e.target.id === 'deletIcon'){
            return;
        }
        if (editedTag){
            if (tag_id === editedTag.tag_id){
                setEditedTag();
                setMode('normal');
            } else {
                const target_tag = MLR.foods.find(tag => tag.tag_id === tag_id);
                setEditedTag(target_tag);
            }
        } else {
            const target_tag = MLR.foods.find(tag => tag.tag_id === tag_id);
            setEditedTag(target_tag);
            setMode('editing');
        }
    };

    const tagNameHandler = (e) => {
        const new_name = e.target.value;

        setAddedTag({
            ...addedTag,
            name: new_name
        })
    }

    const editTagNameHandler = (e, tag_id) => {
        const new_name = e.target.value;
        const cloned_list = {...MLR};
        const target_tag = cloned_list.foods.find(tag => tag.tag_id === tag_id);
        const target_tag_index = cloned_list.foods.findIndex(tag => tag.tag_id === tag_id);
        target_tag.name = e.target.value;
        cloned_list.foods[target_tag_index] = target_tag;
        setMLR(cloned_list);
    }

    let TagsList = null;

    if (MLR){
        const tags = MLR.foods;
        TagsList = tags.map((tag, index) => {
            let edited_tag_id = null;
            if (editedTag){
                edited_tag_id = editedTag.tag_id;
            }
            console.log(tag.tag_id);
            if (tag.tag_id === edited_tag_id){
                return (
                    <TagInfoDiv 
                        key={'tag' + index}
                        tag_id={tag.tag_id}
                        name={tag.name} 
                        editing={true}
                        tagEditingHandler={tagEditingHandler}
                        editTagNameHandler={editTagNameHandler}
                        setEditedTag={setEditedTag}/>
                )
            } else {
                return (
                    <TagInfoDiv 
                        key={'tag' + index}
                        tag_id={tag.tag_id}
                        name={tag.name} 
                        editing={false}
                        tagEditingHandler={tagEditingHandler}
                        setEditedTag={setEditedTag}/>
                )
            }
        })
    }

    let tag_info = null;

    console.log(addedTag);
    console.log(MLR);

    const confirmAddingTag = () => {
        if (addedTag.name.length){
            console.log(addedTag);
            const tag_list = {...MLR}
            tag_list.foods.push(addedTag);
            setMLR(tag_list);
            setAddedTag();
            setMode('normal');
        }
    }

    const cancelAddingTag = () => {
        setMode('normal');
        setAddedTag();
    }

    if (mode === 'adding'){
        if ( addedTag){
            tag_info = (
                <div 
                    className={classes.tagInfo}>
                    <input 
                        className={classes.addedTagName}
                        value={addedTag.name}
                        onChange={tagNameHandler}/>
                    <Button clickHandler={confirmAddingTag}>完成</Button>
                    <Button clickHandler={cancelAddingTag}>取消</Button>
                </div>
            )
        }
    } else {
        tag_info = TagsList;
    }

    return (
        <div className={classes.TagPage}>
            <div className={classes.TitleRow}>
                <Button clickHandler={() => modeHandler('adding')}>新增標記</Button>
                <h2 className={classes.Title}>確認食物辨識</h2>
                <Button>下一步</Button>
            </div>
            <PictureContainer 
                mode={mode}
                MLR={MLR}
                setMLR={setMLR}
                addedTag={addedTag}
                setAddedTag={setAddedTag}
                editedTag={editedTag}
                setEditedTag={setEditedTag}/>
            <div className={classes.TagsList}>
                <h3 style={{'margin': '10px'}}>點擊以編輯標記</h3>
                {tag_info}
            </div>
        </div>
    )
}

export default TagPage;