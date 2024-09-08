import React from 'react';
import './App.css';
import AddTrip from './components/AddTripForm';
import TripList from './components/TripList';
import { useCollection, useQuery } from '@squidcloud/react';
import { Trip } from './types';
import AskAI from './components/AskAI';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { PlaneTakeoff, NotebookPen, Bot } from 'lucide-react';

const FeatureItem = ({ icon, text}: any) => (
  <li className="feature-item">
    {icon}
    <span>{text}</span>
  </li>
);

const LandingPage = () => (
  <div className="landing-page">
    <h1>Welcome to TripTracker</h1>
    <p>Plan, organize, and remember your travels with ease.</p>
    <ul className="feature-list">
      <FeatureItem 
        icon={<PlaneTakeoff size={24} />}
        text="Create and manage your trip itineraries"
      />
      <FeatureItem 
        icon={<NotebookPen size={24} />}
        text="Add notes and memories to each trip"
      />
      <FeatureItem 
        icon={<Bot size={24} />}
        text="Use AI assistance for travel planning"
      />
    </ul>
    <SignInButton mode="modal">
      <button className="sign-in-button">Get Started</button>
    </SignInButton>
  </div>
);

function App() {
  const {user} = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const collection = useCollection<Trip>('trips');
  const trips = useQuery(collection.query());

  const findTrip = (id: string, email: string | undefined) => {
    return trips.data.find((trip) => (trip.data.id === id && trip.data.email === email));
  };

  const onDelete = (id: string) => {
    const trip = findTrip(id, email);
    if (trip) trip.delete();
  };

  const onAddNote = (tripId: string, note: string) => {
    const trip = findTrip(tripId, email);
    if (!trip) return;
    const notes = trip.data.notes;
    notes.push(note);
    trip.update({
      notes: notes
    });
  };

  const onDeleteNote = (tripId: string, noteIndex: number) => {
    const trip = findTrip(tripId, email);
    if (!trip) return;
    const notes = trip.data.notes;
    trip.update({
      notes: notes.filter((_, index) => index !== noteIndex)
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">TripTracker</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      
      <main>
        <SignedOut>
          <LandingPage />
        </SignedOut>
        
        <SignedIn>
          <div className="dashboard">
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
      </main>
    </div>
  );
}

export default App;
