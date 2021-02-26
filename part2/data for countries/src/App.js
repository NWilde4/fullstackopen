// set REACT_APP_API_KEY=d2051746f716cd5bfe9ba5d5435dc6a5&& npm start 
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})
  useEffect(() => 
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
      .then(response => {
        setWeather(response.data.current)
      })
  , [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} style={{width: 200}} />
      <h2>Weather in {country.name}</h2>
      <p>
        <strong>temperature: </strong>
        {weather.temperature} Celsius
      </p>
      <img src={weather.weather_icons} />
      <p>
        <strong>wind: </strong>
        {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  )
}

const Countries = ({ countries, setKeyword }) => {
  return (
    countries.map(country => {
      return (
        <div key={country.name}>
          {country.name}
          <button onClick={() => setKeyword(country.name)}>show</button>
        </div>
      )
    })
  )
}

const Content = ({ countries, keyword, setKeyword }) => {
  const filteredCountries = countries.filter((country) => (
    country.name
      .toLowerCase()
      .includes(keyword.toLowerCase() )))

  if (keyword === '') {
    return(<p>Search for a country.</p>)
  }
  if (filteredCountries.length > 10) {
    return (<p>Too many matches.</p>)
  }
  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }
  if (filteredCountries.length === 0) {
    return(<p>No matches.</p>)
  }
  return <Countries countries={filteredCountries} setKeyword={setKeyword}/>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => 
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  , [])

  return (
    <div>
      find countries
      <input 
        value={keyword} 
        onChange={(event) => setKeyword(event.target.value)}
      />
      <Content 
        countries={countries} 
        keyword={keyword} 
        setKeyword={setKeyword}
      />
    </div>
  )
}

export default App