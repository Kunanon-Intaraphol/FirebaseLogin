// Import Firestore database
import {db} from "../firebase";
import React, { useState } from 'react';
import './read.css';
  
const Read = () => {
  
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

    const [info , setInfo] = useState([]);
  
    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
        console.log("Fetchdata")
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        const Uid = userId
        const Picid = pictureUrl
        const Nameid = displayName
        const Tokenid = idToken
        db.collection("contacts").doc(Uid).get().then((querySnapshot) => {
            console.log("incollection")
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var contacts = element.data();
                setInfo(arr => [...arr , contacts]);
                console.log("inSnapshot")
                  
            });
        })
    }
      
    // Display the result on the page
    return (
        <div>
            <center>
            <h3>NewsProof</h3> 
            </center>
        {
            info.map((contacts) => (
            <Frame title={contacts.title} 
                   text={contacts.text} 
                   AI={contacts.AI}
                   Status={contacts.status}/>
            ))
        }
        </div>
  
    );
}
  
// Define how each display entry will be structured
const Frame = ({title , text , AI ,Status}) => {
    console.log(title + " " + text + " " + AI);
    if(Status == "read"){
        
        console.log("inif")
        return(
        
            <center>
                <div className="div">
    <img src = {Picid} style={{width:200, height:200 ,borderRadius:10}}/>
    <h4>คุณ : {Nameid}</h4>
    <p>
    <h4>มีความเสี่ยงที่จะเป็นข่าวปลอม : {AI}%{"\n"}</h4>
    <h4>หัวข้อข่าว :</h4>  {title}{"\n"}       
    <h4>เนื้อหาข่าว</h4>  {text}{"\n"}
    </p>       
                </div>
            </center>
        );
        
    }
    else{
       
        return(
        
            <center>
                <div className="div">
    <p style={{fontSize: '20px'}}>โปรดรอสักครู ...ระบบกำลังประมวลผล... กรุณากดปุ่มเพื่อรับคำตอบ</p>     

    <button style={{ 
        width: "250px",
        height: "60px",
        marginTop:'30px',
        color: "#ebedf1",
        backgroundColor: '#3F89F3',
        fontSize:'20px',
        borderRadius:'5px',
        }}
        onClick={() => window.location.reload(false)}
        >
        กดเพื่อรับผลคำตอบ
    </button>
                </div>
            </center>
        );
    }
    
;
}

  
export default Read;
