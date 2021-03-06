import { useEffect, useState } from 'react';
import { getPlayer } from '../../services/nhl-api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const StyledPage = styled.main`
    display: flex;
    flex-direction: row;
    align-items: center;

    .playerTeam {
      padding: 20px;
    }


    .playerSpecs {
      align-items: center;
      border-left: 1px solid black;
      padding: 20px;
    }

`;

function PlayerPage(props) {
    const [playerData, setPlayersData] = useState();


    
    
    useEffect(() => {
      async function getAppData() {
        const data = await getPlayer(props.playerId);
        setPlayersData(data.people[0]);
      }
      getAppData();
      console.log('effect');
      }, [props.playerId]);
    
      if (playerData) {
      return (
        <StyledPage>
            <div className="playerTeam">
              <h1>{playerData.fullName}</h1>
              <h5>{playerData.currentTeam.name}</h5>
              <br/>
              <Link to={`/team/${props.location.state.teamId}`}>
                <Button variant="secondary" type="submit">
                  Go Back to {playerData.currentTeam.name} Team Page
                </Button>

              </Link>

            </div>
            <div className="playerSpecs">
              <p>Jersey Number: {playerData.primaryNumber}</p>
              <p>Position: {playerData.primaryPosition.name}</p>
              <p>Shoots: {playerData.shootsCatches}</p>  
              <p>DOB: {playerData.birthDate}</p>
              <p>Birthplace: {playerData.birthCity}, {playerData.birthCountry}</p>
              <p>Nationality: {playerData.nationality}</p>
              <p>Height: {playerData.height}</p>
              <p>Weight: {playerData.weight}</p>
            </div>

        </StyledPage>
        
      );

    } else {
      return (
        <p>Loading...</p>
      )
    }
};

export default PlayerPage;