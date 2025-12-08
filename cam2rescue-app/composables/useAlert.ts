export const useAlert = () => {
  const { $swal } = useNuxtApp()

  function showAlert(message: string, status: 'success' | 'error' | 'warning' | 'info' = 'info') {
    let title = ''
    switch (status) {
      case 'success':
        title = 'Success!'
        break
      case 'error':
        title = 'Error!'
        break
      case 'warning':
        title = 'Warning!'
        break
      default:
        title = 'Notice'
        break
    }

    $swal.fire({
      title,
      text: message,
      icon: status,
      timer: 2000,
      showConfirmButton: false,
      confirmButtonText: 'OK',
      confirmButtonColor: status === 'error' ? '#d33' : '#3085d6'
    })
  }

  return { showAlert }
}
