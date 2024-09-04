import React, { useState, useEffect } from 'react';
import test from './sample.json'; 
import './App.css';

function App() {
  const teams = ['RCB', 'KKR', 'SRH', 'RR', 'KXIP', 'DC', 'MI', 'CSK'];
  const myt = [
    'Royal Challengers Bangalore',
    'Kolkata Knight Riders',
    'Sunrisers Hyderabad',
    'Rajasthan Royals',
    'Punjab Kings',
    'Delhi Capitals',
    'Mumbai Indians',
    'Chennai Super Kings'
  ];
  const rcb = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const srh = [2013, 2014, 2015, 2016, 2017, 2018, 2020, 2021, 2022];
  const rr = [2013, 2014, 2015, 2018, 2019, 2020, 2021, 2022, 2023];
  const dc = [ 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const csk = [2012, 2013, 2014, 2015, 2018, 2019, 2020, 2021];
  const kkr = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2022, 2023];
  const mi = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const kxip = [2013, 2014, 2015, 2016, 2017, 2018, 2020, 2021];
  
  const [names, setNames] = useState([]);
  const [itn, setItn] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState(''); // State to hold validation message

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    const i = Math.floor(Math.random() * 8);
    let j = 0;
    let selectedTeam = teams[i];
    let selectedYear;

    switch (selectedTeam) {
      case 'RCB':
        j = Math.floor(Math.random() * rcb.length);
        selectedYear = rcb[j];
        break;
      case 'KKR':
        j = Math.floor(Math.random() * kkr.length);
        selectedYear = kkr[j];
        break;
      case 'SRH':
        j = Math.floor(Math.random() * srh.length);
        selectedYear = srh[j];
        break;
      case 'RR':
        j = Math.floor(Math.random() * rr.length);
        selectedYear = rr[j];
        break;
      case 'KXIP':
        j = Math.floor(Math.random() * kxip.length);
        selectedYear = kxip[j];
        break;
      case 'DC':
        j = Math.floor(Math.random() * dc.length);
        selectedYear = dc[j];
        break;
      case 'MI':
        j = Math.floor(Math.random() * mi.length);
        selectedYear = mi[j];
        break;
      case 'CSK':
        j = Math.floor(Math.random() * csk.length);
        selectedYear = csk[j];
        break;
      default:
        selectedYear = null;
    }

    const temp = test.filter(
      (item) => item.ipl_team === selectedTeam && item.year === selectedYear
    );

    shuffleArray(temp);
    setNames(temp);
  }, []);

  const tn = (event) => {
    const x = event.target.value;
    setItn(x);

    if (x) {
      const filteredSuggestions = myt.filter((item) =>
        item.toLowerCase().includes(x.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 3)); 
    } else {
      setSuggestions([]); 
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setItn(suggestion); 
    setSuggestions([]); 
  };

  const validate = () => {
    const guessedTeam = myt.find((teamName) =>
      teamName.toLowerCase() === itn.toLowerCase()
    );

    if (guessedTeam && guessedTeam === myt[teams.indexOf(names[0].ipl_team)]) {
      setMessage('Correct! You guessed the right team.');
    } else {
      setMessage('Incorrect. Try again.');
    }
  };

  return (
    <div className="container">
      <p>Hiii</p>
      <ul>
        {names.slice(0, 3).map((item, ind) => (
          <li key={ind}>{item.name}</li>
        ))}
      </ul>
      <p>Guess the IPL team...</p>
      <input
        onChange={tn}
        value={itn}
        placeholder="Enter team"
        className="search-input"
      />
      <button onClick={validate}>Try</button>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;



