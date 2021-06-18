import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import { useEffect, useState } from 'react';

const Header = styled.h1`
  text-align: center;
`

const Grid = styled.div`
  @media only screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 33%);
    width: 80%;
    margin: 0 auto;
  }
`

const UserCard = styled.div`
  border-collapse: separate; 
  margin: 0 auto;
  width: 80%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 30px;
`

const UserTitle = styled.p`
  border-radius: 5px 5px 0 0;
  text-align: center;
  color: #ffffff;
  background-color: #6495ED;
  padding: 10px;
  margin: 0;
  font-weight: 600;
  ${props => props.isAdmin && `
    background: #3CB371;
  `}
`

const UserEmail = styled.p`
  text-align: center;
  padding-bottom: 7.5px;
  margin: 0;
  font-weight: 600;
`

const UserNameWrapper = styled.div`
  display: flexbox;
  justify-content: space-between;
`

const UserName = styled.p`
  padding: 0 15px;
  font-weight: 600;
`

function App() {

  const isAdmin = true;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://speck-events-api.herokuapp.com/api/user")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <>
      <Header>Speck Academy 2021</Header>
      <Grid>
      {items && items.map( element => (
        <UserCard>
          <UserTitle isAdmin={element.isAdmin}>{element.isAdmin ? 'Admin' : 'Student'}</UserTitle>
          <UserNameWrapper>
            <UserName>{element.firstName}</UserName>
            <UserName>{element.lastName}</UserName>
          </UserNameWrapper>
          <UserEmail>{element.email}</UserEmail>
        </UserCard>
      ))}
      </Grid>
    </>
  );
}

export default App;
