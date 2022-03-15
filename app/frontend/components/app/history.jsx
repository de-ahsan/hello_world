import { withRouter } from 'react-router-dom'

const HistoryProvider = { history: null }

// Simple component that exposes the React Router's history object
// only works because history is mutable and we use it as a singleton
// with a top-level Router.
let HistoryExtractor = ({ history }) => {
  HistoryProvider.history = history
  return null
}

HistoryExtractor = withRouter(HistoryExtractor)

export {
  HistoryProvider,
  HistoryExtractor,
}
