import React, { Component } from 'react';
import axios from 'axios';

const PH_API = "https://api.producthunt.com/v1/"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    let config = {
      headers: {
        'Authorization': "Bearer 3236a3b5d8ea50aee668a7259ad65a9ab39128d2bf79b10704b828cb032618ed"
      }
    }
    axios
      .get(PH_API + "/posts", config)
      .then(res => {
        console.log(res)
        this.setState({posts: res.data.posts})
      })
      .catch(err => {
        console.log(err)
        this.setState({error: err.message})
      })
  }

  render() {
    return (
      <div className="App">
        <h1>ProductHunt + Payfit</h1>
        <div>
          <p>Hello</p>
          {
            this.state.posts.map((post, idx) => {
              console.log(post.name)
                return <p key={idx}>{post.name}</p>
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
