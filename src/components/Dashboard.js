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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderTasks() {
    const deleteTask = (task) => {
      console.log(task);
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .delete("http://localhost:3000/tasks/" + task.task.id, config)
        .then((response) => {
          this.setState({
            tasks: this.state.tasks.filter(function (tasklist) {
              return tasklist.id !== task.task.id;
            }),
          });
          console.log("test");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const { tasks } = this.state;
    return tasks.map((task) => (
      <article
        className="message is-primary is-medium is-three-quarters"
        key={task.id}
        style={{ marginTop: "3vh" }}
      >
        <div className="message-header">
          <p>{task.title}</p>
          <button
            className="delete is-medium"
            aria-label="delete"
            onClick={() => deleteTask({ task })}
          ></button>
        </div>
        <div className="message-body">
          {task.description} | {task.status}
        </div>
      </article>
    ));
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
