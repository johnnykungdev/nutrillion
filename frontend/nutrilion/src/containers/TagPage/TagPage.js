import React, { useState, useEffect } from 'react';

import classes from './TagPage.module.scss';

import PictureContainer from './PictureContainer/PictureContainer';
import TagInfoDiv from '../../components/TagInfoDiv/TagInfoDiv';
import Button from '../../UI/Button/Button';
import Backdrop from '../../UI/Backdrop/Backdrop';

const TagPage = (props) => {
    const [ isTagging, setIsTagging ] = useState(false);
    //MLR = Machine Learning Result
    const [ MLR, setMLR ] = useState(false);
    const [ tagEditing, setTagEdting ] = useState(false);

    useEffect(() => {
        const meals = {
            img_height: 640,
            img_width: 381,
            foods: [
                { 
                    name: 'john',
                    location: {
                        x: 64,
                        y: 38,
                        height: 40,
                        width: 70
                    }
                },
                { 
                    name: 'Jayce',
                    location: {
                        x: 200,
                        y: 50,
                        height: 40,
                        width: 70
                    }
                }
            ]
        }

        setMLR(meals);
    }, [])

    const toggleIsTagging = () => {
        setIsTagging(!isTagging);
    }

    const tagEditingHandler = (e, name) => {
        if (e.target.id !== 'input' && e.target.id !== 'deleteIcon'){
            if (!tagEditing){
                setTagEdting(name);
            } else if ( name !== tagEditing){
                setTagEdting(name);
            } else {
                setTagEdting(false);
            }
        }
    };

    let TagsList = null;
    console.log(tagEditing);

    if (MLR){
        const tags = MLR.foods;
        TagsList = tags.map((tag, index) => {
            if (tag.name === tagEditing){
                return (
                    <TagInfoDiv 
                        key={'tag' + index}
                        id={'tag' + index}
                        name={tag.name} 
                        editing={true}
                        tagEditingHandler={tagEditingHandler}/>
                )
            } else {
                return (
                    <TagInfoDiv 
                        key={'tag' + index}
                        id={'tag' + index}
                        name={tag.name} 
                        editing={false}
                        tagEditingHandler={tagEditingHandler}/>
                )
            }
        })
    }

    return (
        <div className={classes.TagPage}>
            <div className={classes.TitleRow}>
                <Button clickHandler={toggleIsTagging}>新增標記</Button>
                <h2 className={classes.Title}>確認食物辨識</h2>
                <Button>下一步</Button>
            </div>
            <PictureContainer isTagging={isTagging}/>
            <div className={classes.TagsList}>
                <h3 style={{'margin': '10px'}}>點擊以編輯標記</h3>
                {TagsList}
            </div>
        </div>
    )
}

export default TagPage;