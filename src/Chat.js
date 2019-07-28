import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("localhost:8080");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const username = useUserInput("");
  const message = useUserInput("");
  const to = useUserInput("");
  const pMessage = useUserInput("");

  const sendMessage = (priv = false) => {
    socket.emit("SEND_MESSAGE", {
      author: username.value,
      to: priv ? to.value : "",
      message: priv ? pMessage.value : message.value
    });
    if (priv) {
      pMessage.setValue("");
    } else {
      message.setValue("");
    }
  };

  socket.on("RECEIVE_MESSAGE", function(data) {
    addMessage(data);
  });

  const addMessage = data => {
    console.log(data);
    if (data.to === "" || data.to === username.value) {
      setMessages([...messages, data]);
    }
    console.log(messages);
  };

  function useUserInput(initial) {
    const [value, setValue] = useState(initial);

    function handleChange(e) {
      setValue(e.target.value);
    }
    return {
      value,
      setValue,
      onChange: handleChange
    };
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Global Chat</div>
              <hr />
              <div className="messages">
                {messages.map(message => {
                  return (
                    <div>
                      {message.author}: {message.message}
                    </div>
                  );
                })}
              </div>
              <div className="footer">
                <input
                  type="text"
                  placeholder="Username"
                  {...username}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  {...message}
                />
                <br />
                <button
                  onClick={() => sendMessage(false)}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Private Messaging</div>
              <hr />
              <div className="footer">
                <input
                  type="text"
                  placeholder="Send PM To:"
                  {...to}
                  className="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  {...pMessage}
                />
                <br />
                <button
                  onClick={() => sendMessage(true)}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import io from "socket.io-client";
// class Chat extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       message: "",
//       messages: []
//     };
//     this.socket = io("localhost:8080");
//     this.sendMessage = ev => {
//       ev.preventDefault();
//       this.socket.emit("SEND_MESSAGE", {
//         author: this.state.username,
//         message: this.state.message
//       });
//       this.setState({ message: "" });
//     };
//     this.socket.on("RECEIVE_MESSAGE", function(data) {
//       addMessage(data);
//     });

//     const addMessage = data => {
//       console.log(data);
//       this.setState({ messages: [...this.state.messages, data] });
//       console.log(this.state.messages);
//     };
//   }
//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-4">
//             <div className="card">
//               <div className="card-body">
//                 <div className="card-title">Global Chat</div>
//                 <hr />
//                 <div className="messages">
//                   {this.state.messages.map(message => {
//                     return (
//                       <div>
//                         {message.author}: {message.message}
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="footer">
//                   <input
//                     type="text"
//                     placeholder="Username"
//                     value={this.state.username}
//                     onChange={ev =>
//                       this.setState({ username: ev.target.value })
//                     }
//                     className="form-control"
//                   />
//                   <br />
//                   <input
//                     type="text"
//                     placeholder="Message"
//                     className="form-control"
//                     value={this.state.message}
//                     onChange={ev => this.setState({ message: ev.target.value })}
//                   />
//                   <br />
//                   <button
//                     onClick={this.sendMessage}
//                     className="btn btn-primary form-control"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Chat;
