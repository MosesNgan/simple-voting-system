import { useCallback, useEffect, useState } from "react";

import { httpGetCampaigns } from "./requests";

function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  const getCampaigns = useCallback(async () => {
    const fetchedCampaigns = await httpGetCampaigns();
    setCampaigns(fetchedCampaigns);
  }, []);

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  return campaigns;
}

export default useCampaigns;
