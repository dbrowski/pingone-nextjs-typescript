// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import base64Encode from "../../../utils/pingone/base64Encode";
import exchangeAuthorizationCodeForTokens from "../../../utils/pingone/backend/exchangeAuthzCodeForTokens";

type Data = {
  name: string;
};

// These values are needed on both the frontend and backend and can be found in
// the PingOne admin console under Connections > Applications on the
// configuration tab of an app connection.;
const envID = "2fb48636-1624-456c-a657-a81a6c30e3ec";
const clientID = "ef8bee74-e572-4fc4-b8ed-cd9530511633";
// The redirect uri must be registered with PingOne by adding it to the app
// connection's configuration.
const redirectURI = "http://localhost:3000/login/callback";

// The client secret can be found in the PingOne admin console under
// Connections > Applications on the configuration tab of a PingOne app
// connection.
// !!!Don't expose the secret client-side!!!;
const clientSecret = process.env.PINGONE_CLIENT_SECRET as string;

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    res.status(400);
  }

  if (!req.body.json().authorizationCode) { 
    res.status(400);
  }
  
  const authorizationCode = req.body?.json().authorizationCode as string;
  const response = await exchangeAuthorizationCodeForTokens(
    envID,
    clientID,
    clientSecret,
    redirectURI,
    authorizationCode
  );
  const tokens = await response.json();

  res.status(200).json(tokens);
};

export default handler