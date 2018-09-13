import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_user: '',
      edit_mode: false
    };

    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleCancelEditUser = this.handleCancelEditUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveEditUser = this.handleSaveEditUser.bind(this);    
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleEditUser(user) {
    this.setState({ edit_mode: true, edit_user: user.id, user: { id: user.id, email: user.email} });
  }

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  handleCancelEditUser() {
    this.setState({ edit_mode: false, edit_user: '' });
  }

  handleSaveEditUser(event) {
    event.preventDefault();

    
    const { user } = this.state;
    const { dispatch } = this.props;
    dispatch(userActions.edit(user));

    this.setState({ submitted: true, edit_mode: false, edit_user: '', user: '' });

    this.props.dispatch(userActions.getAll());
  }

handleChange(event) {
  const { name, value } = event.target;
  const { user } = this.state;
  this.setState({
      user: {
          ...user,
          [name]: value
      }
  });
}


  renderEditButton(edit_mode, edit_user, user) {
    if (edit_mode && user.id === edit_user) {
      return (
      <span><a onClick={() => this.handleCancelEditUser()}>Cancel </a>
       - <a onClick={this.handleSaveEditUser}>Save</a></span>
      );
    } else if (!edit_mode) {
      return (<span> - <a onClick={() => this.handleEditUser(user)}>Update</a></span>);
    }
  }

  renderDeleteButton(edit_mode, user) {
    if (!edit_mode) {
      if (user.deleting) {
        return (<em> - Deleting...</em>);
      } else if (user.deleteError) {
        return (<span className="text-danger"> - ERROR: {user.deleteError}</span>);
      } else {
        return (<span> <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>);
      }
    }
  }

  renderInput(edit_mode, edit_user, userListItem){
    if(edit_mode && edit_user === userListItem.id){
      const { user } = this.state;

      return ( <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />);
    } else {
      return userListItem.email;
    }
  }

  render() {
    const { user, users } = this.props;
    const { edit_mode, edit_user } = this.state;

    return (
      <div className="col-md-16 col-md-offset-3">
        <h1>Hi {user.email}!</h1>
        <h3>All registered accounts:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
        {users.items &&
          <ul>
            {users.items.map((user, index) =>
              <li key={user.id}>
              { this.renderInput(edit_mode, edit_user, user) }
                { this.renderDeleteButton(edit_mode, user) }
                { this.renderEditButton(edit_mode, edit_user, user) }
              </li>
            )}
          </ul>
        }
        <p>
          <Link to="/login" className="btn btn-link">Logout</Link>
          <Link to="/register" className="btn btn-link">Register</Link>
        </p>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };