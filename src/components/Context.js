import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

export const Provider = ({ children }) => {
  const [meets, setMeets] = useState([]);
  const [listings, setListings] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [likes, setLikes] = useState([]);
  const [settings, setSettings] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phone: '',
    bio: '',
    email: '',
    password: ''
  });
  const [user, setUser] = useState({
    avatar: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {

    async function getLikes() {
      await fetch('/api/likes')
        .then((r) => r.json())
        .then((likes) => setLikes(likes))
        .catch((err) => console.error(err));
    }

    async function getMeets() {
      await fetch('/api/meets')
        .then((r) => r.json())
        .then((meets) => setMeets(meets))
        .catch((err) => console.error(err));
    }

    async function getListings() {
      await fetch('/api/marketplace')
        .then((r) => r.json())
        .then((listings) => setListings(listings))
        .catch((err) => console.error(err));
    }

    getLikes();
    getMeets();
    getListings();
  }, []);

  return (
    <Context.Provider value={{
      selectedFile,
      setSelectedFile,
      user,
      setUser,
      meets,
      listings,
      likes,
      settings,
      setSettings,
    }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
