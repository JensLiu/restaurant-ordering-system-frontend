"use client";

import { Avatar, Input, InputGroup, Stats, Tabs } from "react-daisyui";
import useUserState from "../hooks/useUserState";
import { AuthRequiredError } from "@/app/lib/exceptions";
import { useState } from "react";

interface UserProfilePageProps {}

enum PROFILETYPE {
    "BASIC",
    "SECURITY",
    "PAYMENT",
}

const UserProfilePage = () => {
    const userState = useUserState();

    const [profileType, setProfileType] = useState(PROFILETYPE.BASIC);

    if (userState.role == "") {
        throw new AuthRequiredError();
    }

    const handleTabChange = (value: any) => {
        setProfileType(value as number);
    };

    let bodyContent = (
        <div className="grid gap-3">
            <InputGroup>
                <span>Firstname</span>
                <Input type="text" />
            </InputGroup>
            <InputGroup>
                <span>Lastname</span>
                <Input type="text" />
            </InputGroup>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
                qui sint ipsum sequi possimus fugit quia dolore beatae soluta
                corrupti, excepturi iste est accusamus incidunt tempora ducimus
                accusantium maiores tempore?
            </p>
        </div>
    );

    if (profileType == PROFILETYPE.SECURITY) {
        bodyContent = <div>Security</div>;
    }

    if (profileType == PROFILETYPE.PAYMENT) {
        bodyContent = <div>Payment</div>;
    }

    return (
        <div className="container mx-auto py-5 min-w-screen min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl min-w-full">
                <div className="card-body base-300">
                    <div className="card-title justify-between mb-2">
                        <div>{userState.firstname}, here's your profile</div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-Secondary">
                                Refresh
                            </button>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                    <Tabs
                        value={profileType}
                        onChange={handleTabChange}
                        boxed
                        size="md"
                        className="justify-center"
                    >
                        <Tabs.Tab value={PROFILETYPE.BASIC}> Basic </Tabs.Tab>
                        <Tabs.Tab value={PROFILETYPE.SECURITY}>
                            {" "}
                            Security{" "}
                        </Tabs.Tab>
                        <Tabs.Tab value={PROFILETYPE.PAYMENT}>
                            {" "}
                            Payment{" "}
                        </Tabs.Tab>
                    </Tabs>
                    <div className="sm:py-auto md:py-3 mx-auto">
                        {bodyContent}
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
