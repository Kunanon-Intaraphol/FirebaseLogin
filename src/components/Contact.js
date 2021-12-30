import React, { useState, useEffect } from "react";
import "../app.css";
import { db } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import liff from '@line/liff';


const Contact = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [title, settitle] = useState("");
  const [text, setMessage] = useState("");

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");

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
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  }, []);
  

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        date: date,
        startDate: startDate,
        title: title,
        text: text,
        displayName: displayName,
        userId: userId,
        pictureUrl:pictureUrl,

      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setDate("");
    setStartDate("");
    settitle("");
    setMessage("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>ตรวจสอบข่าวปลอม</h1>
        <h2>ระบุข่าวสารที่ต้องกกการพร้อมรายละเอียดข่าวสารแบบข้อความ</h2>

      <label></label>
      <input
        placeholder="ชื่อ"
        style={{ color: " #3F89F3" }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label></label>
      <input
        placeholder="วันที่"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label></label>
      <input
        placeholder="หัวข้อข่าว"
        value={title}
        onChange={(e) => settitle(e.target.value)}
        showTimeSelect
        dateFormat="Pp"
        required
      />

      <label></label>
      <textarea
        placeholder="เนื้อหาข่าว"
        value={text}
        onChange={(e) => setMessage(e.target.value)}
        required
      ></textarea>

      <label></label>
      <DatePicker 
        selected={startDate}
        onSelect={startDate}
        onChange={(date) => setStartDate(date)}
        required
      />

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " #3F89F3" }}
      >
        ส่ง
      </button>
    </form>
  );
};

export default Contact;
