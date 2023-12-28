import React from 'react'
import {redirect} from "next/navigation";
import {getHomeUrlByRole} from "@/app/actions/default";

const AdminPage = () => {
  redirect("/admin/analysis")
}

export default AdminPage