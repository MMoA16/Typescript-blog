import React from 'react';

const Card = ({ teamMember }: any  ) => {
    const imageUrl = "http://localhost:1337" + teamMember.attributes.TeamMemberPhoto.data.attributes.url;
    return (
        <div className="card">
            <img src={imageUrl} alt={`${teamMember.attributes.name}'s photo`} className="card-photo" />
            <h2 className="card-name">{teamMember.attributes.TeamMemberName}</h2>
            <p className="card-designation">{teamMember.attributes.TeamMemberDesignation}</p>
            <p className="card-email">{teamMember.attributes.TeamMemberEmail}</p>
            <p className="card-phone">{teamMember.attributes.TeamMemberNumber}</p>
        </div>
    );
};
export default Card;