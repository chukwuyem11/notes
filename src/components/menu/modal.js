/** @jsxImportSource @emotion/react */

import { motion,  } from "framer-motion";
import Backdrop from "./backdrop";
import { AiOutlineClose } from 'react-icons/ai';
import facepaint from "facepaint";
const breakpoints = [576, 768, 992, 1200];
const query = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const Modal = (props) => {
  const dropIn = {
    hidden: {
      y: "2vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "2vh",
      opacity: 0,
    },
  };

  return (
    <Backdrop onClick={() => props.handleClose()}>

      <motion.div
     
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div css={mq({
                display: "flex",
               
               
                justifyContent: "center",
                flexDirection: "row"
            })} >
        
        
                    <div css={mq({ })} >
                   
  <div css={mq({ marginTop: 100, backgroundColor: "#fff", width: props.width, height: "100vh", padding: 10,
            border: "solid 1px hsla(264, 0%, 50%, 0.1)",
            borderRadius: 10,  })} >
  <div css={mq({ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10  })}><div ><text css={mq({
      color: "#3E3E3E",
                fontSize: 20,
                fontWeight: 500,
                textTransform: "capitalize",
              })} >Add note</text></div><div css={mq({
    fontSize: 20,
    fontWeight: 600,
    cursor: "pointer"
    
  })} onClick={props.handleClose}>< AiOutlineClose color={"#3E3E3E"}/></div>
        </div>{props.children}</div></div></div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
