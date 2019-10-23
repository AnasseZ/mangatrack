import React, {useState} from "react";
import {AuthConsumer} from "../../../contexts/AuthContext";

const Profil = ({user}) => {

    return (
        <div className="row justify-content-center">
            <div className="col-sm-3 card shadow">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input className="form-control" id="username"
                                   aria-describedby="username"
                                   placeholder="Nom d'utilisateur"
                                   value={user.username}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Nom d'utilisateur</label>
                            <input className="form-control" id="email"
                                   aria-describedby="email"
                                   placeholder="Email"
                                   value={user.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default () => (
    <AuthConsumer>
        {({user}) => <Profil user={user}/>
        }
    </AuthConsumer>
);