import CalendarComponent from '../components/Calendar';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';

if (process.env.NODE_ENV === 'development') {
    require('../mocks');
    //initMockAPI();
}

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1>Calendar Management</h1>
            <CalendarComponent />
        </div>
    );
}
