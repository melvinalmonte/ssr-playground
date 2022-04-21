import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";
import { GetServerSideProps } from "next";

const s3URL = "http://melvs-pokemon.s3-website-us-east-1.amazonaws.com";

// this function gets called first, once fulfilled it calls and renders our react component
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const resp = await fetch(`${s3URL}/pokemon/${id}.json`);
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
};

type Details = {
  image: string;
  name: string;
  stats: { name: string; value: number }[];
  type: string[];
};

interface Pokemon {
  pokemon: Details;
}

export default function Details({ pokemon }: Pokemon) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link href={"/"}>Back to home</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`${s3URL}/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
