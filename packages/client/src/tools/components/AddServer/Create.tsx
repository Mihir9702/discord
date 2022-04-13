import { useRouter } from "next/router";
import React from "react";
import InputField from "../InputField";
import { useCreateServerMutation } from "../../generated/graphql";

interface Props {
  menu: () => void;
}

const Create: React.FC<Props> = ({ menu }) => {
  const [name, setName] = React.useState("");

  const [error, setError] = React.useState<string | undefined>(undefined);

  const router = useRouter();

  const [, create] = useCreateServerMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = { name };

    const response = await create({ params });

    if (response.error) {
      setError(response.error?.graphQLErrors[0].message);
    } else {
      router.push("/");
    }
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
          label="Server Name"
          name={name}
          onChange={(e) => setName(e.target.value)}
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

export default Create;
