import React from "react";
import Chat from "../src/components/Chat";
import ServerNavigation from "../src/components/ServerNavigation";
import AddServer from "../src/components/AddServer";
import Modal from "../src/components/Modal";

export default () => {
  const [ds, setds] = React.useState(false);

  const handleClose = () => {
    setds(!ds);
  };

  return (
    <div className={`max-w-8xl mx-auto bg-gray-900`}>
      {ds && (
        <Modal handleClose={handleClose}>
          <AddServer />
        </Modal>
      )}
      <div className="fixed z-10 inset-0 -left-10 shadow-md right-auto px-8 overflow-y-auto">
        <ServerNavigation ds={ds} setds={setds} />
        <div className="bg-gray-900 z-20 inset-0 fixed left-20 ml-2 text-center text-gray-100 shadow-md right-auto px-28 overflow-y-auto" />
        <Chat />
      </div>
    </div>
  );
};
