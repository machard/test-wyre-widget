import './App.css';

let deviceToken = localStorage.getItem("DEVICE_TOKEN2");
if (!deviceToken) {
    let array = new Uint8Array(25);
    window.crypto.getRandomValues(array);
    deviceToken = Array.prototype.map
        .call(array, x => ("00" + x.toString(16)).slice(-2))
        .join("");
    localStorage.setItem("DEVICE_TOKEN2", deviceToken);
}

function App() {
  return (
    <div className="App">
      <button onClick={() => {
        const handler = new window.Wyre({
          env: "test",
          auth: {
              type: "secretKey",
              secretKey: deviceToken
          },
          operation: {
              type: "onramp",
              destCurrency: "ETH",
              dest: "ethereum:0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413",
          },
          onExit: function (error) {
              if (error != null)
                  console.error(error)
              else
                  console.log("exited!")
          },
          onSuccess: function () {
              console.log("success!")
          }
        });
        handler.open();
      }}>Operation onramp to ETH 0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413</button>
      <br />
      <button onClick={() => {
        const handler = new window.Wyre({
          env: "test",
          auth: {
              type: "secretKey",
              secretKey: deviceToken
          },
          operation: {
              type: "onramp",
          },
          onExit: function (error) {
              if (error != null)
                  console.error(error)
              else
                  console.log("exited!")
          },
          onSuccess: function () {
              console.log("success!")
          }
        });
        handler.open();
      }}>Operation onramp without destination specicied (form not prefilled)</button>
      <br />
      <button onClick={() => {
        const handler = new window.Wyre({
          env: "test",
          auth: {
              type: "secretKey",
              secretKey: deviceToken
          },
          operation: {
              type: "none",
          },
          onExit: function (error) {
              if (error != null)
                  console.error(error)
              else
                  console.log("exited!")
          },
          onSuccess: function () {
              console.log("success!")
          }
        });
        handler.open();
      }}>Open widget with operation none (form broken)</button>
    </div>
  );
}

export default App;
