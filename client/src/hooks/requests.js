const API_URL = 'http://localhost:8000';

async function httpGetCampaigns() {
  const response = await fetch(`${API_URL}/campaigns`);
  return await response.json();
}

async function httpSubmitVote(vote) {
  try {
    return await fetch(`${API_URL}/votes`, {
      method: 'post',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(vote),
    });
  } catch(err) {
    return {
      ok: false
    }
  }
}

export {
  httpGetCampaigns,
  httpSubmitVote,
};
