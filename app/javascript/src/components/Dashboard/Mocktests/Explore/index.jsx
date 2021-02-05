import React, { useEffect, useState } from "react";
import { PageLoader } from "neetoui";
import { withRouter } from "react-router-dom";
import { exploreMocktests } from "apis/mocktests";
import ListMocktests from "./ListMocktests";

function ExploreMocktests() {
  const [mocktests, setMocktests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExploreMocktests();
  }, []);

  const fetchExploreMocktests = () => {
    exploreMocktests().then(response => {
      setMocktests(response.data.mocktests);
      setIsLoading(false);
    });
  };

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen flex items-center">
          <PageLoader />
        </div>
      ) : (
        <ListMocktests mocktests={mocktests} />
      )}
    </div>
  );
}

export default withRouter(ExploreMocktests);
