/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import axios from "axios";

import facepaint from "facepaint";
import { BsJournalPlus, BsJournalX, BsJournalText } from 'react-icons/bs';
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai';
import { useSession, signIn, signOut } from "next-auth/react"
import Modal from "./menu/modal"
import Addnote from "./addNote"
import Upnote from "./upNote"

import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation } from "react-query";

const breakpoints = [576, 768, 992, 1200];
const query = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
export default function Home() {
  const { data: session } = useSession()
  const [modalopen, setModalopen] = useState(false)

const [note_id, setNote_id] = useState("")
const [note_title, setNote_title] = useState("")
const [note_body, setNote_body] = useState("")
const [note_color, setNote_color] = useState("")


    
  const close = () => setModalopen(false)
  const open = () => setModalopen(true)

  const [modalopen_up, setModalopen_up] = useState(false)
    
  const close_up = () => setModalopen_up(false)
  const open_up = () => setModalopen_up(true)

  const openup = (id, title, body, color) => {
    setNote_id(id)
    setNote_title(title)
    setNote_body(body)
    setNote_color(color)

    
    setModalopen_up(true)}
  const note = async () => {
    return axios.get(`/api/note`);
  };
  const get_note = useQuery("notes", note);
const delete_note = useMutation(
  (id) => {
    axios.delete(`/api/note/${id}`, {
     id: id,
      
    }).then((response) => {
      get_note.refetch()
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
  }
);

const handle_delete = (id) => {
  delete_note.mutate(id)
}
  
  return (
    <div>
      <AnimatePresence
                 initial={false}
                 exitBeforeEnter={true}
                 onExitComplete={() => null}
                 >

{modalopen && <Modal width= {["100vw",300, 300, 300]} image={"svg/close.svg"} modalopen={modalopen} handleClose={close}><Addnote close={close} /></Modal>}

{modalopen_up && <Modal width= {["100vw",300, 300, 300]} image={"svg/close.svg"} modalopen={modalopen_up} handleClose={close_up}><Upnote id={note_id} title={note_title} body={note_body} color={note_color} close={close_up} /></Modal>}
                 </AnimatePresence>
    <div css={mq({
      display: "flex",
      justifyContent: "center"
    })}>
    <div>
      <div  css={mq({
      display: "flex",
      justifyContent: "space-between",
      alignItems: 'center'
    })}>
    <div>
    <p css={mq({
      color: "#3E3E3E",
                fontSize: 20,
                fontWeight: 500,
                textTransform: "capitalize",
              })}> My Notes</p></div>
              <div css={mq({
      display: "flex",
      justifyContent: "right",
      alignItems: 'center'
    })}> 
    <div css={mq({
      fontSize: 25,
      display: session ? "block" : "none",
      marginRight: 5,
      cursor: "pointer",
    })} onClick={() => signOut()}>
      <AiOutlineLogout color={"#3E3E3E"}/>
    </div>
    <div css={mq({
      fontSize: 25,
      display: session ? "none" : "block",
      cursor: "pointer",
      marginRight: 5
    })} onClick={() => signIn()}>
      <AiOutlineLogin color={"#3E3E3E"}/>
    </div>
    <div css={mq({
      fontSize: 25
    })} onClick={() => (modalopen ? close() : open())}>
      <BsJournalPlus color={"#3E3E3E"}/>
    </div></div>
              
              </div>
              <div
            css={mq({

              display: "flex",
              border: "solid 1px hsla(264, 0%, 50%, 0.1)",
              margin: "5px 0px",
            })}
          ></div>
          {get_note.isLoading ? <text>Loading...</text> : <div>
            {get_note.data.data.notes.length === 0 ? <text>No note, add new note</text> : <div>{get_note.data.data.notes.map((note) => (
              <AnimatePresence key={note.id}>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
  animate={{  opacity: 1, y: 0 }}
  exit={{opacity: 0,  y: 20}}
  transition={{ delay: `0.${note.id}`, duration: 0.5 }}
          css={mq({
            width: ["90vw",300, 300, 300],
            backgroundColor: note.color,
            margin: "15px 0px",
            padding: 10,
            border: "solid 1px hsla(264, 0%, 50%, 0.1)",
            borderRadius: 10,
          })}
          
        >
           <div  css={mq({
             
      display: "flex",
      justifyContent: "space-between",
      alignItems: 'center'
    })}>
    <div>
    <div>
            <text
              css={mq({
                color: "#3E3E3E",
                fontSize: 18,
                fontWeight: 500,
                textTransform: "capitalize",
              })}
            >
              {note.title}
            </text>
          </div></div>
          <div css={mq({
      display: "flex",
      justifyContent: "right",
      alignItems: 'center'
    })}>
          <div css={mq({
                fontSize: 25,
                marginRight: 5
              })} onClick={() => openup(note.id, note.title, note.body, note.color )}>
                 <BsJournalText color={"#3E3E3E"}/>
              </div>
              <div css={mq({
                fontSize: 25
              })} onClick={() => handle_delete(note.id)}>
                <BsJournalX color={"#3E3E3E"}/>
               
              </div>
          </div>
              
              </div>
          
          <div
            css={mq({

              display: "flex",
              border: "solid 1px hsla(264, 0%, 50%, 0.1)",
              margin: "5px 0px",
            })}
          ></div>
          <div>
            <text css={mq({
              color: "#3E3E3E",
            })}>
             {note.body}
            </text>
          </div>
        </motion.div></AnimatePresence>
      ))}</div>}</div>
     }
          </div></div>
    </div>
  );
}
