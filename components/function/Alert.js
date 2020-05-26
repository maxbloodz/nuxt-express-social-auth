const requiredAuth = (
  vn,
  code,
  endPoint,
  isForce = false,
  timer = undefined
) => {
  vn.$swal({
    title: 'Error',
    text: code,
    type: 'error',
    showCancelButton: !isForce,
    confirmButtonColor: '#f26c10',
    cancelButtonColor: '#9e9e9e',
    confirmButtonText: 'Login',
    cancelButtonText: 'Cancel',
    allowOutsideClick: !isForce,
    timer
  }).then((result) => {
    if (result.value) {
      vn.$auth.logout().then(() => {
        vn.$auth.$storage.removeUniversal(`_token.token`)
        vn.$auth.$storage.removeUniversal(`_refresh_token.token`)
        vn.$router.push(endPoint)
      })
    }
  })
}

const success = (vn, callback, timer = undefined) => {
  vn.$swal({
    title: 'Success',
    type: 'success',
    confirmButtonText: 'Confirm',
    timer
  }).then(() => {
    callback()
  })
}

const error = (vn, code, callback, isForce = false, timer = undefined) => {
  vn.$swal({
    title: 'Error',
    text: code,
    type: 'error',
    confirmButtonColor: '#f26c10',
    cancelButtonColor: '#9e9e9e',
    confirmButtonText: 'Back',
    timer
  }).then((result) => {
    callback(result)
  })
}

const question = (vn, code, callback, timer = undefined) => {
  vn.$swal({
    text: code,
    type: 'question',
    showCancelButton: true,
    cancelButtonColor: '#9e9e9e',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    timer
  }).then((result) => {
    callback(result)
  })
}

const toast = (vn, type, code, timer = 5000) => {
  vn.$swal({
    toast: true,
    text: ` ${code}`,
    type,
    position: 'bottom-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    customClass: {
      popup: 'toast-popup',
      content: 'toast-content'
    },
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', vn.$swal.stopTimer)
      toast.addEventListener('mouseleave', vn.$swal.resumeTimer)
    }
  })
}

const Alert = {
  success,
  error,
  question,
  requiredAuth,
  toast
}

export default Alert
