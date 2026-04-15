// src/components/journey/JourneyApp.tsx
import { useReducer, useCallback } from 'react';
import type { JourneyState, JourneyAction, Screen } from '../../types';
import ArrivalScreen from './ArrivalScreen';

const initialState: JourneyState = {
  screen: 'arrival',
  history: [],
  gender: null,
  path: null,
  zone: null,
  age: null,
  concern: null,
  zoneAnswers: [],
  bookingOpen: false,
  recommendedTreatmentIds: [],
};

function getBackScreen(state: JourneyState): Screen | null {
  if (state.history.length === 0) return null;
  return state.history[state.history.length - 1];
}

function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  const pushHistory = (nextScreen: Screen): JourneyState => ({
    ...state,
    history: [...state.history, state.screen],
    screen: nextScreen,
  });

  switch (action.type) {
    case 'BEGIN':
      return pushHistory('gender');
    case 'SELECT_GENDER':
      return { ...pushHistory('path'), gender: action.gender };
    case 'SELECT_PATH':
      return {
        ...pushHistory(action.path === 'zone' ? 'silhouette' : 'life-stage'),
        path: action.path,
      };
    case 'SELECT_ZONE':
      return { ...pushHistory('zone-detail'), zone: action.zone };
    case 'ANSWER_ZONE_QUESTION':
      return { ...state, zoneAnswers: [...state.zoneAnswers, action.answer] };
    case 'COMPLETE_ZONE_DETAIL':
      return pushHistory('recommendations');
    case 'SELECT_AGE':
      return { ...pushHistory('concern'), age: action.age };
    case 'SELECT_CONCERN':
      return { ...pushHistory('recommendations'), concern: action.concern };
    case 'OPEN_BOOKING':
      return { ...state, bookingOpen: true };
    case 'CLOSE_BOOKING':
      return { ...state, bookingOpen: false };
    case 'BOOKING_COMPLETE':
      return { ...pushHistory('thank-you'), bookingOpen: false };
    case 'GO_BACK': {
      const prev = getBackScreen(state);
      if (!prev) return state;
      return {
        ...state,
        screen: prev,
        history: state.history.slice(0, -1),
      };
    }
    default:
      return state;
  }
}

export default function JourneyApp() {
  const [state, dispatch] = useReducer(journeyReducer, initialState);

  const goBack = useCallback(() => dispatch({ type: 'GO_BACK' }), []);
  const canGoBack = state.history.length > 0 && state.screen !== 'arrival';

  const renderScreen = () => {
    switch (state.screen) {
      case 'arrival':
        return <ArrivalScreen onBegin={() => dispatch({ type: 'BEGIN' })} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-text-muted">Écran: {state.screen}</p>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Back button */}
      {canGoBack && (
        <button
          onClick={goBack}
          className="fixed top-20 left-6 z-40 text-text-muted hover:text-gold transition-colors text-sm flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
      )}

      {/* Screen with transition */}
      <div key={state.screen} className="screen-transition">
        {renderScreen()}
      </div>
    </div>
  );
}
