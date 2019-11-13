import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FilterBox from '../filterbox/FilterBox';
import './CreateDiscCollection.css';

class CreateDiscCollection extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            discs: [],
            nameValid: true,
            redirect: false,
            isEditing: props.match.params.id != undefined && props.match.params.id != null,
            id: props.match.params.id,
            currentCollection: null,
            loadOk: true
        };
    }

    async componentDidMount() {
        let result = await fetch("/discs");

        if(!result.ok){
            alert("Ocorreu um erro ao recuperar os discos.");
            this.setState({
                loadOk: false
            });
            return;
        }

        let discs = await result.json();
        this.setState({
            isLoaded: true,
            discs : discs.map(m => ({
                disc: m,
                isSelected: false,
                isVisible: true
            }))
        });

        if(this.state.isEditing){
            let res = await fetch("/discCollections/" + this.state.id);
            let collection = await res.json();
            let ids = collection.Discs.map(d => d.Id);
            this.setState({
                name: collection.Name,
                discs: discs.map(m => ({
                    disc: m,
                    isSelected: ids.includes(m.Id),
                    isVisible: true
                }))
            })
        }
        
    }

    handleInput(e){
        let name = e.target.name;
        let value = e.target.value;

        let nameValid = true;

        if(name == "name" && (!value || value == ""))
            nameValid = false;

        this.setState(
        {
            [name]: value,
            nameValid: nameValid,
        });
    }

    handleCheck = (e) => {
        let checkbox = e.target;
        let selectedValues = this.state.discs;

        let index = this.state.discs.findIndex(d => d.disc.Id == checkbox.id);

        if(index < 0)
            return;

        selectedValues[index].isSelected = checkbox.checked;

        this.setState({
            discs: selectedValues
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        if(!this.state.discs.map(d => d.isSelected).includes(true)){
            alert("Selecione pelo menos um disco!");
            return;
        }

        const data = new FormData(e.target);

        let method = this.state.isEditing ? 'PUT' : 'POST';
        let url = this.state.isEditing ? '/disccollections/' + this.state.id : '/disccollections';

        let result = await fetch(url, {
            method: method,
            body: JSON.stringify({
                name: data.get("name"),
                discIds: Array.from(this.state.discs.filter(d => d.isSelected).map(d => d.disc.Id))
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        });
        
        if(result.ok){
            alert(this.state.isEditing ? "Coleção alterada com sucesso!" : "Coleção criada com sucesso!");
            this.setState({redirect: true});
        }
        else{
            alert("Ocorreu um erro ao criar a coleção.")
        }
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
        if(this.state.redirect || !this.state.loadOk){
            return <Redirect to="/colecoes"/>
        }

        return (
            <div className="container">
                <h1 hidden={this.state.isEditing} className="container-item">Criar Nova Coleção</h1>
                <h1 hidden={!this.state.isEditing} className="container-item" >{this.state.name}</h1>
                <form onSubmit={this.onSubmit} className="container-item">
                    <div className="input-container">
                        <label>Nome</label>
                        <input required type="text" id="name" name="name" value={this.state.name} onChange={(event) => this.handleInput(event)} />
                    </div>
                    <div className="container-item disc-selection-container">
                        <label>Discos</label>
                        <FilterBox originalList={this.state.discs.map(d => d.disc)} propertyName="Name,Year" onFilter={this.onFilterText} />
                        <table>
                            <thead>
                                <tr>
                                    <th className="no-name-column"></th>
                                    <th>Nome</th>
                                    <th>Ano</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.discs.map(item => {
                                    if(item.isVisible){
                                        return (
                                            <tr>
                                                <td><input type="checkbox" checked={item.isSelected} id={item.disc.Id} name={item.disc.Id} onChange={this.handleCheck}></input></td>
                                                <td key={item.disc.Name}>
                                                    {item.disc.Name}
                                                </td>
                                                <td>{item.disc.Year}</td>
                                            </tr>
                                            )
                                    }
                                        
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="action-container">
                        <button className="button confirm">Salvar</button>
                        <a href="/colecoes">Cancelar</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateDiscCollection;