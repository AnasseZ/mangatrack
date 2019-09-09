import React from "react";
import MangaGrid from "./MangaGrid";
import {searchMangaByName} from "../../../services/MangaService";
import AlertC from "../../shared/AlertC";
import Loading from "../loading/Loading";

export class FindManga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: null,
      loading: false,
      mangas: [],
      page: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchMangaOk = this.searchMangaOk.bind(this);
    this.searchMangaError = this.searchMangaError.bind(this);
    this.searchByName = this.searchByName.bind(this);
  }

  handleChange(evt) {
    this.setState({
      load: false,
      value: evt.target.value,
    });

    if(!this.state.mangas) {
      this.setState({
        mangas: []
      })
    }
  }

  searchByName() {
    this.setState({
      loading: true
    });

    searchMangaByName(
        this.state.value,
        this.state.page,
        this.searchMangaOk,
        this.searchMangaError,
        this.props.token
    );
  }

  searchMangaOk(result) {
    console.log(result);
    this.setState({
      loading: false,
      mangas: result.content
    });
  }

  searchMangaError(error) {
    this.setState({
      loading: false,
      error: error
    });
  }

  render() {
    const { error, loading, mangas } = this.state;
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          <div className="col-8 col-sm-4">
            <input
              value={this.state.value}
              type="text"
              className="form-control"
              id="mangaSearch"
              placeholder="Chercher un manga"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-4 col-sm-2 text-left pl-0">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.searchByName}
              id="btnSubManga"
              disabled={!this.state.value}
            >
              Chercher
            </button>
          </div>
        </div>
        <br />
        <br />
        {
          error
              ? <AlertC
                  information={{
                    class: "danger",
                    content:
                        "Problème lors de la récupération des mangas. Veuillez ressayer."
                  }}
                />
              : ""
        }
        { loading ?
            (
                <div>
                  <Loading />
                </div>
            )
            :  ""
        }
        { mangas ? <MangaGrid mangas={this.state.mangas} /> : ""}
      </React.Fragment>
    );
  }
}
