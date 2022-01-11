import React, { useEffect } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/action/authenticate";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const myUser = useSelector((state) => state.user.users);
  const token = useSelector((state) => state.authenticate.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    if (myUser.length === 0) {
      navigate("/");
    }
  };

  const signOut = async () => {
    await dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div className="header">
      <span className="header__optionLineOne">
        Hello {myUser.length > 0 && myUser[0].email}
      </span>
      <span className="header__optionLineTwo" onClick={signOut}>
        Sign Out
      </span>
    </div>
  );
}
