import React, { Component } from 'react';
import './App.css';

class ExampleComponent extends Component {
  constructur(props) {
    super(props);

    this.state = {
      articles: [
        { title: "React Redux Tutorial for Beginners", id: 1},
        { title: "Typescript Tutorial for Beginners", id: 2}
      ]
    };

    this.render() {
      const { articles } = this.state;
      return <ul>
        {articles.map(el => <li key={el.id}>{el.title}</li>)}
      </ul>;
    }
  }
}

export default App;
