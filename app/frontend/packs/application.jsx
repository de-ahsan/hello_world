// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

 require('@rails/ujs').start()
 require('@rails/activestorage').start()
 require('channels')

import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react';
import App from '../components/app';
import styles from './application.css';
import "core-js/stable";
import "regenerator-runtime/runtime";

if(process.env.sentry_dsn) {
  Sentry.init({
    dsn: process.env.sentry_dsn,
    environment: process.env.RAILS_ENV,
    release: process.env.REV,
  });
}

ReactDOM.render(<App />, document.getElementById('root'))

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
