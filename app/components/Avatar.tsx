import React, { FC } from "react";

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar:FC<AvatarProps> = ({
    src
}) => {
    return (
        <div className="avatar">
            <div className="w-10 rounded-full">
                <img alt="Avatar" src={src || "/images/placeholder.jpg"} />
            </div>
        </div>
    );
};

export default Avatar;
