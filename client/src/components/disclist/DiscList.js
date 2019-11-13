import React, { Component } from 'react';

class DiscList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    async componentDidMount() {
        let i = await fetch("/discs");

        if(!i.ok){
            alert("Ocorreu um erro ao recuperar os discos.");
            return;
        }

        let body = await i.json();
        this.setState({
            isLoaded: true,
            items : body
        });
      }
      
    render(){
        return (
            <div className="container">
                <h1 className="container-item">Discos</h1>
                <div className="container-item container-table">
                    <div className="container-item anchor-button-container">
                        <a className="button confirm" href="/discos/novo"><span className="text-icon">+</span> Criar Disco</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ano</th>
                                <th className="action-column"></th>
                            </tr>
                        </thead>
                        {
                            this.state.items.map(item => (
                            <tr>
                                <td key={item.Name}>
                                    {item.Name}
                                </td>
                                <td key={item.Year}>
                                    {item.Year}
                                </td>
                                <td><a href={"/discos/" + item.Id}>Editar</a></td>
                            </tr>
                            ))
                        }
                    </table>
                </div>
            </div>
        )
    }
}

export default DiscList;