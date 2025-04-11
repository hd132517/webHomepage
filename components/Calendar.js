// Calendar.js
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css';

export default function CalendarComponent() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: '', title: '', startDate: '', endDate: '' });
    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const formatDateToUTC = (date) => {
        const d = new Date(date);
        return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().split('T')[0];
    };

    const formatDateToKorean = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
        return new Date(date).toLocaleDateString('ko-KR', options);
    };

    const handleDateClick = (date) => {
        const formattedDate = formatDateToUTC(date);
        const eventsForDate = events.filter(
            (e) => formattedDate >= e.startDate && formattedDate <= e.endDate
        );
        setSelectedDate(formatDateToKorean(date));
        setSelectedDateEvents(eventsForDate);
    };

    const handleAddOrUpdateEvent = () => {
        if (!newEvent.name || !newEvent.title || !newEvent.startDate || !newEvent.endDate) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        if (editingEvent) {
            setEvents((prev) =>
                prev.map((event) =>
                    event.id === editingEvent.id ? { ...editingEvent, ...newEvent } : event
                )
            );
            setEditingEvent(null);
        } else {
            setEvents((prev) => [
                ...prev,
                { ...newEvent, id: Date.now(), startDate: formatDateToUTC(newEvent.startDate), endDate: formatDateToUTC(newEvent.endDate) },
            ]);
        }

        setNewEvent({ name: '', title: '', startDate: '', endDate: '' });
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>📅 일정 관리</h2>

            <div className={styles.content}>
                <div className={styles.calendarSection}>
                    <Calendar
                        locale="ko-KR"
                        onClickDay={handleDateClick}
                        tileContent={({ date }) => {
                            const formattedDate = formatDateToUTC(date);
                            const event = events.find((e) => formattedDate >= e.startDate && formattedDate <= e.endDate);
                            return event ? <div className={styles.eventDot} /> : null;
                        }}
                    />
                </div>

                <div className={styles.sidePanel}>
                    <div className={styles.form}>
                        <h3>➕ 일정 추가</h3>
                        <input
                            type="text"
                            placeholder="이름"
                            value={newEvent.name}
                            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="제목"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newEvent.startDate}
                            onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newEvent.endDate}
                            onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                        />
                        <button onClick={handleAddOrUpdateEvent}>
                            {editingEvent ? '수정 완료' : '추가'}
                        </button>
                    </div>

                    <div className={styles.eventList}>
                        <h3>📌 등록된 일정</h3>
                        {events.map((event) => (
                            <div key={event.id} className={styles.eventItem}>
                                <strong>{event.name}</strong>: {event.title}
                                <br />
                                <span className={styles.eventDate}>
                                    ({formatDateToKorean(event.startDate)} ~ {formatDateToKorean(event.endDate)})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedDate && (
                    <div className={styles.selectedDatePanel}>
                        <h3>📍 {selectedDate} 일정</h3>
                        {selectedDateEvents.length > 0 ? (
                            <ul>
                                {selectedDateEvents.map((event) => (
                                    <li key={event.id}>
                                        <strong>이름:</strong> {event.name}<br />
                                        <strong>제목:</strong> {event.title}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>등록된 일정이 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
