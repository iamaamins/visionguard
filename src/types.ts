export type TimerState = {
  timeRemaining: number;
  isBreakTime: boolean;
  isPaused: boolean;
};

declare global {
  interface Window {
    timer: {
      onUpdate: (callback: (state: TimerState) => void) => void;
      reset: () => void;
    };
  }
}
