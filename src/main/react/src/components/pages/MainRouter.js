import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import {SearchManga} from "./search_mangas/SearchManga";
import {Login} from "./login/Login";
import PrivateRoute from "../shared/PrivateRoute";
import NoMatch from "./NoMatch";
import Profil from "./profil/Profil";
import {SignUp} from "./signup/SignUp";
import MangaDetail from "./manga-detail/MangaDetail";
import {MangaDashboard} from "./mangas/MangaDashboard";

export const MainRouter = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <PrivateRoute path="/dashboard/mangas" component={MangaDashboard}/>
            <PrivateRoute path="/dashboard" component={Home}/>
            <PrivateRoute path="/mangas/:id" component={MangaDetail}/>
            <PrivateRoute path="/search-manga" component={SearchManga}/>
            <PrivateRoute path="/profil" component={Profil}/>
            <Route component={NoMatch}/>
        </Switch>
    </main>
);