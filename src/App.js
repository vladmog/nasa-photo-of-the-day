import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';
import Image from './Image';
import Explanation from './Explanation';
import Date from './Date';
import FetchDate from './FetchDate';
import { Button } from 'semantic-ui-react'; 

function App() {
  const [fetchDate, setFetchDate] = useState(
    {month: null,
    day: null,
    year: null,
    dateGiven: false}
  )
  const [data, setData] = useState( 
      {copyright: '',
      date: '',
      explanation: '',
      hdurl: '',
      media_type: '',
      service_version: '',
      title: '',
      url: '',
    });
  const [incrementedDate, setIncrementedDate] = useState(
    {
      month: null,
      day: null,
      year: null,
      dateIncremented: false
    }
  );


  const fetchData = () => {
    if (incrementedDate.dateIncremented){
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe&date=${incrementedDate.year}-${incrementedDate.month}-${incrementedDate.day}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {console.log(err)})
    }else if (fetchDate.dateGiven){
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe&date=${fetchDate.year}-${fetchDate.month}-${fetchDate.day}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {console.log(err)})
    }else{
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe`)
        .then(res => {
          setData(res.data)
        })
        .catch(err => {})
      }
  }

  useEffect(() => {
    fetchData();
  }, [fetchDate, incrementedDate])


  const incrementDate = (direction) => {
    var dateSplit = data.date.split("-");
    let dd = dateSplit[2];
    let mm = dateSplit[1];
    let yyyy = dateSplit[0];
    
    if (direction === "next"){
      if(parseFloat(dd) === 28) {
        setIncrementedDate(
          {month: parseFloat(mm) + 1,
          day: 1,
          year: yyyy,
          dateIncremented: true}
        )
      }else{
        setIncrementedDate(
          {month: mm,
          day: parseFloat(dd) + 1,
          year: yyyy,
          dateIncremented: true}
        )
      }
    }else if (direction === "prev"){
      if(parseFloat(dd) === 1){
        setIncrementedDate(
          {month: parseFloat(mm) - 1,
          day: 28,
          year: yyyy,
          dateIncremented: true}
        )
      } else {
      setIncrementedDate(
        {month: mm,
        day: dd - 1,
        year: yyyy,
        dateIncremented: true}
      )
      }
    }
  }
  
  return (
    <div className="App">
      
      <FetchDate setFetchDate = {setFetchDate} setIncrementedDate = {setIncrementedDate} />
      <Image image = {data.url}/>
      <div className = "dateNav">
        <Button inverted onClick = {() => incrementDate("prev")}>Prev</Button>
        <Date date = {data.date} />
        <Button inverted onClick = {() => incrementDate("next")}>Next</Button>
      </div>
      <Explanation explanation = {data.explanation} />
    </div>
  );
}

export default App;
