import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const s3URL = "http://melvs-pokemon.s3-website-us-east-1.amazonaws.com";

const Home: NextPage = () => {
  const [pokemon, setPokemon] = React.useState([]);
  React.useEffect(() => {
    getPokemon();
  }, []);
  async function getPokemon() {
    const resp = await fetch(`${s3URL}/index.json`);
    setPokemon(await resp.json());
  }
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
};

export default Home;
