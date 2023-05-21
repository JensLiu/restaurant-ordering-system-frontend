"use client";

import useUserState from "./hooks/useUserState";

export default function Home() {
    const userState = useUserState();

    return (
        <div className="container mx-auto my-auto">
            Hello {userState.firstname}{" "}
        </div>
    );
}
