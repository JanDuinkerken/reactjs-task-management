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
        style={{ marginTop: "3vh", border: "0.05vh solid #08d4b4" }}
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
    let titleInput = React.createRef(); // React use ref to get input value
    let descInput = React.createRef();

    const OnClickHandler = () => {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const newTask = {
        title: `${titleInput.current.value}`,
        description: `${descInput.current.value}`,
      };
      axios
        .post("http://localhost:3000/tasks", newTask, config)
        .then((response) => {
          this.setState({
            tasks: [...this.state.tasks, response.data],
          });
        })
        .catch((error) => {
          console.log("Error creating task" + error);
        });
    };

    return (
      <>
        <Navbar />
        <div className="container" style={{ marginTop: "3vh" }}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                ref={titleInput}
                className="input"
                type="text"
                placeholder="Task title"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                ref={descInput}
                className="input"
                type="text"
                placeholder="Task description"
              />
            </div>
          </div>

          <div className="control">
            <button className="button is-primary" onClick={OnClickHandler}>
              Submit
            </button>
          </div>

          <div>{this.renderTasks()}</div>
        </div>
      </>
    );
  }
}

export default Dashboard;
