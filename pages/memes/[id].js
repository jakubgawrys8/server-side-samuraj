import { useRouter } from 'next/router';

export default function Mem({mem: {name, url}}) {
  const { back } = useRouter();
  return (
    <>
      <h1>Meme</h1>
      <button style={{display: "block"}} onClick={() => back()}>Wróć</button>
      <img src={url} alt={`Mem ${name}`} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const response = await fetch("https://api.imgflip.com/get_memes");
  const { data, success } = await response.json();
  console.log("czy jestem na froncie")

  if (!success) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const mem = data.memes.find((meme) => meme.id === id);
  console.log('data' + mem);
  return {
    props: {mem},
  };
}
