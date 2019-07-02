'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('forgot-password', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('forgot-password', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.get('/files/:id', 'fileController.show')

Route.group(() => {
  // Route.resource('users', 'UserController').apiOnly()
  Route.resource('services', 'ServiceController')
    .apiOnly()
    .validator(new Map([[['services.store'], ['Service']]]))
  Route.resource('buckets', 'BucketController')
    .apiOnly()
    .validator(new Map([[['buckets.store'], ['Bucket']]]))
  Route.resource('bucket-request', 'BucketRequestController')
    .apiOnly()
    .validator(new Map([[['bucket-request.store'], ['BucketRequest']]]))
  Route.put('/bucket-request-done/:id', 'BucketRequestController.doneRequest')
  Route.resource('personas', 'PersonaController')
    .apiOnly()
    .validator(new Map([[['personas.update'], ['Persona']]]))
  Route.post('/files', 'fileController.store')
}).middleware(['auth'])
