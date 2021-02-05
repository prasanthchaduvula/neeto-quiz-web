import React, { useState } from "react";
import { Button, Toastr } from "neetoui";
import { joinMocktest } from "apis/mocktests";
import { withRouter } from "react-router-dom";

function Details({ onClose, mocktest, history }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    joinMocktest(mocktest.id).then(response => {
      Toastr.success(response.data.notice);
      setLoading(false);
      onClose();
      history.push(`/mocktests/${mocktest.id}`);
    });
  };

  return (
    <div>
      <p className="leading-5 truncate text-lg font-semibold mb-2">
        {`Mocktest Name: ${mocktest.name}`}
      </p>
      <p className="leading-5 truncate text-base">
        {`Total questions: ${mocktest.total_questions}`}
      </p>
      <div className="absolute bottom-0 left-0 w-full bg-white nui-pane--footer">
        {mocktest.price ? (
          <Button
            label={`Buy this mocktest for ${mocktest.price}`}
            size="large"
            style="primary"
            fullWidth
            className="ml-2 text-center text-base font-bold"
          />
        ) : (
          <Button
            label="Join this mocktest for free"
            size="large"
            style="primary"
            fullWidth
            className="ml-2 text-center text-base font-bold"
            loading={loading}
            onClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default withRouter(Details);
