import {
  CREATEUSER,
  FETCHUSER,
  STORERESULT,
  STORETRANSACTION,
} from "../action/user";
import User from "../../model/user";
import Transaction from "../../model/transaction";

const initialState = {
  users: [],
  result: null,
  transactions: null,
};

const userHandler = (state = initialState, action) => {
  switch (action.type) {
    case CREATEUSER:
      const newUser = new User(action.userId, action.email);
      return { users: state.users.concat(newUser) };
    case FETCHUSER:
      return { users: action.user };
    case STORERESULT:
      return { ...state, result: action.result };
    case STORETRANSACTION:
      const newTransaction = new Transaction(
        action.transaction.userId,
        action.transaction.Date,
        action.transaction["Transaction ID"],
        action.transaction.Amount,
        action.transaction.isApproved,
        action.transaction.Reward,
        action.transaction.NetAmount
      );
      console.log(state);
      return {
        ...state,
        transactions: newTransaction,
      };
    default:
      return state;
  }
};

export default userHandler;
