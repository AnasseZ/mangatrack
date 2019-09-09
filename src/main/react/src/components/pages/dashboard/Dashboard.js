import React from "react";
import { Title } from "../../shared/Title";
import { getMangasByUser } from "../../../services/MangaService";
import { AuthConsumer } from "../../../contexts/AuthContext";
import Loading from "../loading/Loading";
import MangaTrackedGrid from "./MangaTrackedGrid";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mangas: [],
      isLoaded: false,
      error: null
    };

    this.getMangasError = this.getMangasError.bind(this);
    this.getMangasOk = this.getMangasOk.bind(this);
  }

  componentDidMount() {
    getMangasByUser(
      this.props.user.id,
      this.getMangasOk,
      this.getMangasError,
      this.props.token
    );
  }

  getMangasOk(mangas) {
    this.setState({
      mangas: mangas["hydra:member"],
      isLoaded: true
    });
  }

  getMangasError(error) {
    this.setState({
      error: error,
      isLoaded: true
    });
  }

  render() {
    const { isLoaded, mangas } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <Title title="Dashboard" />
            <br />
            <br />
            {isLoaded ? <MangaTrackedGrid mangas={mangas} /> : <Loading />}
          </div>
        </div>
      </div>
    );
  }
}

export default () => (
  <AuthConsumer>
    {({ token, user }) =>
      token !== "" ? <Dashboard token={token} user={user} /> : ""
    }
  </AuthConsumer>
);
