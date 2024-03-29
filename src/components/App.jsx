// Import React, hooks, components, styles, and utilities
import React, {useEffect, useState} from "react";
import Heading from "./Heading";
import AddCalories from "./AddCalories";
import '../App.css';
import TableContainer from "./TableContainer";
import Footer from "./Footer";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import idb from "../idb.js";
import dayjs from "dayjs";


function App(){
    // Initialize state variables
    const [db, setDb] = useState([]); // State for database connection
    const [isLoading, setIsLoading] = useState(true); // State to track data loading status
    const [rows, setRows] = useState([]); // State for table rows
    // State for selectedDate using the dayjs library to get the current date
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // Use the useEffect hook to perform side effects
    useEffect(() => {
        // Open the database and update state
        idb.openCaloriesDB("caloriesdb", 1).then((r) => {
            setDb(r); // Set the database connection
            setIsLoading(false); // Set loading to false after db is set
        });
    }, []); // Empty dependency array to run the effect once on component mount

    // Return JSX for the App component
    return(
        // Provide a context for date handling using dayjs library
        // page components render: Heading, AddCalories, TableContainer, Footer
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="page madimi-one-regular">
                <Heading/>
                <AddCalories db={db} setRows={setRows} setSelectedDate={setSelectedDate}/>
                <TableContainer isLoading={isLoading} db={db} rows={rows}
                                setRows={setRows} selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}/>
                <Footer />
            </div>
        </LocalizationProvider>);
}

// Export the App component as the default export
export default App;
