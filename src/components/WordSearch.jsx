import React, { useState, useEffect } from 'react'

function WordSearch() {

  const [wordsWord, setWordsWord] = useState()
  const [wordsMode, setWordsMode] = useState('rel_rhy')
  const [showResults, setShowResults] = useState(false)
  const [wordsResults, setWordsResult] = useState()


  const handleFetchWords = async (word, query) => {
    let response = await fetch(`https://api.datamuse.com/words?${query}=${word}`)
    let json = await response.json()
    let words = json.map(object => object.word)
    setWordsResult(words.join(', '))
    setShowResults(true)
  }

  useEffect(() => {
    setShowResults(false)
  
    return
  }, [wordsMode])
  

  return (
    <div className='word-search__component'>
      <h3>Words Recommendations</h3>
      <h4 id='accent'>This section will help you make your Content memorable!</h4>
      <p>There tool can help you find just the word you need
      </p> 
      <p className='words-mode__explanation'>
      "I'm looking for a word that..."
      </p>
        <select 
          name="wordsMode" 
          id="wordsMode"
          onChange={(e) => setWordsMode(e.target.value)}
        >
          <option value="rel_rhy">Rhymes with:</option>
          <option value="ml">Is related to:</option>
          <option value="rel_syn">Synonyms to:</option>
          <option value="rel_ant">Antonyms to:</option>
          <option value="rel_jjb">Adjectives to describe:</option>
          <option value="rel_jja">Nouns associated to:</option>
          <option value="rel_hom">Homophones of:</option>
          <option value="sl">Sounds like:</option>
        </select>
        <input 
          type="text" 
          name="wordsWord" 
          id="wordsWord" 
          placeholder='Enter any word'
          onChange={(e) => setWordsWord(e.target.value)}
        />
        <button className='btn btn-search' onClick={() => handleFetchWords(wordsWord, wordsMode)}>Search</button>
      {showResults && <div className="words-results">
        <h4>Results</h4>
        <textarea name="wordsResults" id="wordsResults" cols="30" rows="10" value={wordsResults} readOnly></textarea>
      </div>}
    </div>
  )
}

export default WordSearch