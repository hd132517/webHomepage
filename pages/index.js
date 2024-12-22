import CalendarComponent from '../components/Calendar';
import Navbar from '../components/Navbar';

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1>Calendar Management</h1>
            <CalendarComponent />
        </div>
    );
}