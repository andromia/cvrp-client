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
            <p>My name is Phil. I love DevOps, Full-Stack, and React Engineering. Please considering following my profile :-)</p>
            <h5>Skills</h5>
            <p>
                <ul>
                    <li>Docker</li>
                    <li>React</li>
                    <li>AWS</li>
                    <li>TypeScript</li>
                </ul>
            </p>
        </div>
    );
};

export default UserProfile;
