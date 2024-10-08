import { format } from 'date-fns';
import { Trip } from '../types';
import { useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  trip: Trip;
  onDelete: (id: string) => void;
  onAddNote: (tripId: string, note: string) => void;
  onDeleteNote: (tripId: string, noteIndex: number) => void;
  index: number;
};

function TripCard({ trip, onDelete, onAddNote, onDeleteNote, index }: Props) {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (tripId: string, note: string) => {
    if (note.trim() !== '') {
      onAddNote(tripId, note.trim());
      setNewNote('');
    }
  };

  return (
    <div className="trip-card" key={index}>
      <h4>
        <span>
          {format(trip.startDate, 'PPP')} - {format(trip.endDate, 'PPP')}
        </span>
        <button className="country-button">{trip.country}</button>
        <button className="delete-button" onClick={() => onDelete(trip.id)}>
          Delete
        </button>
      </h4>
      <ul>
        {trip.notes.map((note, noteIndex) => (
          <li key={noteIndex} className="note">
            {note}{' '}
            <button
              className='delete-X'
              onClick={() => onDeleteNote(trip.id, noteIndex)}
            >
              <X size={20} />
            </button>
          </li>
        ))}
      </ul>
      <form 
        onSubmit={(e) => {e.preventDefault(); handleAddNote(trip.id, newNote)}}
        className="note-form"
      >
        <input
          type="text"
          className="note-input"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder=""
        />
        <button
          className="add-note-button"
          type='submit'
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default TripCard
