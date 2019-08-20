import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('http://localhost:8084/Robofriends-version-2.0-ServerSide/NewServlet')
			.then(response => response.json())
			.then(users => {this.setState({ users: users })})
	}

	componentDidMoun = () => {
		fetch(`http://localhost:8084/Robofriends-version-2.0-ServerSide/NewServlet`, {
		        method: 'POST',
			    body: JSON.stringify({input: this.state.searchfield, id: '12' }),
		         headers: new Headers({
	             		'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
	             		
	   			 }),
		      })
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value }, this.componentDidMoun);	
	}

	render() {
		const { users, searchfield } = this.state;
		const filteredUsers = users.filter(user =>{
			return user.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return (!users.length) ?
			<h1>Loading</h1> :
			(
				<div className='tc'>
					<h1>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<CardList users={filteredUsers} />
					</Scroll>
				</div>
			); 
			
	}
}

export default App;