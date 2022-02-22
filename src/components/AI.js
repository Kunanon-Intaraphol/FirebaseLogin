// Import Firestore database
import {db} from "../firebase";
import React, { useState , useEffect } from 'react';
import './read.css';
// import PercentageCircle from 'reactjs-percentage-circle';
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from "./ChangingProgressProvider";
// import liff from '@line/liff';


const Read = () => {
    
    // const { data } = this.props.Uid


    setTimeout(function() {
        window.location.reload(false);
    }, 7000)
    
    const [info , setInfo] = useState([]);

    // const [userId, setUserId] = useState("");    
    // const [displayName, setDisplayName] = useState("");
    // const [idToken, setIdToken] = useState("");
    // const [pictureUrl, setPictureUrl] = useState("");

    // const initLine = () => {
    //     liff.init({ liffId: '1656553430-qgAJV55b' }, () => {
    //       if (liff.isLoggedIn()) {
    //         runApp();
    //       } else {
    //         liff.login();
    //       }
    //     }, err => console.error(err));
    //     }
    // const runApp = () => {
    //     const idToken = liff.getIDToken();
    //     setIdToken(idToken);
    //     liff.getProfile().then(profile => {
    //       console.log(profile);
    //       setDisplayName(profile.displayName);
    //       setUserId(profile.userId);
    //       setPictureUrl(profile.pictureUrl);
    //     }).catch(err => console.error(err));
    // }
    //   useEffect(() => {
    //     initLine();
    // }, []);
    
    

    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
        console.log("Fetchdata")
      });
  
    // Fetch the required data using the get() method
    const Fetchdata = ()=>{

        // const Uid = userId

        db.collection("contacts").get().then((querySnapshot) => {
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
            {/* <img src = {pictureUrl} style={{width:200, height:200 ,borderRadius:10,marginTop:20,marginBottom:20}}/>
            <h2>สวัสดีคุณ : {displayName}</h2>/
            <h2>{userId}</h2>
            <h2>{idToken}</h2> */}
            
            </center>
        {
            info.map((contacts) => (
            <Frame News={contacts.news} 
                   Sentence={contacts.sentence} 
                   FAI={contacts.FAI}
                   INTFAI={contacts.intFAI}
                   TAI={contacts.TAI}
                   Status={contacts.status}/>
                   
            ))
        }
        </div>
        
    );
}

const Frame = ({News , Sentence , FAI ,Status ,TAI ,INTFAI}) => {

    console.log(News + " " + Sentence + " " + FAI + " " + TAI + " " + INTFAI);
    if(Status == "read"){
        console.log("inif")

        return(
            <center>
                
            
                <div className="div">
    <h7 style={{marginTop:"30px",marginBottom:"30px",fontSize:"16px",marginleft:"30px",color:"#3F89F3"}}>โปรดใช้ดุลพินิจของท่านในการตัดสินใจ</h7>


    <div style={{ width: 150, height: 150 ,marginTop:20,}}>
        <CircularProgressbar value={INTFAI}  text={`${INTFAI}%`} circleRatio={0.75} circleRatio={0.75} styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              textColor:"#3F89F3",
              width: "150px", 
              height: "150px",
              trailColor: "#909090",
              pathColor:"#3F89F3"
            })}
        />
    </div>

    {/* <ChangingProgressProvider style={{ width: "150px", height: "150px" , marginTop:"20px"}}>
        {value => (
          <CircularProgressbar
            value={INTFAI}
            text={`${INTFAI}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              textColor:"#3F89F3",
              width: "150px", 
              height: "150px",
              trailColor: "#909090",
              pathColor:"#3F89F3"
            })}
          />
        )}
    </ChangingProgressProvider> */}



    <h4 style={{marginTop:"30px"}}>มีความเสี่ยงที่จะเป็นข่าวปลอม  {"\n"}</h4> <h4><h8 style={{fontSize:"22px",color:"#e82a4d"}}>{FAI}%{"\n"}</h8></h4>
    <h4>มีความคล้ายที่จะเป็นข่าวจริง {"\n"}</h4> <h4><h9 style={{fontSize:"22px",color:"#18d93e"}}>{TAI}%{"\n"}</h9></h4>

    <p>
    <h4>เนื้อหาข่าว </h4> {News}
    <h4>รายละเอียดเพิ่มเติม </h4> {Sentence}
    </p>        
    
                </div>
            </center>
           
        );
        
    }

    else{

        return(
           
        
            <center>
                <div className="div">
    <p style={{fontSize: '20px'}}>โปรดรอสักครู่ ...ระบบกำลังประมวลผล... กรุณากดปุ่มเพื่อรับคำตอบ</p>     

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
