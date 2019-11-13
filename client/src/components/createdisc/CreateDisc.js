import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class CreateDisc extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loadOk: true,
            name : "",
            year: "",
            nameValid: true,
            yearValid: true,
            redirect: false,
            id: props.match.params.id,
            isEditing: props.match.params.id != undefined && props.match.params.id != null
        };
    }

    handleInput(e){
        let name = e.target.name;
        let value = e.target.value;

        let nameValid = true;
        let yearValid = true;

        if(name == "name" && (!value || value == ""))
            nameValid = false;

        if(name == "year" && (!value || value == ""))
            yearValid = false;

        this.setState(
        {
            [name]: value,
            nameValid: nameValid,
            yearValid: yearValid
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        let method = this.state.isEditing ? 'PUT' : 'POST';
        let url = this.state.isEditing ? '/discs/' + this.state.id : '/discs';

        let result = await fetch(url, {
            method: method,
            body: JSON.stringify({
                name: data.get("name"),
                year: data.get("year")
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        });

        if(result.ok){
            alert(this.state.isEditing ? "Disco alterado com sucesso!" : "Disco criado com sucesso!");
            this.setState({redirect: true});
        }
        else{
            alert("Ocorreu um erro ao criar o disco.")
        }
    }

    async componentDidMount() {
        if(!this.state.isEditing)
            return;

        let i = await fetch("/discs/" + this.state.id);

        if(!i.ok){
            alert("Ocorreu um erro ao recuperar os discos.");
            this.setState({
                loadOk: false
            });
            return;
        }

        let body = await i.json();
        this.setState({
            name: body.Name,
            year: body.Year
        })
    }
      
    render(){
        if(this.state.redirect || !this.state.loadOk){
            return <Redirect to="/discos"/>
        }

        return (
            <div className="container">
                <h1 className={!this.state.isEditing ? 'hidden' : 'container-item'}>Editar Disco</h1>
                <h1 className={this.state.isEditing ? 'hidden' : 'container-item'}>Criar Novo Disco</h1>
                <form onSubmit={this.onSubmit} className="container-item">
                    <div className="input-container">
                        <label>Nome</label>
                        <input required type="text" name="name" value={this.state.name} onChange={(event) => this.handleInput(event)} />
                        <label className={this.state.nameValid ? 'hidden' : ''}>Nome precisa ser preenchido!</label>
                    </div>

                    <div className="input-container">
                        <label>Ano</label>
                        <input required type="number" name="year" value={this.state.year} onChange={(event) => this.handleInput(event)} />
                        <label className={this.state.yearValid ? 'hidden' : ''}>Ano precisa ser preenchido!</label>
                    </div>
                    
                    <div className="action-container">
                        <button className="button confirm" type="submit" disabled={!this.state.yearValid || !this.state.nameValid}>Salvar</button>
                        <a href="/discos">Cancelar</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateDisc;