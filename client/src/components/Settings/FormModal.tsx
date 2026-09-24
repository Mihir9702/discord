import React, { useState } from "react";
import Modal from "../Modal";

export interface Field {
  name: string;
  label: string;
  type?: string;
  value?: string;
  autoComplete?: string;
}

interface Props {
  title: string;
  description?: React.ReactNode;
  fields: Field[];
  submit: string;
  danger?: boolean;
  onSubmit: (values: Record<string, string>) => Promise<unknown>;
  onClose: () => void;
}

// small form in a modal - used for the account settings edits
export default ({
  title,
  description,
  fields,
  submit,
  danger,
  onSubmit,
  onClose,
}: Props) => {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, f.value || ""]))
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onSubmit(values);
      onClose();
    } catch (ex: any) {
      setError(ex.message);
      setBusy(false);
    }
  }

  return (
    <Modal handleClose={onClose} dark>
      <form
        onSubmit={save}
        className="bg-background text-gray-200 rounded-md w-[440px] max-w-[95vw] overflow-hidden font-normal"
      >
        <section className="p-4 flex flex-col gap-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {description && <p className="text-gray-400 mt-2">{description}</p>}
          </div>
          {fields.map((f, i) => (
            <label
              key={f.name}
              className="text-xs uppercase font-bold text-gray-400"
            >
              {f.label}
              <input
                type={f.type || "text"}
                autoFocus={i === 0}
                autoComplete={f.autoComplete}
                value={values[f.name]}
                onChange={(e) =>
                  setValues({ ...values, [f.name]: e.target.value })
                }
                className="mt-2 w-full bg-darkish text-gray-200 rounded p-2.5 focus:outline-none font-normal normal-case text-md"
              />
            </label>
          ))}
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
            className={`px-6 py-2 rounded text-sm text-white transition-all disabled:opacity-50 ${
              danger
                ? "bg-[#da373c] hover:bg-[#a12829]"
                : "bg-lightblue hover:bg-darkblue"
            }`}
          >
            {submit}
          </button>
        </section>
      </form>
    </Modal>
  );
};
