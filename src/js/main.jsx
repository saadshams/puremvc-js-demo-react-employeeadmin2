//
//  main.jsx
//  PureMVC JS Demo - React EmployeeAdmin
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD 3-Clause License
//

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Application from "./Application.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Application />
    </StrictMode>
)
