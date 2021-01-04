import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function Submit() {
  return (
    <div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button">
            <Link to="/" className="cancel">Cancel</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

Submit.defaultProps = {};

Submit.propTypes = {
};

export default Submit;
