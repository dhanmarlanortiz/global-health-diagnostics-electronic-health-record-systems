import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string(),
  phone: z.string()
});

export default schema;