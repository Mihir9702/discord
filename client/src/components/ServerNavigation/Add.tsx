import { useState } from "react";
import AddServer from "./AddServer";
import Modal from "../Modal";
import { Plus } from "../Icons";
import Tooltip from "../Tooltip";

export default () => {
  const [init, setInit] = useState(false);

  return (
    <>
      {init && (
        <Modal handleClose={() => setInit(!init)} dark>
          <AddServer onClose={() => setInit(false)} />
        </Modal>
      )}
      <Tooltip content="Add a Server" position="right">
        <button
          aria-label="Add a Server"
          className="server-icon flex justify-center items-center text-online hover:text-white hover:bg-online"
          onClick={() => setInit(!init)}
        >
          <span children={Plus} />
        </button>
      </Tooltip>
    </>
  );
};
