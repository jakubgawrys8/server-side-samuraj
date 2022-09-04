import Link from "next/link";

export default function Memes({ memes }) {
  const listElements = memes.map((mem) => (
    <li key={mem.id}>
      <Link href={`/memes/${mem.id}`}>
        <a>{mem.name}</a>
      </Link>
    </li>
  ));

  return (
    <>
      <h1>Memy</h1>
      {listElements}
    </>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const { data, success } = await response.json();

  if (!success) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { memes } = data;

  return {
    props: { memes },
  };
};
