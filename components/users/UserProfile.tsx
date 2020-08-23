import React from "react";

import Profile from "../images/Profile";

interface Props {
    username: string | string[] | undefined;
}

const UserProfile = (props: Props) => {
    return (
        <div>
            <Profile />
            <hr />
            <h5>@{props.username}</h5>
            <p>My name is [TODO]. I love TODOing. Please consider following my profile hehe.</p>
            <h5>Skills</h5>
            <ul>
                <li>This</li>
                <li>That</li>
                <li>Other this</li>
                <li>And that</li>
            </ul>
        </div>
    );
};

export default UserProfile;
