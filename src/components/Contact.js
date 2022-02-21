import React, { useState, useEffect } from "react";
import "../components/app.css";
import {db} from "../firebase";
import DatePicker from "react-datepicker";
import AI from "./AI"
import { useNavigate } from 'react-router-dom'
import liff from '@line/liff';
// import "react-datepicker/dist/react-datepicker.css";

const Contact = () => {
  // const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [news, setNews] = useState("");
  const [sentence, setSentence] = useState("");
  const [status, setstatus] = useState("unread");
  const [FAI, setFAI] = useState("");
  const [TAI, setTAI] = useState("");
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

    const Uid = userId

    db.collection("contacts").doc(Uid)
      .set({
        // name: name,
        startDate: startDate,
        news: news,
        sentence: sentence,
        status:status,
        FAI:FAI,
        TAI:TAI,
        userId:userId,
        displayName:displayName,
        idToken:idToken,
        pictureUrl:pictureUrl,

      })
      .then(() => {
        navigate("./AI");

        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setStartDate("");
    setNews("");
    setSentence("");
    setstatus("");
    setFAI("");
    setTAI("");
    setUserId("");
    setDisplayName("");
    setIdToken("");
    setPictureUrl("");
    
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <center>
        <img src = {pictureUrl} style={{width:200, height:200 ,
          borderRadius:10,marginTop:20,marginBottom:20,marginTop:60}}/>
        <h2>สวัสดีคุณ : {displayName}</h2>
      </center>
    
      <h1>ตรวจสอบข่าวสาร</h1>
      <h6>กรุณาระบุข่าวสารที่ต้องการพร้อมรายละเอียดข่าวสารแบบข้อความ</h6>
      <h2>หัวข้อข่าว</h2>

      
      {/* <label></label>
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
        marginLeft: "30px",
        marginRight: "30px",
        }} 
      /> */}

      <h2>เนื้อหาข่าว</h2>
      <label></label>
      <textarea
        placeholder="เนื้อหาข่าว"
        value={news}
        onChange={(e) => setNews(e.target.value)}
        required
        style={{ 
          padding: "20px",
          width: "300px",
          height: "150px",
          // marginLeft: "30px",
          marginLeft: "auto",
          marginRight: "auto",
          marginRight: "30px",
          marginBottom: "20px",
          }} 
        
      ></textarea>
{/* <Link
  to={{
    pathname: "/AI",
    data: Uid 
  }}
> */}
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
        marginBottom: "40px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      >
        ส่ง
      </button>
      {/* </Link> */}
    </form>
  );
};

export default Contact;
