import React from 'react';
import './style.css';

function List(props){

    const {dev} = props;

    return (
            <li className="dev-item">
              <header>
              <img src={dev.avatar_url} alt={dev.github_username}/>
              <div className="dev-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(' ')}</span>
              </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https:github.com/${dev.github_username}`}>GitHub</a>
            </li>
        );
};

export default List;