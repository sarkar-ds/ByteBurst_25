/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [rollNo]
 * @property {string} [college]
 * @property {'student' | 'admin'} role
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} name
 * @property {'formal' | 'informal'} category
 * @property {string} description
 * @property {string} date
 * @property {string} time
 * @property {string} venue
 * @property {number} maxParticipants
 * @property {number} currentParticipants
 * @property {boolean} isTeamEvent
 * @property {number} [teamSize]
 * @property {string} registrationDeadline
 * @property {string[]} prizes
 * @property {string[]} rules
 * @property {Object} coordinator
 * @property {string} coordinator.name
 * @property {string} coordinator.contact
 */

/**
 * @typedef {Object} Registration
 * @property {string} id
 * @property {string} eventId
 * @property {string} userId
 * @property {string} [teamName]
 * @property {string[]} [teamMembers]
 * @property {string} registrationDate
 * @property {'registered' | 'attended' | 'winner'} status
 */

export {}; 