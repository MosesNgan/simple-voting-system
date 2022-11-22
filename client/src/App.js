import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import useCampaigns from "./hooks/useCampaigns";
import useVotes from "./hooks/useVotes";

import './App.css';

const App = () => {
  const campaigns = useCampaigns();
  const {
    submitVote,
  } = useVotes();

  const [searchField, setSearchField] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);

  useEffect(()=> {
    const newFilteredCampaigns = campaigns.filter((campaign) => {
      return campaign.question.toLocaleLowerCase().includes(searchField);
    });
    setFilteredCampaigns(newFilteredCampaigns);
  }, [campaigns, searchField, submitVote])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();

    setSearchField(searchFieldString);
  }

  return(
    <div className="App">
      <h1>Simple Voting System</h1>
      <SearchBox
        className='search-box'
        placeholder='search questions'
        onChangeHandler={onSearchChange}
      />
      <CardList campaigns={filteredCampaigns} submitVote={submitVote}/>
    </div>
  )
};

export default App;
