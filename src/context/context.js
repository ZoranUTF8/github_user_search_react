import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  //* getting user data from github api
  const [requests, setRequests] = useState(0);
  const [loading, setIsLoading] = useState(false);
  //* error
  const [error, setError] = useState({ show: false, msg: "" });

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
    toggleError();//? remove error
    
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (response) {
      setGithubUser(response.data);
      // more logic here
    } else {
      toggleError(true, "No user found. Check your input.");
    }
  };

  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, requests, error, searchUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
