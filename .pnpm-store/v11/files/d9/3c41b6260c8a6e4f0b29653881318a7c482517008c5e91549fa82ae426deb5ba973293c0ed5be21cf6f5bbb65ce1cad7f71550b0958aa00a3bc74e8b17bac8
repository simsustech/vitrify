import Event from '../Event.js';
/**
 * CookieChangeEvent.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CookieChangeEvent
 */
export default class CookieChangeEvent extends Event {
    changed;
    deleted;
    /**
     * Constructor.
     *
     * @param type Event type.
     * @param [eventInit] Event init.
     */
    constructor(type, eventInit = null) {
        super(type, eventInit);
        this.changed = eventInit?.changed ?? [];
        this.deleted = eventInit?.deleted ?? [];
    }
}
//# sourceMappingURL=CookieChangeEvent.js.map