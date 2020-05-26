export default function(context) {
  // previous route
  if (process.client) {
    if (context.store.state.auth.loggedIn) {
      return context.redirect('/')
    }
  }
  if (context.store.state.auth.loggedIn) {
    return context.redirect('/')
  }
}
