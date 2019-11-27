import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import SearchManga from "./search_mangas/SearchManga";
import {Login} from "./login/Login";
import PrivateRoute from "../PrivateRoute";
import Dashboard from "./dashboard/Dashboard";
import NoMatch from "./NoMatch";
import Profil from "./profil/Profil";
import {SignUp} from "./signup/SignUp";
import MangaDetail from "./manga-detail/MangaDetail";

export const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <PrivateRoute path="/mangas/:id" component={MangaDetail}/>
            <PrivateRoute path="/search-manga" component={SearchManga}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <PrivateRoute path="/profil" component={Profil}/>
            <Route component={NoMatch}/>
        </Switch>
    </main>
);