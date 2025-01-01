import '@testing-library/jest-dom';
import { vi } from 'vitest';

class IntersectionObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn();
  }
  
  global.IntersectionObserver = IntersectionObserverMock as unknown as IntersectionObserver;
  