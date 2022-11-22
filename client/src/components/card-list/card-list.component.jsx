import Card from '../card/card.component';

const CardList = ({ campaigns, submitVote }) => {
  return (
    <div className='card-list'>
      {
        campaigns.map((campaign) => {
          return <Card key={campaign.id} campaign={campaign} submitVote={submitVote} />
        })
      }
    </div>
  )
}

export default CardList;