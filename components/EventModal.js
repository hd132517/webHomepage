import { useState } from 'react';

export default function EventModal({ event, onClose, onSave }) {
    const [name, setName] = useState(event?.name || '');
    const [title, setTitle] = useState(event?.title || '');
    const [start, setStart] = useState(event?.start || '');
    const [end, setEnd] = useState(event?.end || '');

    const handleSubmit = () => {
        onSave({ id: event?.id, name, title, start, end });
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', backgroundColor: '#fff' }}>
            <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
            <label>
                Name:
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Title:
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Start Date:
                <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
            </label>
            <label>
                End Date:
                <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
            </label>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
