import React, { Component } from 'react';

class DiscCollectionList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    async componentDidMount() {
        let i = await fetch("/discCollections");

        if(!i.ok){
            alert("Ocorreu um erro ao recuperar as coleções.");
            return;
        }

        let body = await i.json();
        this.setState({
            isLoaded: true,
            items : body
        })
      }
      
    render(){
        return (
            <div className="container">
                <h1 className="container-item">Coleções de Disco</h1>
                <div className="container-item container-table">
                    <div className="container-item anchor-button-container">
                        <a className="button confirm" href="/colecoes/novo"><span className="text-icon">+</span> Criar Coleção</a>
                    </div>
                   
                    <div className="container-item">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th className="action-column"></th>
                                    <th className="action-column"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.items.map(item => (
                                <tr>
                                    <td key={item.Name}>
                                        {item.Name}
                                    </td>
                                    <td><a href={"/colecoes/" + item.Id + "/editar"}>Editar</a></td>
                                    <td><a href={"/colecoes/" + item.Id + "/visualizar"}>Visualizar</a></td>
                                </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default DiscCollectionList;