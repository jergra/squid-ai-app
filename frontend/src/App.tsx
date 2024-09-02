import './App.css';
import AddTrip from './components/AddTripForm';
import TripList from './components/TripList';
import { useCollection, useQuery } from '@squidcloud/react';
import { Trip } from './types';
import AskAI from './components/AskAI';

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

function App() {
  
  const {user} = useUser()
  console.log('user:', user)
  console.log('user:', user?.id)
  console.log('user:', user?.primaryEmailAddress?.emailAddress)
  const email = user?.primaryEmailAddress?.emailAddress
  //console.log('email:', email)

  const collection = useCollection<Trip>('trips');
  const trips = useQuery(collection.query());

  const findTrip = (id: string, email: any) => {
    return trips.data.find((trip) => (trip.data.id === id && trip.data.email === email))
  }

  const onDelete = (id: string) => {
    const trip = findTrip(id, email);
    if (trip) trip.delete()
  };

  const onAddNote = (tripId: string, note: string) => {
    const trip = findTrip(tripId, email);
    if (!trip) return
    const notes = trip.data.notes
    notes.push(note)
    trip.update({
      notes: notes
    })
  };

  const onDeleteNote = (tripId: string, noteIndex: number) => {
    const trip = findTrip(tripId, email);
    if (!trip) return
    const notes = trip.data.notes;
    trip.update({
      notes: notes.filter((_, index) => index !== noteIndex)
    })
  };

  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <div className="card">
          <AskAI />
          <AddTrip />
          <TripList
            trips={trips.data.map((trip) => trip.data)}
            onDelete={onDelete}
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
          />
        </div>
      </SignedIn>
    </header>
  );
}

export default App;

