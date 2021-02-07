import React, { Component } from 'react'
import axios from 'axios';

//react bootstrap
import {Button, InputGroup, FormControl} from 'react-bootstrap'
//react icons
import {MdStar} from 'react-icons/md'

export class index extends Component {
    
    state = {
        tags: [],
        tagsSelected: []
    }

    async componentDidMount() {
        try {
             const tag = await axios.get('/json/tags.json');
             this.setState({
                 tags: tag.data
             })
        }
        catch(error) {
         console.log(error)
        }
     }

     setSelectedTags = (i) => {
        const {tagsSelected} = this.state
        this.setState({
            tagsSelected: [...tagsSelected, i]
            
        })
        if (tagsSelected.includes(i)) {
            this.setState({
                tagsSelected: tagsSelected.filter(tags => tags !== i)
            })
        }
    }

    render() {
        const {tags, tagsSelected} = this.state
        return (
            <div className="left">
                <InputGroup>
                    <FormControl
                    placeholder="Search for a recipe"
                    aria-label="Search for a recipe"
                    aria-describedby="basic-addon2"
                    className="searchInput"
                    />
                    <InputGroup.Append size="lg">
                    <Button className="searchButton">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <div className="filterDiv">
                    <h3>Search Filter</h3>
                    {/* Tags Filter Div */}
                    <div className="tagsFiltDiv">
                        <h5>Tags</h5>
                                {
                                    tags.map((tag, i) => {
                                        return(
                                            <button
                                                key={i}
                                                className={tagsSelected.includes(tag.value)? "tag customTag activeTag" : "tag customTag"}
                                                style={{color:tag.tagColor, border: `2px solid ${tag.tagColor}`}}
                                                onClick={() => {this.setSelectedTags(tag.value)}}
                                                >
                                                    {tag.tagName}
                                            </button> 
                                        )
                                    })
                                }
                        <InputGroup className="mb-3">
                            <FormControl
                                className="pHolder customPHolder"
                                placeholder="Add a tag for your next recipe"
                            />
                        </InputGroup>
                    </div>
                    {/* Serving Size Filter Div */}
                    <div className="serveFiltDiv">
                        <h5>Serving Size</h5>
                            <button className="serveOp">1</button>
                            <button className="serveOp">2</button>
                            <button className="serveOp">3-5</button>
                            <button className="serveOp">6-10</button>
                            <button className="serveOp">11-20</button>
                            <button className="serveOp">21 and above</button>
                    </div>
                    {/* Rating Filter Div */}
                    <div className="ratingFiltDiv">
                        <h5>Rating</h5>
                        <div>
                            <input type="radio" value="1" name="oneStar"className="radio"/>
                            <label for="oneStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                (and above)
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="twoStar"className="radio"/>
                            <label for="twoStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                (and above)
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="threeStar"className="radio"/>
                            <label for="threeStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                (and above)
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="fourStar"className="radio"/>
                            <label for="fourStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                (and above)
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="fiveStar"className="radio"/>
                            <label for="fiveStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default index
