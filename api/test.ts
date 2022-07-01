import type { VercelRequest, VercelResponse } from '@vercel/node';

module.exports = (req: VercelRequest, res: VercelResponse) => {
  res.send(`Hello ${req.query.name}`);
}
