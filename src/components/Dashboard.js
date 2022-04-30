import React from "react";
import axios from "axios";
import Navbar from "./Navbar";

class Dashboard extends React.Component {
  taskFilter = "All tasks";

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
        let ordered = response.data.sort(function (a, b) {
          if (a.status === b.status) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            return a < b ? -1 : a > b ? 1 : 0;
          } else {
            a = a.status === "OPEN" ? 1 : a.status === "IN_PROGRESS" ? 2 : 3;
            b = b.status === "OPEN" ? 1 : b.status === "IN_PROGRESS" ? 2 : 3;
            return a < b ? -1 : a > b ? 1 : 0;
          }
        });
        this.setState({ tasks: ordered });
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

    const changeState = (task) => {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      let data = { status: "OPEN" };

      if (task.task.status === "IN_PROGRESS") {
        data = { status: "DONE" };
      }

      if (task.task.status === "OPEN") {
        data = { status: "IN_PROGRESS" };
      }

      axios
        .patch(
          "http://localhost:3000/tasks/" + task.task.id + "/status",
          data,
          config
        )
        .then((response) => {
          this.setState((prevState) => ({
            tasks: prevState.tasks.map((oldTask) =>
              oldTask.id === task.task.id
                ? {
                    ...oldTask,
                    status: response.data.status,
                  }
                : oldTask
            ),
          }));

          let ordered = this.state.tasks.sort(function (a, b) {
            if (a.status === b.status) {
              a = a.title.toLowerCase();
              b = b.title.toLowerCase();
              return a < b ? -1 : a > b ? 1 : 0;
            } else {
              a = a.status === "OPEN" ? 1 : a.status === "IN_PROGRESS" ? 2 : 3;
              b = b.status === "OPEN" ? 1 : b.status === "IN_PROGRESS" ? 2 : 3;
              return a < b ? -1 : a > b ? 1 : 0;
            }
          });

          this.setState({ tasks: ordered });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const { tasks } = this.state;
    return tasks.map((task) => (
      <article
        className={
          task.status === "OPEN"
            ? "message is-primary"
            : task.status === "IN_PROGRESS"
            ? "message is-warning"
            : "message is-danger"
        }
        key={task.id}
        style={{
          marginTop: "3vh",
          border: "0.05vh solid #08d4b4",
          userSelect: "none",
        }}
        onClick={() => changeState({ task })}
      >
        <div className={"message-header"}>
          <p>{task.title}</p>
          <button
            className="delete is-medium"
            aria-label="delete"
            onClick={() => deleteTask({ task })}
          ></button>
        </div>
        <div className="message-body">{task.description}</div>
      </article>
    ));
  }

  render() {
    let titleInput = React.createRef(); // React use ref to get input value
    let descInput = React.createRef();
    let searchInput = React.createRef();

    const OnClickSearch = () => {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      console.log(this.taskFilter);
      let url = "http://localhost:3000/tasks";
      if (this.taskFilter !== "All tasks") {
        url =
          url +
          "?status=" +
          (this.taskFilter === "Open"
            ? "OPEN"
            : this.taskFilter === "In progress"
            ? "IN_PROGRESS"
            : "DONE") +
          "&search=" +
          searchInput.current.value;
      } else {
        url = url + "?search=" + searchInput.current.value;
      }

      console.log(url);
      axios
        .get(url, config)
        .then((response) => {
          let ordered = response.data.sort(function (a, b) {
            if (a.status === b.status) {
              a = a.title.toLowerCase();
              b = b.title.toLowerCase();
              return a < b ? -1 : a > b ? 1 : 0;
            } else {
              a = a.status === "OPEN" ? 1 : a.status === "IN_PROGRESS" ? 2 : 3;
              b = b.status === "OPEN" ? 1 : b.status === "IN_PROGRESS" ? 2 : 3;
              return a < b ? -1 : a > b ? 1 : 0;
            }
          });

          this.setState({ tasks: ordered });
        })
        .catch((error) => {
          console.log("Error getting tasks" + error);
        });
      searchInput.current.value = "";
    };

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

          let ordered = this.state.tasks.sort(function (a, b) {
            if (a.status === b.status) {
              a = a.title.toLowerCase();
              b = b.title.toLowerCase();
              return a < b ? -1 : a > b ? 1 : 0;
            } else {
              a = a.status === "OPEN" ? 1 : a.status === "IN_PROGRESS" ? 2 : 3;
              b = b.status === "OPEN" ? 1 : b.status === "IN_PROGRESS" ? 2 : 3;
              return a < b ? -1 : a > b ? 1 : 0;
            }
          });

          this.setState({ tasks: ordered });
        })
        .catch((error) => {
          console.log("Error creating task" + error);
        });
      titleInput.current.value = "";
      descInput.current.value = "";
    };

    const handleChange = (event) => {
      this.taskFilter = event.target.value;
      console.log(this.taskFilter);
      console.log(event.target.value);
    };

    return (
      <>
        <Navbar />
        <div className="container" style={{ marginTop: "3vh" }}>
          <label className="label">Search</label>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                ref={searchInput}
                type="text"
                className="input is-rounded"
                placeholder="Enter words to search"
              />
              <span class="icon is-medium is-left">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
            <div className="control">
              <div className="select" style={{ marginBottom: "1vh" }}>
                <select onChange={handleChange}>
                  <option>All tasks</option>
                  <option>Open</option>
                  <option>In progress</option>
                  <option>Done</option>
                </select>
              </div>
            </div>
            <p className="control">
              <button
                className="button is-rounded is-primary"
                onClick={OnClickSearch}
              >
                Search
              </button>
            </p>
          </div>

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
              Add
            </button>
          </div>

          <div>{this.renderTasks()}</div>
        </div>
      </>
    );
  }
}

export default Dashboard;
