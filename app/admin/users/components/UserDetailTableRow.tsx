import { Role } from "@/types/UserTypes";
import React, { FC } from "react";

interface UserDetailTebleRowProps {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    imageSrc: string;
    role: Role;
}

const UserDetailTableRow: FC<UserDetailTebleRowProps> = ({
    id,
    firstname,
    lastname,
    email,
    imageSrc,
    role,
}) => {
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {imageSrc && (
                                <img
                                    src={imageSrc}
                                    alt="Avatar Tailwind CSS Component"
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{`${firstname} ${lastname}`}</div>
                        <div className="text-sm opacity-50">{email}</div>
                    </div>
                </div>
            </td>
            <td>
                {/* {description} */}
                {/* <br /> */}
                <span className="badge badge-ghost badge-sm">{role}</span>
            </td>
            {/* <td>Purple</td> */}
            <th id={id}>
                <div className="space-x-2">
                    <span>
                        <button className="btn btn-ghost btn-xs">edit</button>
                    </span>
                    {role == "CHEF" && (
                        <span>
                            <button className="btn btn-ghost btn-xs">
                                delete
                            </button>
                        </span>
                    )}
                </div>
            </th>
        </tr>
    );
};

export default UserDetailTableRow;
