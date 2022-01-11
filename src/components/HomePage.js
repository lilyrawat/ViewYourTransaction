import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parse } from "papaparse";
import { Button, Table, Container } from "react-bootstrap";
import * as userActions from "../store/action/user";
import Header from "./Header";

export default function HomePage() {
  const myUser = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [highlighted, setHighlighted] = React.useState(false);
  const [isUploaded, setUpload] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [approval, setApproval] = React.useState(false);

  const calculateAmount = async () => {
    let result = {
      tt: 0,
      reward: 0,
      ttr: 0,
      total_amount: 0,
      net_amount: 0,
    };

    transactions.forEach((item) => {
      result.tt += 1;
      result.total_amount += parseInt(item.Amount);
      let reward = 0;

      if (item.isApproved) {
        result.ttr += 1;
        result.reward += parseInt(item.Amount) * 0.1;
        reward = item.Amount * 0.1;
        item["Reward"] = reward;
        item["NetAmount"] = parseInt(item.Amount) - reward;
        result.net_amount =
          result.net_amount + (parseInt(item.Amount) - reward);
      } else {
        item["NetAmount"] = parseInt(item.Amount);
        result.net_amount = result.net_amount + parseInt(item.Amount);
      }
    });
    await dispatch(userActions.storeresult(result));

    for (const k in transactions) {
      await dispatch(userActions.storetransaction(transactions[k]));
    }

    Navigate("/summary");
  };

  return (
    <div>
      <Header />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h1 className="text-center text-4xl">Upload Your File Here.</h1>
          <div
            style={{
              borderStyle: "solid",
              padding: "6px",
              margin: "20px",
              borderWidth: "2px",
              borderColor: highlighted ? "Green" : "Gray",
              backgroundColor: highlighted ? "#b2f7b2" : "#F7F7F7",
            }}
            onDragEnter={() => {
              setHighlighted(true);
            }}
            onDragLeave={() => {
              setHighlighted(false);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              setHighlighted(false);

              Array.from(e.dataTransfer.files)
                .filter((file) => file.type === "text/csv")
                .forEach(async (file) => {
                  const text = await file.text();

                  const result = parse(text, {
                    header: true,
                    skipEmptyLines: true,
                  });
                  setTransactions(result.data);
                  let newData = result.data;
                  newData.forEach((item) => {
                    item["userId"] = myUser[0].id;
                    item["isApproved"] = null;
                    item["Reward"] = 0;
                    item["NetAmount"] = 0;
                  });
                  setTransactions(newData);
                  setUpload(true);
                });
            }}
          >
            DROP HERE
          </div>
          {isUploaded && (
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Approve</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={transaction["Transaction ID"]}
                      style={{
                        backgroundColor: transaction.isApproved
                          ? "#ccffc9"
                          : transaction.isApproved === false
                          ? "#ffa6a6"
                          : null,
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{transaction.Date}</td>
                      <td>{transaction["Transaction ID"]}</td>
                      <td>{transaction.Amount}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => {
                            transaction["isApproved"] = true;
                            setApproval((value) => !value);
                          }}
                        >
                          Approve
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            transaction["isApproved"] = false;
                            setApproval((value) => !value);
                          }}
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className="w-100 my-3" onClick={calculateAmount}>
                Submit
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
