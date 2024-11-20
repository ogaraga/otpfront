import {useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import useLoading from "./useLoading";
function Otp() {
  const [otpassword, setOtpassword] = useState('');
  const [state, setState] = useState(false);
  const [stated, setStated] = useState(false);
  const [isLoading] = useLoading();
  const navigate = useNavigate();  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState(isLoading);
    await fetch("https://one-time-password-omega.vercel.app/activateAccount", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ otpassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "Account activated!") {
          alert("Congrats! Email activated.");
          navigate("/login");
        } else {
          alert(data);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setState(!isLoading));
  };
  
  const getOtp = ()=>{  
    alert('OTP has been sent to your email already!')  
  }
  const handleGetOtp = async ()=>{
    setStated(isLoading);    
    setTimeout(() => {
      getOtp();
      setStated(!isLoading)
    }, 1000);
    }
    
  return (
    <div className="otp">
      <h1>Enter the OTP sent to you.</h1>
      <form className="reduce" onSubmit={handleSubmit}>
        <input
          type="text"
          name="otpassword"
          value={otpassword}
          onChange={(e) => setOtpassword(e.target.value) }
        placeholder="OTP?"/>
        {state ? (
          <div className="divspin">
            <Spinner />
          </div>
        ) : (
          <>
            {otpassword !== "" ? 
              <button type="submit" id="activate">
                Activate
               </button>
            : 
              <button type="submit" id="activate" disabled style={{cursor: 'not-allowed'}}>
                disabled
              </button>
            }
          </>
        )}
      </form>
      <div className="divspin2">
      <p>
        {"Didn't get otp?"}       
      </p>
      {stated ? 
          <div className="divspin"> <Spinner /></div>
         
        :
      <span id="span" onClick={handleGetOtp}>Resend</span>}
      </div>
    </div>
  );
}

export default Otp;
