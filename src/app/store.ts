import { create } from 'zustand';

type TimerPhase = 'starting' | 'playing';

interface TimerState {
    phase: TimerPhase;
    seconds: number;
    isDone: boolean;
    setPhase: (phase: TimerPhase) => void;
    setSeconds: (seconds: number) => void;
    setDone: (done: boolean) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
    phase: 'starting',
    seconds: 5,
    isDone: false,
    setPhase: (phase) => set({ phase }),
    setSeconds: (seconds) => set({ seconds }),
    setDone: (done) => set({ isDone: done }),
}));
