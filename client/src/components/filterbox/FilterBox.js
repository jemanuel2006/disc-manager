import React, { Component } from 'react';
import './FilterBox.css';

class FilterBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            originalList: props.originalList,
            onFilter: props.onFilter,
            text: "",
            propertyName: props.propertyName.split(",")
        };
    }

    onFilter = (e) => {
        this.setState({
            text: e.target.value
        });
        let filteredList = null;
        
        if(e.target.value == "")
            filteredList = this.props.originalList;
        else
            filteredList = this.props.originalList.filter(obj => {
                let include = false;
                this.state.propertyName.forEach(p => {
                    include |= obj[p].toString().includes(e.target.value)
                })
                return include;
            });

        this.state.onFilter(filteredList);
    }
      
    render(){
        return (
            <div>
                <input className="search-box" type="text" value={this.state.text} onChange={this.onFilter} placeholder="Pesquisar" />
            </div>
        )
    }
}

export default FilterBox;