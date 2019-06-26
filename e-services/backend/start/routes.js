'use strict'

const Route = use('Route')

// Route.resource('users', 'UserController').apiOnly()
Route.post('/sessions', 'SessionController.store')
Route.post('/forgot-password', 'ForgotPasswordController.store')
Route.put('/forgot-password', 'ForgotPasswordController.update')

Route.get('/files/:id', 'fileController.show')

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()
  Route.resource('services', 'ServiceController').apiOnly()
  Route.resource('buckets', 'BucketController').apiOnly()
  Route.resource('bucket-request', 'BucketRequestController').apiOnly()
  Route.post('/files', 'fileController.store')
}).middleware(['auth'])
