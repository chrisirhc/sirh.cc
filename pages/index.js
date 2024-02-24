import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chris Chua</title>
      </Head>
      <main>
        <h1>Chris Chua</h1>
        <p>Software engineer.</p>
        <ul>
          <li>
            <a href="http://blog.sirh.cc/">Blog</a>
          </li>
          <li>
            <a href="http://github.com/chrisirhc/">Github</a>
          </li>
          {/* <a href="http://about.me/chrisirhc">about.me</a> */}
        </ul>
      </main>
    </>
  );
}
