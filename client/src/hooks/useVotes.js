import { useCallback, useState } from "react";

import {
  httpSubmitVote,
} from './requests';

function useVotes() {
  const [isPendingVote, setPendingVote] = useState(false);

  const submitVote = useCallback(async (e) => {
    e.preventDefault();
    setPendingVote(true);
    const data = new FormData(e.target);
    const hkidNumber = data.get("hkid-number");
    const candidateId = data.get("candidate-id");
    const response = await httpSubmitVote({
      hkidNumber,
      candidateId,
    });

    const success = response.ok;
    if (success) {
      setPendingVote(false);
    }
  }, []);

  return {
    isPendingVote,
    submitVote,
  };
}

export default useVotes;