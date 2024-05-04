// Home.jsx

import React from 'react';

function Home() {
    console.log("ana gwa el home" , localStorage.getItem('id'));
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>
    </div>
  );
}

export default Home;
