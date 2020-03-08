import React, { useReducer } from 'react'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import axios from 'axios'
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types'

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	}

	const [state, dispatch] = useReducer(GithubReducer, initialState)

	// Search Users
	const searchUser = async text => {
	    setLoading()
		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)    
	    dispatch({type: SEARCH_USERS, payload: res.data.items })
	}
	// Get a User
	const getUser = async username => {
		setLoading()
	    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)    
	    dispatch({ type: GET_USER, payload: res.data })
	    console.log('getUser called')
	}

	// Get Repos
	const getUserRepos = async username => {
		setLoading()
	    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)    
	    // setGithub({...github, repos: res.data, loading: false})
	    dispatch({ type: GET_REPOS, payload: res.data })
	    console.log('get user repos called')
	}

	// Clear Users
	const clearUsers = () => {
	    dispatch({ type: CLEAR_USERS })
  	}

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING })
	
	const { users, user, repos, loading } = state
	return (
		<GithubContext.Provider
			value={{
				users, user, repos,
				loading, searchUser, clearUsers,
				getUser, getUserRepos
				}}>
			{ props.children }
		</GithubContext.Provider>
	)

}

export default GithubState