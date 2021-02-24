import React, { Component } from 'react'
//react bootstrap
import {Button, InputGroup, FormControl} from 'react-bootstrap'
//react icons
import { MdStar } from 'react-icons/md'

export class index extends Component {

    render() {
        const { tags, tagsSelected, setSelectedTags, value, setQuickFilter, ratingData, filterByRating } = this.props
        return (
            <div className="left">
                <h4>Search Filter</h4>
                <InputGroup>
                    <FormControl
                        placeholder="Search for a recipe"
                        aria-label="Search for a recipe"
                        aria-describedby="basic-addon2"
                        className="searchInput"
                        onChange={setQuickFilter('quickFilter')}
                        value={value}
                    />
                    <InputGroup.Append size="lg">
                        <Button className="searchButton">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <div className="filterDiv">
                    {/* Tags Filter Div */}
                    <div className="tagsFiltDiv">
                        <h5>Tags</h5>
                            {
                                tags.map((tag, i) => {
                                    return(
                                        <button
                                            key={i}
                                            className={tagsSelected.includes(tag.tagName)? "tag customTag activeTag" : "tag customTag"}
                                            style={{color:tag.color, border: `2px solid ${tag.color}`}}
                                            onClick={() => {setSelectedTags(tag.tagName)}}
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
                    <hr/>
                    {/* Rating Filter Div */}
                    <div className="ratingFiltDiv">
                        <h5>Rating</h5>
                        <div>
                            <input type="radio" value="1" name="oneStar" className="radio" checked={ratingData === 0 ? true : false} onChange={e => filterByRating(0)} />
                            <label htmlFor="oneStar" className="rateLabel">
                                <p className="ml-2">All Item</p>
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="oneStar" className="radio" checked={ratingData === 1 ? true : false} onChange={e => filterByRating(1)} />
                            <label htmlFor="oneStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="twoStar" className="radio" checked={ratingData === 2 ? true : false} onChange={e => filterByRating(2)} />
                            <label htmlFor="twoStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="threeStar" className="radio" checked={ratingData === 3 ? true : false} onChange={e => filterByRating(3)} />
                            <label htmlFor="threeStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="fourStar" className="radio" checked={ratingData === 4 ? true : false} onChange={e => filterByRating(4)} />
                            <label htmlFor="fourStar" className="rateLabel">
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                                <MdStar className="star starfilt true"/>
                            </label>
                        </div>
                        <div>
                            <input type="radio" value="1" name="fiveStar" className="radio" checked={ratingData === 5 ? true : false} onChange={e => filterByRating(5)} />
                            <label htmlFor="fiveStar" className="rateLabel">
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
