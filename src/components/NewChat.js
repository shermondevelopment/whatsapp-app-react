import React, { useState, useEffect } from "react";
import "./newChatCss.css";
import Api from '../Api';

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default ({ user, chatlist, show, setShow }) => {
  const [list, setList] = useState([]);

  const handleClose = () => {
      setShow(false);
  }

  useEffect(()=> {
      const getList = async () => {
        if(user !== null) {
          let result = await Api.getContactList(user.id);
          setList(result);
        }
      }
      getList();
  }, [user]);

  const addNewChat = async (user2) => {
    await Api.addNewChat(user, user2);
    handleClose();
  }

  return (
    <>
      <div className="newChat" style={{ left: show ? 0 : -415 }}>
        <div className="newChat--head">
          <div className="newChat--backbutton" onClick={handleClose}>
            <ArrowBackIcon style={{ color: "#fff" }} />
          </div>
          <div className="newChat--headertitle">Nova Conversa</div>
        </div>
        <div className="newChat--list">
          {list.map((item, key) => (
            <div className="newChat--item" key={key} onClick={()=>addNewChat(item)}>
              <img className="newChat--itemavatar" src={item.avatar} alt="" />
              <div className="newChat--itemname">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
