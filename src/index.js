import React, { createRef, Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './components/Context';
import reportWebVitals from './reportWebVitals';

class Main extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }
  render() {
    return (
      <div ref={this.ref}>
        <Provider>
          <App />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
