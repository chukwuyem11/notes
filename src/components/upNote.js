import React from "react";
/** @jsxImportSource @emotion/react */

import { css, jsx } from "@emotion/react";
import facepaint from "facepaint";
import axios from "axios";
import { useQuery, useMutation } from "react-query";


const breakpoints = [576, 768, 992, 1200];
const query = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);


const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const Upnote = (props) => {
    const [title, setTitle] = React.useState(props.title);
    const [body, setBody] = React.useState(props.body);
    const [notecolor, setNotecolor] = React.useState(props.color);

    const colors = [
        {
          id: 1,
          
          color: "#B4F8C8",
        },
        {
          id: 2,
         
          color: "#FBE7C6",
        },
        {
          id: 3,
          
         
          color: "#FFAEBC",
        },
        {
          id: 4,
          
          color: "#A0E7E5",
        },
        {
            id: 5,
            
            color: "#EF7C8E",
          },
          {
            id: 6,
            
            color: "#FAE8E0",
          },
          {
            id: 7,
            
            color: "#B6E2D3",
          },
          {
            id: 8,
            
            color: "#D8A7B1",
          },
      ];

      const note = async () => {
        return axios.get(`/api/note`);
      };
      const get_note = useQuery("notes", note);
      

    const { isLoading, isSuccess, isError, mutate, mutateAsync } = useMutation(
        () => {
          axios.put(`/api/note/${props.id}`, {
            title: title,
            body: body,
            color: notecolor,
            
          }).then((response) => {
            get_note.refetch()
            props.close()
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
            // backgroundColor: "#f5f5f5",
            marginTop: 15,
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
                        })}>Title</label></div>
        
        <input 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              defaultValue={title}
              css={mq({
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
                        })}>Body</label></div>
        
        <textarea id="txtid" name="txtname" rows="4" cols="50" maxLength="200" defaultValue={body}
              onChange={(e) => setBody(e.target.value)}
              value={body} css={mq({
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
             })}><div><text css={mq({
                color: "#3E3E3E",
                          fontSize: 20,
                          fontWeight: 500,
                          textTransform: "capitalize",
                        })}>Color</text></div>
                        <div css={mq({
                 display: "flex",
                 justifyContent: "space-between",
                 marginTop: 10
             })}>
                 {colors.map((color) => (

<div key={color.id} css={mq({
    width: 25,
    height: 25,
    border: notecolor ==  color.color ? "solid 2px #c4c4c4" : "" ,
    borderRadius: "100%",
    backgroundColor: color.color
})} onClick={() => setNotecolor(color.color)}>

</div> ))}
                        
                        </div>
                        
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
        })} onClick={() => handleChange()}>update note</button>
        </div>
        </div>
    </div>
  );
};

export default Upnote;
