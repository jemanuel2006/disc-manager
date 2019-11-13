import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DiscCollectionList from './components/disccollectionlist/DiscCollectionList';
import DiscList from './components/disclist/DiscList';
import CreateDisc from './components/createdisc/CreateDisc';
import CreateDiscCollection from './components/createdisccollection/CreateDiscCollection';
import ViewDiscCollection from './components/viewdisccollection/ViewDiscCollection';
import Header from './components/header/Header';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'

ReactDOM.render(
<div>
    <Header />
    <BrowserRouter>
        <Switch>
            <Route path="/colecoes/novo" component={CreateDiscCollection} />
            <Route path="/colecoes/:id/visualizar" component={ViewDiscCollection} />
            <Route path="/colecoes/:id/editar" component={CreateDiscCollection} />
            <Route path="/colecoes" component={DiscCollectionList} />
            <Route path="/discos/novo" component={CreateDisc} />
            <Route path="/discos/:id" component={CreateDisc} />
            <Route path="/discos" component={DiscList} />
            <Redirect from="/" to="/colecoes" />
        </Switch>
    </ BrowserRouter>
</div>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
