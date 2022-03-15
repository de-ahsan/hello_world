import React, { useState, useContext } from 'react'
import { SessionContext } from 'contexts/session_context'
import SignOutButton from 'components/users/sign_out'

import axios from 'axios';

const dummyItems = [{ name: '1st' }, { name: '2nd' }, { name: '3rd' }]

const Home = ({ history }) => {
  const [query, setSearchText] = useState('');
  const [random_search, ranSearchText] = useState('');
  const [items, setItems] = useState([]);
  const sessionContext = useContext(SessionContext)

  const handleSeacrh = () => {
    const params = { query };

    axios.get('/api/v1/search', { params })
      .then((response) => setItems(response.data))
  }

  const luckySearch = () => {
    const params = { random_search };

    axios.get('/api/v1/search', { params })
      .then((response) => setItems(response.data))
  }

  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };

  return <>
    <h1>Hello world!</h1>
    { sessionContext.loading && <em>Loading...</em> }
    { !sessionContext.loading && sessionContext.user && <div>
      Logged in as {sessionContext.user.full_name}
      <SignOutButton />
      <br />
      <br />
      <input type="text" onChange={handleOnChange} />
      <button onClick={handleSeacrh}>Search</button>
      <br />
      <button onClick={luckySearch}>I am feeling Lucky</button>
    </div> }

    <div>
      {items.map((item, index) => (
        <p key={`${item}-${index}`}>{item}</p>
      ))}
    </div>
  </>
}

export default Home
