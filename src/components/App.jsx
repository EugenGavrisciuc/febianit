import DATASET from "../services/db";
import {useState, useRef, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  margin: 0 auto;
  display: flex;
  height: 30px;
  box-shadow: 0px 0px 12px -5px rgba(0,0,0,0.69);
`

const Input = styled.input`
  outline: none;
  border: 0;
  max-width: 200px;

`

const Li = styled.li`
  list-style-type: none;
`

const Ul = styled.ul`
  padding: 0;
  margin: 10px auto 0 auto;
`

const Label = styled.label`
  min-width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #657990;
`

export default function App() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const location = useLocation();
  const [elementList, setElementList] = useState("");
  
  useEffect(() => {
    if(location.pathname !== "/") {
      inputRef.current.value = location.pathname.substring(1);
      setElementList(inputRef.current.value);
    }
  }, [])

  
  return (
    <Container>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Label><span style={{color:"white"}} className="material-icons">search</span></Label>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          onChange={(event) => {
              setElementList(event.target.value);
              navigate(event.target.value);
          }}
        ></Input>
      </Form>
      <Ul>
        {DATASET.filter((element) => {
          if(elementList == "") {
            return element;
          } else if(element.toLowerCase().includes(elementList.toLowerCase())){
            return element;
          }
        }).map((element) => {
          return <Li key={`${element}id`}><center>{element}</center></Li>
        })
        }
      </Ul>
    </Container>
  );
}

