import React, { useEffect, useContext } from 'react';
import Nav from '../Nav';
import Form from './Form';
import Context from '../Context';

const Settings = () => {
  const { setSettings } = useContext(Context);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((s) => setSettings(s));
  }, []);

  return (
    <div>
      <Nav />
      <div className="settings">
        <Form className="form" />
      </div>
    </div>
  );
};

export default Settings;
