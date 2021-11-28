import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser); //? user we get from search
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //* getting user data from github api
  const [requests, setRequests] = useState(0); //? number of requests left to use github api
  const [loading, setIsLoading] = useState(false); //? loading spinner state
  //* error
  const [error, setError] = useState({ show: false, msg: "" });
  //* end of states

  //*check requests left
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "No more requests for this hour.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(checkRequests, []);
  //* end of getting user data from github api

  //* error function
  function toggleError(show, msg) {
    setError({ show, msg });
  }
  //* end of error function

  //* search user
  const searchUser = async (user) => {
    toggleError(); //? remove error from before
    setIsLoading(true);

    try {
      const response = await axios(`${rootUrl}/users/${user}`);
      setGithubUser(response.data);
      //? get the repos from the user
      const { login, followers_url } = response.data;
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
        setRepos(response.data)
      );
      //? get users followers
      axios(`${followers_url}?per_page=100`).then((response) =>
        setFollowers(response.data)
      );
    } catch (err) {
      toggleError(true, "No user found. Check your input.");
    }

    checkRequests();
    setIsLoading(false);
  };

  //! main return
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
