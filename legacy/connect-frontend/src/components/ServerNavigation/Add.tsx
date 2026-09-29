import { useState } from "react";
import AddServer from "./AddServer";
import Modal from "../Modal";
import { Plus } from "../Icons";

export default () => {
  const [init, setInit] = useState(false);

  return (
    <>
      {init && (
        <Modal handleClose={() => setInit(!init)} dark>
          <AddServer />
        </Modal>
      )}
      <button
        className="server-icon flex justify-center items-center"
        onClick={() => setInit(!init)}
      >
        <span children={Plus} />
      </button>
    </>
  );
};
