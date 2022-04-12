import React from "react";
import InputField from "../InputField";

interface Props {
  menu: () => void;
}

const Join: React.FC<Props> = ({ menu }) => {
  const [tag, setTag] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(tag);
  };

  return (
    <div>
      <button className="absolute top-0 left-0 p-4" onClick={menu}>
        ↩
      </button>
      <form
        className="mt-6 border-2 p-6 flex flex-col gap-6 items-center bg-gray-500 rounded-lg shadow-2xl"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Server Tag"
          name={tag}
          placeholder="e.g. xey9m7"
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          className="bg-gray-800 text-md p-2 rounded-full shadow-lg hover:bg-gray-700"
          type="submit"
        >
          ✔
        </button>
      </form>
    </div>
  );
};

export default Join;
