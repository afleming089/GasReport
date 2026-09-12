import { InternalServerErrorException } from "chanfana";

const { google } = require("googleapis");

/** Uses googles playintegrity to validate user is on a android
 *
 * googleapis:
 * https://www.npmjs.com/package/googleapis#service-account-credentials
 *
 * playintegrity
 * https://developer.android.com/google/play/integrity
 *
 * @function
 */
async function getAndroidAppToken(appIntegrityToken: string) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "../gasreportplayintegrity-6a168da53fb2.json",
    scopes: ["https://www.googleapis.com/auth/playintegrity"],
  });

  const authClient = await auth.getClient();

  google.options({ auth: authClient });

  const playintegrity = google.playintegrity("v1");

  try {
    const res = await playintegrity.decodeIntegrityToken({
      packageName: "com.afleming089.gasreport",
      requestBody: {
        integrityToken: appIntegrityToken,
      },
    });

    console.log(res.data);

    return res.data;
  } catch (err) {
    console.log("AppIntegrityToken Token invalid: ", err);
    throw new InternalServerErrorException(
      "Not running on a valid android client",
    );
  }
}

export { getAndroidAppToken };
