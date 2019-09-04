import React from "react";
import Manga from "./Manga";
import AlertC from "./AlertC";
import { AuthConsumer } from "../contexts/AuthContext";
import Loading from "./Loading";
import { searchMangaByName } from "../services/MangaService";

export default class MangasGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mangaSearched: this.props.mangaSearched,
      mangas: [],
      alertContent: null
    };

    this.searchMangaOk = this.searchMangaOk.bind(this);
    this.searchMangaError = this.searchMangaError.bind(this);
  }

  componentDidMount() {
    searchMangaByName(
      this.state.mangaSearched,
      this.searchMangaOk,
      this.searchMangaError
    );
  }

  searchMangaOk(result) {
    this.setState({
      isLoaded: true,
      mangas: result
    });
  }

  searchMangaError(error) {
    this.setState({
      isLoaded: true,
      error: error
    });
  }

  setAlertContent(param) {
    this.setState({
      alertContent: param
    });
  }

  render() {
    const { error, isLoaded, mangas } = this.state;
    if (error) {
      return (
        <AlertC
          information={{
            class: "danger",
            content:
              "Problème lors de la récupération des mangas. Veuillez ressayer."
          }}
        />
      );
    } else if (!isLoaded) {
      return (
        <div>
          <Loading />
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <AlertC information={this.state.alertContent} />
          <hr className="hr-separator"/>
          <div className="row row-eq-height">
            {mangas.map((manga, index) => {
              return (
                <AuthConsumer key={index}>
                  {({ apiRoot, token, user }) => (
                    <Manga
                      manga={manga}
                      callback={this.setAlertContent.bind(this)}
                      token={token}
                      user={user}
                    />
                  )}
                </AuthConsumer>
              );
            })}
          </div>
        </React.Fragment>
      );
    }
  }
}
