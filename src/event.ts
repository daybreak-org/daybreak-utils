type Listener = (payload?: unknown) => void;

type Emitter = {
    on: (eventKey: string, callback: Listener) => () => void;
    off: (eventKey: string, callback: Listener) => void;
    emit: (eventKey: string, payload?: unknown) => void;
};

const createEmitter = (): Emitter => {
    const events  = new Map<string, Set<Listener>>();
    const off = (eventKey: string, callback: Listener) => {
        const listeners = events.get(eventKey);
        if (!listeners) throw new Error("Cannot unsubscribe from event that does not exist");
        listeners.delete(callback);
        if (listeners.size === 0) events.delete(eventKey);
    }

    return {
        on: (eventKey, callback) => {
            if (!events.has(eventKey)) events.set(eventKey, new Set());
            events.get(eventKey)!.add(callback);
            return () => off(eventKey, callback);
        },
        emit: (eventKey, payload) => {
            const listeners = events.get(eventKey);
            if (!listeners) throw new Error("Cannot emit event that does not exist");
            [...listeners].forEach((callback) => callback(payload));
        },
        off,
    }
}

export { createEmitter };
export type { Emitter };