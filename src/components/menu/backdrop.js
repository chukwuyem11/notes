/** @jsxImportSource @emotion/react */

import { motion, AnimatePresence  } from "framer-motion"
import facepaint from "facepaint";

const breakpoints = [576, 768, 992, 1200];
const query = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));



const Backdrop = (props) => {
    return(



      
            <div css={mq({
                display: "flex",
                justifyContent: "center"
            })}  onClick={() => props.onClick()}>
             <motion.div 
            
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             exit={{opacity: 0}}
             onClick={() => props.onClick()}
             >
                
             <div  css={mq({position: "fixed", top: 0, left: 0,  height: "100vh", width: "100vw", backgroundColor: "rgba(0,0,0,0.43)", backdropFilter: "blur(5px)", alignItems: "center", justifyContent: "center"})}  onClick={() => props.onClick()}>
                <p>
                    {props.children}
                </p>
            </div>
             </motion.div></div>
            
            
            
       
    )
}

export default Backdrop