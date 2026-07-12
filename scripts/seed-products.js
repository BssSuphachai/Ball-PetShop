import { seedProducts } from '../src/firestore-api.js';

console.log('กำลังเพิ่มข้อมูลสินค้าเริ่มต้นลง Firestore...');

try {
  await seedProducts();
  console.log('เพิ่มข้อมูลสินค้า 9 รายการเรียบร้อยแล้ว!');
  process.exit(0);
} catch (error) {
  console.error('เกิดข้อผิดพลาด:', error.message);
  process.exit(1);
}
