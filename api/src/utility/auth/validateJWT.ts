import { UnauthorizedException } from "chanfana";
import { jwtVerify } from "jose";

async function ValidateJWT(jwt: string | null) {
  if (!jwt) throw new UnauthorizedException("Unauthorized User");

  const secret = new TextEncoder().encode(process.env.JWT_ENCODER);

  try {
    await jwtVerify(jwt, secret);
  } catch (err) {
    console.log("JWT Token Expired: ", err);
    throw new UnauthorizedException("Token expired");
  }
}

export { ValidateJWT };
