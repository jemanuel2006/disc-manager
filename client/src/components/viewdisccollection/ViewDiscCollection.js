import React, { Component } from 'react';
import FilterBox from '../filterbox/FilterBox';
import './ViewDiscCollection.css';

class ViewDiscCollection extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            item: {},
            discs: []
        };
    }

    async componentDidMount() {
        let i = await fetch("/discCollections/" + this.state.id);
        let body = await i.json();
        this.setState({
            item : body,
            discs: body.Discs.map(d => ({
                isVisible: true,
                disc: d
            }))
        });
      }

      onFilterText = (filteredList) =>{
        let discs = this.state.discs;
        discs.forEach(d =>{
            let filteredDisc = filteredList.find(di => di.Id == d.disc.Id);
            d.isVisible = filteredDisc != null && filteredDisc != undefined;
        });

        this.setState({
            discs: discs
        });
    }
      
    render(){
        return (
            <div className="container">
                <h1 className="container-item">{this.state.item.Name}</h1>
                <div className="input-container">
                    <label>Discos</label>
                </div>
                <div className="container-item disc-selection-container">
                    <FilterBox originalList={this.state.discs.map(d => d.disc)} propertyName="Name,Year" onFilter={this.onFilterText} />
                    <div>
                        <ul>
                            {
                                this.state.discs.filter(d => d.isVisible).map(item => (
                                    <li>{item.disc.Name}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="action-container">
                    <a href="/colecoes/">Cancelar</a>
                </div>
            </div>
        )
    }
}

export default ViewDiscCollection;