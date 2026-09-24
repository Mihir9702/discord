import React, { useState } from "react";
import Modal from "./Modal";

interface Props {
  title: string;
  children?: React.ReactNode;
  confirm: string;
  danger?: boolean;
  onConfirm: () => Promise<unknown> | unknown;
  onClose: () => void;
}

// "are you sure?" dialog - shows the api error if the action fails
export default ({
  title,
  children,
  confirm,
  danger,
  onConfirm,
  onClose,
}: Props) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onConfirm();
      onClose();
    } catch (ex: any) {
      setError(ex.message || "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <Modal handleClose={onClose} dark>
      <form
        onSubmit={run}
        className="bg-background text-gray-200 rounded-md w-[440px] max-w-[95vw] overflow-hidden font-normal"
      >
        <section className="p-4 flex flex-col gap-3">
          <h1 className="text-xl font-semibold text-white">{title}</h1>
          <div className="text-md text-gray-300">{children}</div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </section>
        <section className="bg-mid p-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm hover:underline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={busy}
            autoFocus
            className={`px-4 py-2 rounded text-sm text-white transition-all disabled:opacity-50 ${
              danger
                ? "bg-[#da373c] hover:bg-[#a12829]"
                : "bg-lightblue hover:bg-darkblue"
            }`}
          >
            {confirm}
          </button>
        </section>
      </form>
    </Modal>
  );
};
