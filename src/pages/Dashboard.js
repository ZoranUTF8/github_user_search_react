import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";

//! main return
const Dashboard = () => {
  const { loading } = useContext(GithubContext);
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} alt="loading spinner" className="loading-img" />
      </main>
    );
  } else {
    return (
      <main>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    );
  }
};

export default Dashboard;
