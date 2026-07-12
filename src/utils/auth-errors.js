const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'อีเมลนี้ถูกใช้งานแล้ว',
  'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
  'auth/weak-password': 'รหัสผ่านอ่อนแอเกินไป กรุณาใช้อย่างน้อย 6 ตัวอักษร',
  'auth/user-not-found': 'ไม่พบบัญชีผู้ใช้ กรุณาสมัครสมาชิกก่อน',
  'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
  'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
  'auth/too-many-requests': 'พยายามเข้าสู่ระบบมากเกินไป กรุณารอสักครู่แล้วลองใหม่',
  'auth/network-request-failed': 'ไม่สามารถเชื่อมต่อเครือข่ายได้ กรุณาตรวจสอบอินเทอร์เน็ต',
  'auth/operation-not-allowed': 'ยังไม่ได้เปิดใช้งานการเข้าสู่ระบบด้วย Email/Password ใน Firebase Authentication',
  'auth/unauthorized-domain': 'โดเมนนี้ยังไม่ได้รับอนุญาตใน Firebase Authentication',
  'auth/invalid-api-key': 'Firebase API key ไม่ถูกต้อง กรุณาตรวจสอบการตั้งค่า Firebase',
  'auth/internal-error': 'Firebase Authentication ขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง'
};

export function getAuthErrorMessage(error) {
  if (!error?.code) {
    return error?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
  }

  return AUTH_ERROR_MESSAGES[error.code] || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง';
}
