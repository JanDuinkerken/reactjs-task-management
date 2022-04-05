import React from "react";
import axios from "axios";
import Navbar from "./Navbar";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tasks: [] };
  }

  componentDidMount() {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost:3000/tasks", config)
      .then((response) => {
        this.setState({ tasks: response.data });
        console.log("test");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderTasks() {
    const { tasks } = this.state;
    return tasks.map((task) => (
      <div class="container" key={task.id} style={{ "margin-top": "3vh" }}>
        <div class="notification is-primary">
          {task.id} | {task.title} | {task.description} | {task.status}
        </div>
      </div>
    ));

    //return tasks.map((task) => <div key={task.id}>{task.id} | {task.title} | {task.description} | {task.status}</div>);
  }

  render() {
    return (
      <>
        <Navbar />
        <div>{this.renderTasks()}</div>
      </>
    );
  }
}

export default Dashboard;
