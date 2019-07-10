import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';
import Image from './Image';
import Explanation from './Explanation';
import Date from './Date';
import FetchDate from './FetchDate';

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
      console.log("incrementedDate")
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe&date=${incrementedDate.year}-${incrementedDate.month}-${incrementedDate.day}`)
      .then(res => {
        console.log("NEW AXIOS CALL DATE", res.data.date)
        setData(res.data)
      })
      .catch(err => {console.log(err)})
    }else if (fetchDate.dateGiven){
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe&date=${fetchDate.year}-${fetchDate.month}-${fetchDate.day}`)
      .then(res => {
        console.log(res.data.date)
        setData(res.data)
      })
      .catch(err => {console.log(err)})
    }else{
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe&date=2012-03-14`)
        .then(res => {
          console.log(res.data.date)
          setData(res.data)
        })
        .catch(err => {})
      }
  }

  useEffect(() => {
    fetchData();
  }, [fetchDate, incrementedDate])


  const incrementDate = (direction) => {
    console.log("Current date:",data.date)
    var dateSplit = data.date.split("-");
    //=====================
    let dd = dateSplit[2];
    let mm = dateSplit[1];
    let yyyy = dateSplit[0];

    console.log("SPLIT CURRENT DATE", dd, mm, yyyy)
    
    if (direction === "next"){
      console.log("NEXT TRIGGER")
      setIncrementedDate(
        {month: mm,
        day: parseFloat(dd) + 1,
        year: yyyy,
        dateIncremented: true}
      )
    }else if (direction === "prev"){
      console.log("PREV TRIGGER")
      setIncrementedDate(
        {month: mm,
        day: dd - 1,
        year: yyyy,
        dateIncremented: true}
      )
    }
  }
  
  return (
    <div className="App">
      
      <FetchDate setFetchDate = {setFetchDate} />
      <Image image = {data.url}/>
      <div className = "dateNav">
        <button onClick = {() => incrementDate("prev")}>Prev</button>
        <Date date = {data.date} />
        <button onClick = {() => incrementDate("next")}>Next</button>
      </div>
      <Explanation explanation = {data.explanation} />
    </div>
  );
}

export default App;
