import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)

    const { users, searchUser, clearUsers } = githubContext;
    const { setAlert } = alertContext;

    console.log(githubContext)

    const [text, setText] = useState('')


    const handleSubmit = e => {
        e.preventDefault()
        if(text === ''){
            setAlert('Please enter something', 'light')
        } else {
            searchUser(text)
            setText('')
        }
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="text" placeholder="Search User..."
                    value={text} onChange={e => setText(e.target.value)}/>
                <input type="submit" value="Search" className="btn btn-dark btn-block"/>
            </form>
            {users.length && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
            
        </div>
    )
}

export default Search
