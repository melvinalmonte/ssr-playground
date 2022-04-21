import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";

const s3URL = "http://melvs-pokemon.s3-website-us-east-1.amazonaws.com";

// It makes any requests to any services and returns an object that has props which then gets send to our react component
export const getServerSideProps: GetServerSideProps = async () => {
  const resp = await fetch(`${s3URL}/index.json`);
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
};

type Pokemon = {
  id: number;
  image: string;
  name: string;
};

interface PokeList {
  pokemon: Pokemon[];
}

function Home({ pokemon }: PokeList) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img src={`${s3URL}/${pokemon.image}`} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
