import Head from 'next/head'
import {useEffect} from 'react';
import setupFunkyBackground from '../src/funky-bg.js';

export default function Home() {
  useEffect(() => setupFunkyBackground(), []);

  return (
    <div>
      <Head>
        <title>Chris Chua</title>
        <script dangerouslySetInnerHTML={{__html: `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-38702346-1', 'auto');
          ga('send', 'pageview');
        `}} />
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
  )
}
