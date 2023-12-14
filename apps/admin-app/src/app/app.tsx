import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { muiTheme } from "./mui-theme";
import { appRouter } from "./router";


/**
 * Main application component.
 */
export function App() {
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <RouterProvider router={appRouter} />
        </ThemeProvider>
    );
}

export default App;
