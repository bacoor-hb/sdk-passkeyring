const events = require('events')
const eventEmitter = new events.EventEmitter()
eventEmitter.setMaxListeners(0)

class ObserverClass {
  listObserver: any[]

  constructor () {
    this.listObserver = []
  }

  on (key: string, func: (...args: any[]) => void) {
    eventEmitter.on(key, func)
  }

  emit (key: string, object: any) {
    eventEmitter.emit(key, object)
  }

  removeListener (key: string, func: (...args: any[]) => void) {
    eventEmitter.removeListener(key, func)
  }
}

const Observer = new ObserverClass()
Object.freeze(Observer)

export default Observer
