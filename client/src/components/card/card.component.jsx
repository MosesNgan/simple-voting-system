
const Card = ({ campaign, submitVote }) => {
  const { id, question, startedAt, endedAt, candidates } = campaign;

  return (
    <div className='campaign-container' key={id} style={{border: "2px solid grey", margin: 20, padding: 20}}>
      <h3>Voting Campaign {id}: {question}</h3>
      <h5>{new Date(startedAt).toDateString()} - {new Date(endedAt).toDateString()}</h5>

      <form onSubmit={submitVote} style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 20px"}}>

        <label htmlFor="hkid-number">HKID Number</label>
        <input type="text" id="hkid-number" name="hkid-number" />

        <label htmlFor="candidate-id">Candidates</label>
        <select id="candidate-id" name="candidate-id">
          {
            candidates.sort(function(a, b){return b.voteCount - a.voteCount}).map(candidate => {
              return <option value={candidate.id} key={candidate.id}>
                {candidate.name} (Vote: {candidate.voteCount})
              </option>
            })
          }
        </select>

        <button type="submit">Vote</button>
    </form>
  </div>
  )
}

export default Card;
