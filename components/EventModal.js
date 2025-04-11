import { useState } from 'react';
import styles from './EventModal.module.css';

export default function EventModal({ event, onClose, onSave }) {
    const [name, setName] = useState(event?.name || '');
    const [title, setTitle] = useState(event?.title || '');
    const [start, setStart] = useState(event?.start || '');
    const [end, setEnd] = useState(event?.end || '');

    const handleSubmit = () => {
        onSave({ id: event?.id, name, title, start, end });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{event ? '일정 수정' : '일정 추가'}</h2>
                <label>
                    이름:
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    제목:
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    시작일:
                    <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                </label>
                <label>
                    종료일:
                    <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                </label>
                <div className={styles.modalButtons}>
                    <button className={styles.saveButton} onClick={handleSubmit}>저장</button>
                    <button className={styles.cancelButton} onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
}
