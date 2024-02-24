import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chris Chua</title>
      </Head>
      <div className="container">
        <div className="jumbotron" id="me">
          <h1>Chris Chua</h1>
          <p>Visualizing with code.</p>
          <div className="row">
            <div className="col-sm-4 text-center">
              <p>
                <a href="http://blog.sirh.cc/">Blog</a>
              </p>
            </div>
            <div className="col-sm-4 text-center">
              <p>
                <a href="http://github.com/chrisirhc/">Code</a>
              </p>
            </div>
            <div className="col-sm-4 text-center">
              <p>
                <a href="http://about.me/chrisirhc">about.me</a>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center" id="svg-container"></div>
      </div>
    </div>
  );
}
