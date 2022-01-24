import React, { useState, useEffect } from "react";
import "../components/app.css";
import {db} from "../firebase";
import DatePicker from "react-datepicker";
import AI from "./AI"
import { Link , useNavigate } from 'react-router-dom'
import liff from '@line/liff';
// import "react-datepicker/dist/react-datepicker.css";
const Contact = () => {
  // const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [title, settitle] = useState("");
  const [text, setMessage] = useState("");
  const [status, setstatus] = useState("unread");
  const [AI, setAI] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [idToken, setIdToken] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const initLine = () => {
    liff.init({ liffId: '1656553430-MzgGexx9' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
    }
  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setUserId(profile.userId);
      setPictureUrl(profile.pictureUrl);
    }).catch(err => console.error(err));
  }
  useEffect(() => {
    initLine();
  }, []);

  let navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    db.collection("contacts")
      .add({
        // name: name,
        startDate: startDate,
        title: title,
        text: text,
        status:status,
        AI:AI,
        userId:userId,
        displayName:displayName,
        idToken:idToken,
        pictureUrl:pictureUrl,

      })
      .then(() => {
        navigate("./AI")
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    // setName("");
    setStartDate("");
    settitle("");
    setMessage("");
    setstatus("");
    setAI("");
    setUserId("");
    setDisplayName("");
    setIdToken("");
    setPictureUrl("");
    
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
    
      <h1>ตรวจสอบข่าวปลอม</h1>
        <h2>ระบุข่าว</h2>

      {/* <label></label>
      <input
        placeholder="ชื่อ"
        style={{ color: " #3F89F3" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /> */}
    

      <label></label>
      <input
        placeholder="หัวข้อข่าว"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        showTimeSelect
        dateFormat="Pp"
        required
        style={{ 
        padding: "20px",
        width: "300px",
        height: "60px",
        marginLeft: "auto",
        marginRight: "auto",
        }} 
      />

      <label></label>
      <textarea
        placeholder="เนื้อหาข่าว"
        value={text}
        onChange={(e) => setMessage(e.target.value)}
        required
        style={{ 
          padding: "20px",
          width: "300px",
          height: "150px",
          marginLeft: "auto",
          marginRight: "auto",
          }} 
        
      ></textarea>

    
      {/* <DatePicker
        // selected={startDate}
        // onSelect={startDate}
        // onChange={(date) => setStartDate(date)}
        // required
      /> */}

      {/* <Link to="/AI" 
        type="submit"
        style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>  */}
      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " #3F89F3", 
        width: "150px",
        height: "60px",
        color: "#fff" ,
        alignItems: 'center',
        float:"center",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        ส่ง
      </button>
      {/* </Link> */}
    </form>
  );
};

export default Contact;
