import {redirect} from "next/navigation";
import {getHomeUrlByRole} from "@/app/actions/default";

export default async function Home() {
    redirect(getHomeUrlByRole("INVALID"))
}
