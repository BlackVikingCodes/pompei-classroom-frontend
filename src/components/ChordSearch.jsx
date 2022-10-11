import React, { useState, useEffect } from 'react'

const API_KEY = '9f28f883225a79aed38698cb422c596b'

function ChordSearch() {

  const [chordsMode, setChordsMode] = useState('nodes')
  const [chordsChord, setChordsChord] = useState()
  const [chordsResults, setChordsResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleFetchChords = async (chords, query) => {
    let response = await fetch(`https://api.hooktheory.com/v1/trends/${query}?cp=${chords}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+API_KEY
      }
    })
    let json = await response.json()
    let results = json.slice(0,4)      
    setChordsResults([...results])
    setShowResults(true)
  }

  useEffect(() => {
    setShowResults(false)
  
    return
  }, [chordsMode])
  

  return (
    <div className='chord-search__component'>
      <h3>Chords Recommendations</h3>
      <h4 id='accent'>This section will help you turn your new homework into a hit</h4>
      <p>There's two possible answers you can get from this tool:
      </p> 
      <p className='chords-mode__explanation'>
      What should be my next chord to make this Homework a hit?
      <br/>
      or
      <br />
      What other hits use this chord progression?
      </p>
      <select 
          name="chordsMode" 
          id="chordsMode"
          onChange={(e) => setChordsMode(e.target.value)}
        >
        <option value="nodes">Next Chord</option>
        <option value="homeworks">Other homeworks</option>
      </select>
      <p className='chords-input__explanation'>Now type your first chord as a number (1-7), or your chord progression separating each number by a commma (e.g: 2,5,1). 
      <br />
      No spaces, please.
      </p>
        <input
         type="text"
         name="chordsChord"
         id="chordsChord"
         onChange={(e) => setChordsChord(e.target.value.toString())}
        />
        <button
          className='btn btn-search'
          onClick={() => handleFetchChords(chordsChord, chordsMode)}
        >
          Search
        </button>
      {showResults && <div className="chordsResults">
        <h4>Results</h4>
        {(chordsMode==='nodes') && chordsResults.map(result => (
          <div className='chord-details' key={result.chord_ID}>
            <p>
              The <span id='accent'><b>{result.chord_HTML}</b></span> chord follows great
            </p>
            <p>
              <span id='accent'><b>{(result.probability*100).toFixed(2)}%</b></span> of the time.
            </p>
          </div>
        ))}
        {(chordsMode==='homeworks') && chordsResults.map(result => (
          <div className='chord-details' key={result.url}>
            <p>
              <span id='accent'>
                <b>
                  {result.homework}
                </b>
              </span>
            </p>
  
            <p>
              by
              <span id='accent'>
                <b>
                   {' '+result.artist}
                </b>
              </span>
            </p>
            <p>
              has this chord progression in its
              <span id='accent'>
                <b>
                   {' '+result.section}
                </b>
              </span>.
            </p>
            <p>
              You can check the homework out <a href={result.url} target='_blank' rel="noreferrer">here</a>.
            </p>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default ChordSearch