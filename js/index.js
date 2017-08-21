'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { authToken: '' };
    _this.onLoggedIn = _this.onLoggedIn.bind(_this);
    return _this;
  }

  Root.prototype.onLoggedIn = function onLoggedIn(authTokenValue) {
    this.setState({ authToken: authTokenValue });
  };

  Root.prototype.render = function render() {
    if (this.state.authToken === '') {
      return React.createElement(Login, { onLoggedIn: this.onLoggedIn });
    } else {
      console.log("loggin in with = " + this.state.authToken);
      return React.createElement(LoggedIn, { authToken: this.state.authToken });
    }
  };

  return Root;
}(React.Component);

var LoggedIn = function (_React$Component2) {
  _inherits(LoggedIn, _React$Component2);

  function LoggedIn(props) {
    _classCallCheck(this, LoggedIn);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    axios({
      method: 'get',
      url: 'http://bit.ly/2mTM3nY',
      responseType: 'stream'
    }).then(function (response) {
      console.log(response);
      //      response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });

    return _this2;
  }

  LoggedIn.prototype.render = function render() {
    return React.createElement(
      'h1',
      null,
      'LoggedIn with'
    );
  };

  return LoggedIn;
}(React.Component);

var Login = function (_React$Component3) {
  _inherits(Login, _React$Component3);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

    _this3.state = { value: '', pwd: '' };

    _this3.handlePwdChange = _this3.handlePwdChange.bind(_this3);
    _this3.handleSubmit = _this3.handleSubmit.bind(_this3);
    _this3.handleChange = _this3.handleChange.bind(_this3);
    return _this3;
  }

  Login.prototype.handleChange = function handleChange(event) {
    console.log(this);
    this.setState({ value: event.target.value });
  };

  Login.prototype.handlePwdChange = function handlePwdChange(event) {
    console.log(this);
    this.setState({ pwd: event.target.value });
  };

  Login.prototype.handleSubmit = function handleSubmit(event) {
    this.props.onLoggedIn("authTokenValue");
    event.preventDefault();
  };

  Login.prototype.render = function render() {
    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement(
        'label',
        null,
        'Name:',
        React.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange }),
        React.createElement('input', { type: 'text', value: this.state.pwd, onChange: this.handlePwdChange })
      ),
      React.createElement('input', { type: 'submit', value: 'Submit' })
    );
  };

  return Login;
}(React.Component);

ReactDOM.render(React.createElement(Root, null), document.getElementById('root'));