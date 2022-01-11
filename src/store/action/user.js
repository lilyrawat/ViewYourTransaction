import User from "../../model/user";

export const CREATEUSER = "CREATEUSER";
export const FETCHUSER = "FETCHUSER";
export const STORERESULT = "STORERESULT";
export const STORETRANSACTION = "STORETRANSACTION";

export const createuser = (email) => {
  //getState - can take values from reducer
  //dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change.
  return async (dispatch, getState) => {
    const token = getState().authenticate.token;
    const userID = getState().authenticate.userId;
    const response = await fetch(
      `https://viewyourtransactions-default-rtdb.firebaseio.com/users.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          email: email,
        }),
      }
    );
    const result = await response.json();
    dispatch({ type: CREATEUSER, data: result, userId: userID, email: email });
  };
};

export const fetchuser = () => {
  return async (dispatch, getState) => {
    const token = getState().authenticate.token;
    const userID = getState().authenticate.userId;
    const response = await fetch(
      `https://viewyourtransactions-default-rtdb.firebaseio.com/users.json?auth=${token}`
    );

    const result = await response.json();
    const users = [];
    for (const k in result) {
      users.push(new User(result[k].userId, result[k].email));
    }
    dispatch({ type: FETCHUSER, user: users.filter((u) => u.id === userID) });
  };
};

export const storeresult = (result) => {
  return async (dispatch, getState) => {
    const userID = getState().authenticate.userId;
    result["userID"] = userID;
    dispatch({ type: STORERESULT, result: result });
  };
};

export const storetransaction = (transactions) => {
  return async (dispatch, getState) => {
    const token = getState().authenticate.token;
    const response = await fetch(
      `https://viewyourtransactions-default-rtdb.firebaseio.com/transactions.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: transactions.userId,
          Date: transactions.Date,
          TransactionId: transactions["Transaction ID"],
          amount: transactions.Amount,
          isApproved: transactions.isApproved,
          Reward: transactions.Reward,
          NetAmount: transactions.NetAmount,
        }),
      }
    );
    // console.log(transactions);
    const result = await response.json();

    dispatch({ type: STORETRANSACTION, transaction: transactions });
  };
};
