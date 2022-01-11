import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const result = useSelector((state) => state.user.result);
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      {result && (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <h1>Summary</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Total Transactions</th>
                  <th>Total Transactions with Reward</th>
                  <th>Total Amount</th>
                  <th>Total Reward</th>
                  <th>Total Net Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{result.tt}</td>
                  <td>{result.ttr}</td>
                  <td>{result.total_amount}</td>
                  <td>{result.reward.toFixed(2)}</td>
                  <td>{result.net_amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              onClick={() => {
                navigate("/home");
              }}
            >
              Go to Main Menu
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
}
