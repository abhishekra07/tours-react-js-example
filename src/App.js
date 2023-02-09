import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTour = tours.filter((tour) => tour.id !== id);
    setTours(newTour);
  }

  const fetchData = async () => {
    try {
      let res = await fetch(url);
      let tours = await res.json();
      setLoading(false);
      setTours(tours);
      console.log(tours)
    } catch(error) {
      setLoading(false);
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if(loading){
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if( tours.length === 0){
    return <main>
      <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={fetchData}>
            Refresh
          </button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
}

export default App
