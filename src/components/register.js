import React from "react";
/** @jsxImportSource @emotion/react */

import { css, jsx } from "@emotion/react";
import facepaint from "facepaint";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useSession, signIn, signOut } from "next-auth/react"


const breakpoints = [576, 768, 992, 1200];
const query = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);


const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const Signup = () => {
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");

    const [password, setPassword] = React.useState("");

    const { isLoading, isSuccess, isError, mutate, mutateAsync } = useMutation(
        () => {
          axios.post(`/api/register`, {
            name: name,
            email: email,
            password: password,
            
          }).then((response) => {
            setPassword("")
            setEmail("")
            setName("")
            signIn()
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });
        }
      );
    
      const handleChange = () => {
        mutate()
          
      };
  return (
    <div css={mq({
        display: "flex",
        justifyContent: "center"
      })}>
        <div css={mq({
            width: ["90vw",300, 300, 300],
            backgroundColor: "#f5f5f5",
            margin: "15px 0px",
            padding: 10,
            border: "solid 1px hsla(264, 0%, 50%, 0.1)",
            borderRadius: 10,
          })}>
      <div>
        <div css={mq({
                 
                  marginTop: 10
              })}><label css={mq({
                color: "#3E3E3E",
                          fontSize: 20,
                          fontWeight: 500,
                          textTransform: "capitalize",
                        })}>Username</label></div>
        <input defaultValue="Hello"
              onChange={(e) => setName(e.target.value)}
              value={name} css={mq({
                  width: "100%",
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 3,
                  outline: "none",
                  border: "solid 1px #c4c4c4",
                
            ":focus" : {
                
                outline: "none",
                border: "solid 1px #c4c4c4",
                padding: 10,
            }
              })} />
        
        </div>
        <div>
            <div css={mq({
                 
                 marginTop: 10
             })}><label css={mq({
                color: "#3E3E3E",
                          fontSize: 20,
                          fontWeight: 500,
                          textTransform: "capitalize",
                        })}>Email</label></div>
        
        <input defaultValue="Hello"
              onChange={(e) => setEmail(e.target.value)}
              value={email}css={mq({
                width: "100%",
                marginTop: 10,
                padding: 10,
                borderRadius: 3,
                outline: "none",
                border: "solid 1px #c4c4c4",
              
          ":focus" : {
              
              outline: "none",
              border: "solid 1px #c4c4c4",
              padding: 10,
          }
            })} />
        </div>
        <div>
        <div css={mq({
                 
                 marginTop: 10
             })}><label css={mq({
                color: "#3E3E3E",
                          fontSize: 20,
                          fontWeight: 500,
                          textTransform: "capitalize",
                        })}>Password</label></div>
        
        <input defaultValue="Hello"
              onChange={(e) => setPassword(e.target.value)}
              value={password} css={mq({
                width: "100%",
                marginTop: 10,
                padding: 10,
                borderRadius: 3,
                outline: "none",
                border: "solid 1px #c4c4c4",
              
          ":focus" : {
              
              outline: "none",
              border: "solid 1px #c4c4c4",
              padding: 10,
          }
            })} />
        </div>
        <div css={mq({
            marginTop: 10
        })}>
            <button css={mq({
            backgroundColor: "#6D61DF",
            color: "#fff",
            padding: 10,
            borderRadius: 5,
            cursor: "pointer",
            outline: "none",
                border: "none",
                fontSize: 18,
        })} onClick={() => handleChange()}>Register</button>
        </div>
        </div>
    </div>
  );
};

export default Signup;
