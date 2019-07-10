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



  const fetchData = () => {
    if (fetchDate.dateGiven){
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe&date=${fetchDate.year}-${fetchDate.month}-${fetchDate.day}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {console.log(err)})
    }else{
      axios.get (`https://api.nasa.gov/planetary/apod?api_key=wiOcfSgtOXuVwPMP0rKNbhnhcTC1H58IRNv4N0Oe&date=2012-03-14`)
        .then(res => {
          setData(res.data)
        })
        .catch(err => {console.log(err)})
      }
  }

  useEffect(() => {
    fetchData();
  }, [fetchDate])

  
  return (
    <div className="App">
      <FetchDate setFetchDate = {setFetchDate} />
      <Image image = {data.url}/>
      <Date date = {data.date} />
      <Explanation explanation = {data.explanation} />
    </div>
  );
}

export default App;
