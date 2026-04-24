import { hash } from 'bcryptjs';

const plainPassword = process.argv[2];

if (!plainPassword) {
  console.error('Usage: node scripts/hash-admin-password.mjs <plain-password>');
  process.exit(1);
}

const rounds = Number(process.env.BCRYPT_ROUNDS || 12);

hash(plainPassword, rounds)
  .then((hashed) => {
    console.log(hashed);
  })
  .catch((error) => {
    console.error('Failed to hash password:', error);
    process.exit(1);
  });
