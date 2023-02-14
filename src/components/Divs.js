import React, { useState, useEffect } from 'react';

//Define state variables & url for API

export default function Divs() {
  const [data, setData] = useState([])
  const [newModels, setNewModels] = useState(false)
  const [retroModels, setRetroModels] = useState(false)
  const apiUrl = 'https://random-data-api.com/api/users/random_user?size=10'

  //Fetch data from API

  async function fetchData() {
    const response = await fetch(apiUrl)
    const responseData = await response.json()
    setData(responseData)
  }

  useEffect(() => {
    fetchData();
  }, []);

  //Button & checkbox functions
  
  function FetchNewData() {
    fetchData();
  }

  //Event handlers for checkboxes, cannot be mutually checked

  function handleCheckYearNew(event) {
    const checked = event.target.checked;
    if (checked) {
      setNewModels(true);
      setRetroModels(false);
    } else {
      setNewModels(false);
    }
  }
  
  function handleCheckYearRetro(event) {
    const checked = event.target.checked;
    if (checked) {
      setRetroModels(true);
      setNewModels(false);
    } else {
      setRetroModels(false);
    }
  }

  // check date of birth if the year is above or under 1980

  function checkYearNew(dateOfBirth) {
    const year = parseInt(dateOfBirth.substring(0, 4))
    return year >= 1980;
  }

  function checkYearRetro(dateOfBirth) {
    const year = parseInt(dateOfBirth.substring(0, 4))
    return year < 1980;
  }

  
  const filteredData = data.filter((robot) => {
    if (newModels && retroModels) {
      return checkYearNew(robot.date_of_birth) && checkYearRetro(robot.date_of_birth)
      } else if (newModels) {
        return checkYearNew(robot.date_of_birth)
      } else if (retroModels) {
        return checkYearRetro(robot.date_of_birth)
      } else {
        return true
      }
    })

  return (
    <>
      <div id="newFetch">
      <button onClick={FetchNewData}>New Robots</button>
      <div id="checks">
      <input
            type="checkbox"
            checked={newModels}
            onChange={handleCheckYearNew}
          />
        <label>
          Only models from 1980 or newer
        </label><br></br>
        <input
            type="checkbox"
            checked={retroModels}
            onChange={handleCheckYearRetro}
          />
        <label>
          I like retro! Only models before 1980
        </label>
        </div>
      </div>
      {filteredData.map((robot) => (
        <div className="flip-card" key={robot.id}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={robot.avatar} />
              <h3>{robot.employment.title}</h3>
              <p>
                <b>
                  {robot.first_name} {robot.last_name}
                </b>
              </p>
              <p>Gender: {robot.gender}</p>
            </div>
            <div className="flip-card-back">
              <h1>Additional info</h1>
              <p>Date of birth: {robot.date_of_birth}</p>
              <p>Email: {robot.email}</p>
              <p>Key skill: {robot.employment.key_skill}</p>
            </div>
          </div>
        </div>
      ))}
      
    </>
  );
}