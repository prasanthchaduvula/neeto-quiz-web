import React from "react";
import { Pane } from "nitroui";

export default function AddChapterPane(props) {
  const onClose = () => props.setShowPane(false);
  return (
    <Pane
      title="Create a new chapter"
      isOpen={props.showPane}
      onClose={onClose}
    >
      <div className="p-6">
        {/* <ChapterForm
          onClose={onClose}
          
          isCreateForm={true}
        /> */}
      </div>
    </Pane>
  );
}
